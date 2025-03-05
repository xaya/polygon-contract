#!/usr/bin/env python3

# Copyright (C) 2021-2025 The Xaya developers
# Distributed under the MIT software license, see the accompanying
# file COPYING or http://www.opensource.org/licenses/mit-license.php.

import argparse
import binascii
import codecs
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import logging
import sys

import cairosvg
from web3 import Web3


class RequestHandler (BaseHTTPRequestHandler):
  """
  Request handler instance for GET requests to the REST API exposed
  by the data server.
  """

  def parseRequest (self, path):
    """
    Parses the request path into the type requested (metadata or image)
    and the name (including namespace).  Throws RuntimeError if the path
    is invalid.
    """

    if not path.startswith (self.server.pathPrefix):
      raise RuntimeError ("Not the handled path prefix")
    path = path[len (self.server.pathPrefix) :]

    parts = path.split ("/")
    if len (parts) != 3:
      raise RuntimeError ("Invalid path components")
    (typ, nsHex, nameHex) = parts

    try:
      ns = binascii.unhexlify (nsHex)
      name = binascii.unhexlify (nameHex)
    except binascii.Error:
      raise RuntimeError ("ns and/or name are invalid hex encoded")

    return (typ, ns, name)

  def returnError (self, code, msg):
    """
    Returns an HTTP error with a given code and message.
    """

    errorBody = msg.encode ("ascii")
    self.send_response (code)
    self.send_header ("Content-Length", len (errorBody))
    self.end_headers ()
    self.wfile.write (errorBody)

  def returnDataUri (self, uri):
    """
    Parses a data: URI into mime-type and content, and returns the
    underlying payload back to the client.
    """

    if not uri.startswith ("data:"):
      raise RuntimeError ("Data URI does not start with data:")
    uri = uri[len ("data:") :]

    parts = uri.split (";base64,")
    if len (parts) != 2:
      raise RuntimeError ("Data URI schema wrong")
    (mimeType, b64) = parts

    payload = codecs.decode (b64.encode ("ascii"), "base64")

    # If the data is SVG, convert it to PNG on the fly.  This makes sure
    # that OpenSea doesn't bitch about external image links.
    if mimeType == "image/svg+xml":
      payload = cairosvg.svg2png (bytestring=payload, unsafe=True)
      mimeType = "image/png"
      
    self.send_response (200)
    self.send_header ("Content-Length", len (payload))
    self.send_header ("Content-Type", mimeType)
    self.end_headers ()
    self.wfile.write (payload)

  def do_GET (self):
    try:
      (typ, ns, name) = self.parseRequest (self.path)
      if typ == "metadata":
        method = self.server.contract.functions.buildMetadataJson
      elif typ == "image":
        method = self.server.contract.functions.buildSvgImage
      else:
        raise RuntimeError ("Invalid request type")
    except RuntimeError as exc:
      self.returnError (404, str (exc))
      return

    try:
      dataUri = method (ns.decode ("utf-8"), name.decode ("utf-8")).call ()
      self.returnDataUri (dataUri)
    except RuntimeError as exc:
      self.server.log.exception ("Internal error", exc_info=exc)


class DataServer (ThreadingHTTPServer):
  """
  The main server that handles requests for NFT data.
  """

  def __init__ (self, addr, w3, caddr, abi, pathPrefix):
    super ().__init__ (addr, RequestHandler)
    self.log = logging.getLogger ("DataServer")
    self.w3 = w3
    self.pathPrefix = pathPrefix

    chainId = self.w3.eth.chain_id
    self.log.info ("Connected to Ethereum chain ID %d" % chainId)

    self.log.info ("Using NftMetadata contract at %s" % caddr)
    self.contract = self.w3.eth.contract (address=caddr, abi=abi)

    (host, port) = addr
    self.log.info ("Binding server to %s:%d" % (host, port))


if __name__ == "__main__":
  desc = "Runs a webserver that forwards NFT metadata from the Xaya contract"
  parser = argparse.ArgumentParser (description=desc)
  parser.add_argument ("--port", required=True, type=int,
                       help="Port to listen on for HTTP connections")
  parser.add_argument ("--host", default="0.0.0.0",
                       help="Host to listen on for HTTP connections")
  parser.add_argument ("--eth_rpc_url", required=True,
                       help="URL for the Ethereum JSON-RPC interface to use")
  parser.add_argument ("--contract_data", required=True,
                       help="File with compiled NftMetadata contract and ABI")
  parser.add_argument ("--contract_address", required=True,
                       help="NftMetadata contract address to use")
  parser.add_argument ("--path_prefix", default="/",
                       help="Expected prefix of request paths")
  args = parser.parse_args ()

  addr = (args.host, args.port)
  w3 = Web3 (Web3.HTTPProvider (args.eth_rpc_url))

  with open (args.contract_data, "rt") as f:
    contractJson = json.load (f)

  handler = logging.StreamHandler (sys.stderr)
  fmt = "%(asctime)s %(name)s (%(levelname)s): %(message)s"
  handler.setFormatter (logging.Formatter (fmt))

  rootLogger = logging.getLogger ()
  rootLogger.setLevel (logging.INFO)
  rootLogger.addHandler (handler)

  srv = DataServer (addr, w3,
                    args.contract_address, contractJson["abi"],
                    args.path_prefix)
  srv.serve_forever ()

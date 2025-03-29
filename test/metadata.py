#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
# Copyright (C) 2025 Autonomous Worlds Ltd

"""
Some more testing of NftMetadata, with more complex things like parsing the
generated JSON and XML, which cannot be done easily in Solidity tests.
"""

import cairosvg
from web3 import Web3

import argparse
import base64
import contextlib
import json
import logging
from pathlib import Path
import subprocess
import time
import sys

# Global port used for the Anvil test process
PORT = 8599

def startsWith (val, prefix):
  return val[: len (prefix)] == prefix

def parseDataUrl (url):
  """
  Helper method that parses a data URL, asserts certain things (e.g. that
  it is in base64 format) and returns the mime-type and decoded payload
  data as array.
  """

  assert startsWith (url, "data:")
  url = url[len ("data:") :]

  mimeAndBase64, encoded = url.split (",")

  assert mimeAndBase64[-7:] == ";base64"
  mime = mimeAndBase64[:-7]

  decoded = base64.b64decode (encoded).decode ("utf-8")

  return mime, decoded

class NftMetadataTest:

  def __init__ (self):
    self.w3 = None
    self.metadata = None
    self.address = None
    self.anvilProcess = None
  
  @contextlib.contextmanager
  def run (self):
    """
    Context manager that starts the test environment, deploys the contract,
    and then yields to the caller.
    """

    try:
      self.anvilProcess = subprocess.Popen (
        ["anvil", "--host", "127.0.0.1", "--port", str (PORT), "--silent"])
      
      # Give Anvil a moment to start up.
      time.sleep (1)
      
      self.w3 = Web3 (Web3.HTTPProvider (f"http://localhost:{PORT}"))
      if not self.w3.is_connected ():
        raise Exception ("Failed to connect to Anvil node")
      
      self.address = self.w3.eth.accounts[0]
      
      contractPath = Path(__file__).parent.parent / "out" / "NftMetadata.sol" / "NftMetadata.json"
      with open (contractPath, "r") as file:
        contractJson = json.load (file)
      
      contract = self.w3.eth.contract (
          abi=contractJson["abi"],
          bytecode=contractJson["bytecode"]["object"])
      txid = contract.constructor ().transact ({"from": self.address})
      tx = self.w3.eth.wait_for_transaction_receipt (txid)
      
      self.metadata = self.w3.eth.contract (address=tx.contractAddress,
                                            abi=contractJson["abi"])
      
      yield
    
    finally:
      if self.anvilProcess:
        self.anvilProcess.terminate ()
        self.anvilProcess.wait ()
        self.anvilProcess = None

  def sendTx (self, call):
    txid = call.transact ({"from": self.address})
    self.w3.eth.wait_for_transaction_receipt (txid)

  def getMetadataJson (self, ns, name):
    """
    Extracts the metadata returned by the test contract for the given
    name as JSON.
    """

    uri = self.metadata.functions.buildMetadataJson (ns, name).call ()
    mime, data = parseDataUrl (uri)
    assert mime == "application/json"

    return json.loads (data)

  def getImageAsPng (self, ns, name):
    """
    Extracts the generated image as SVG from the contract, and converts it to
    PNG with Cairo.  This makes sure that the generated SVG is valid.
    """

    uri = self.metadata.functions.buildSvgImage (ns, name).call ()
    mime, data = parseDataUrl (uri)
    assert mime == "image/svg+xml"

    return cairosvg.svg2png (bytestring=data, unsafe=True)

@contextlib.contextmanager
def runTest (testConfig=True):
  t = NftMetadataTest ()
  with t.run ():
    if testConfig:
      t.sendTx (t.metadata.functions.setNamespaceData (
          "", "default description", "urlX", "ff0000", "unknown"))
      t.sendTx (t.metadata.functions.setNamespaceData (
          "p", "player accounts", "urlP", "ff0000", "player"))
      t.sendTx (t.metadata.functions.setDataServerUrl ("https://data.server/"))
    yield t

################################################################################

if __name__ == "__main__":
  logging.basicConfig (stream=sys.stderr, level=logging.INFO)
  log = logging.getLogger ("")

  desc = "Test script for NFT metadata generation"
  parser = argparse.ArgumentParser(description=desc)
  parser.add_argument ("--write-image", required=False,
                       help="If set, write PNG image to this file")
  parser.add_argument ("--ns", required=False,
                       help="Namespace for writing the PNG image")
  parser.add_argument ("--name", required=False,
                       help="Name for writing the PNG image")
  args = parser.parse_args ()

  log.info ("Testing expected JSON for player accounts...")
  with runTest () as t:
    assert t.getMetadataJson ("p", "domob") == {
      "name": "p/domob",
      "image": "https://data.server/image/70/646F6D6F62",
      "description": "player accounts",
      "attributes":
        [
          {"trait_type": "Namespace", "value": "p"},
          {"trait_type": "Name", "value": "domob"},
          {"trait_type": "Type", "value": "player"},
        ],
    }

  log.info ("Testing expected JSON for unknown namespaces...")
  with runTest () as t:
    assert t.getMetadataJson ("x", "domob") == {
      "name": "x/domob",
      "image": "https://data.server/image/78/646F6D6F62",
      "description": "default description",
      "attributes":
        [
          {"trait_type": "Namespace", "value": "x"},
          {"trait_type": "Name", "value": "domob"},
          {"trait_type": "Type", "value": "unknown"},
        ],
    }

  log.info ("Testing SVG generation...")
  with runTest (testConfig=False) as t:
    t.getImageAsPng ("p", "domob")
    t.getImageAsPng ("x", "foo")
    # This name is not abbreviated but falls into a later size bucket.
    t.getImageAsPng ("1234567890", "123456")
    # This name gets abbreviated with an ellipsis "..." at the end.
    t.getImageAsPng ("this-is-some", "very-very-very-long-name")
    t.getImageAsPng ("ß", "<>")

    if args.write_image:
      if not (args.ns and args.name):
        raise Exception ("--ns and --name must be set for --write-image")
      output = t.getImageAsPng (args.ns, args.name)
      with open (args.write_image, "wb") as f:
        f.write (output)
      log.info (f"PNG for {args.ns}/{args.name} written to {args.write_image}")

  log.info ("Testing proper string escaping...")
  with runTest () as t:
    assert t.getMetadataJson ("x", "äöü\"𐐷\\ß")["name"] == "x/äöü\"𐐷\\ß"

  log.info ("Testing namespace re-configuration...")
  with runTest () as t:
    t.sendTx (t.metadata.functions.setNamespaceData (
        "", "new default desc", "", "", ""))
    t.sendTx (t.metadata.functions.setNamespaceData (
        "p", "new player desc", "", "", ""))
    assert t.getMetadataJson ("x", "domob")["description"] == "new default desc"
    assert t.getMetadataJson ("p", "domob")["description"] == "new player desc"

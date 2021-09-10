// SPDX-License-Identifier: MIT
// Copyright (C) 2021 Autonomous Worlds Ltd

pragma solidity ^0.8.4;

import "./INftMetadata.sol";

import "base64-sol/base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev The logic for constructing the NFT metadata for a given Xaya account
 * token on-chain into JSON and a data: URL.
 *
 * There are certain bits of data that can be configured per namespace,
 * and this state is stored in the contract / can be updated by the owner.
 */
contract NftMetadata is INftMetadata, Ownable
{

  /* ************************************************************************ */

  /** @dev Configuration data for a known namespace.  */
  struct NamespaceData
  {

    /** @dev Set to true if there is custom configuration for a namespace.  */
    bool configured;

    /** @dev Description string for names of this namespace.  */
    string description;

    /**
     * @dev Background colour returned for names of this namespace
     * in the NFT metadata.
     */
    string backgroundColour;

    /** @dev Value returned for the "type" attribute.  */
    string typ;

  }

  /** @dev Known namespaces for which we return custom metadata.  */
  mapping (string => NamespaceData) public namespaces;

  /** @dev The default configuration for unknown namespaces.  */
  NamespaceData public defaultConfig;

  /** @dev Emitted when a namespace is reconfigured.  */
  event NamespaceConfigured (string ns);

  /**
   * @dev The constructor applies the initial configuration of known
   * namespaces.
   */
  constructor ()
  {
    defaultConfig.description =
        "A generic name for the Xaya platform (of unknown type).";
    defaultConfig.backgroundColour = "999999";
    defaultConfig.typ = "Unknown";
    emit NamespaceConfigured ("");

    setNamespaceData ("p",
        "A player account for the Xaya platform.",
        "3333bb", "Player Account");
    setNamespaceData ("g",
        "The admin account for a game on the Xaya platform.",
        "bb3333", "Game");
  }

  /**
   * @dev Adds or updates the namespace data for a given namespace.  If ns
   * is the empty string, it changes the default configuration instead.
   */
  function setNamespaceData (string memory ns, string memory description,
                             string memory backgroundColour,
                             string memory typ) public onlyOwner
  {
    NamespaceData storage entry;
    if (bytes (ns).length == 0)
      entry = defaultConfig;
    else
      entry = namespaces[ns];

    entry.configured = true;
    entry.description = description;
    entry.backgroundColour = backgroundColour;
    entry.typ = typ;

    emit NamespaceConfigured (ns);
  }

  /* ************************************************************************ */

  /**
   * @dev Encodes a given payload of data into a data: URL string.
   */
  function buildDataUrl (string memory mimeType, bytes memory payload)
      internal pure returns (string memory)
  {
    return string (abi.encodePacked (
      "data:", mimeType,
      ";base64,", Base64.encode (payload)
    ));
  }

  /**
   * @dev Encodes a given string as JSON string literal.
   */
  function jsonStringLiteral (string memory str)
      internal pure returns (string memory)
  {
    /* FIXME: Do proper escaping!  */
    return string (abi.encodePacked ("\"", str, "\""));
  }

  /**
   * @dev Constructs the metadata JSON for a given name.
   */
  function buildMetadataJson (string memory ns, string memory name)
      internal view returns (string memory)
  {
    NamespaceData storage config = namespaces[ns];
    if (!config.configured)
      config = defaultConfig;

    string memory fullName = string (abi.encodePacked (ns, "/", name));
    string memory attributes = string (abi.encodePacked (
      "[",
        "{",
          "\"trait_type\":\"Namespace\"",
          ",\"value\":", jsonStringLiteral (ns),
        "}",
        ",{",
          "\"trait_type\":\"Name\"",
          ",\"value\":", jsonStringLiteral (name),
        "}",
        ",{",
          "\"trait_type\":\"Type\"",
          ",\"value\":", jsonStringLiteral (config.typ),
        "}",
      "]"
    ));

    /* TODO: Add generated image.  */

    return string (abi.encodePacked (
      "{",
        "\"name\":",  jsonStringLiteral (fullName),
        ",\"description\":", jsonStringLiteral (config.description),
        ",\"background_color\":", jsonStringLiteral (config.backgroundColour),
        ",\"attributes\":", attributes,
      "}"
    ));
  }

  /**
   * @dev Constructs the full metadata URI for a given name.
   */
  function tokenUriForName (string memory ns, string memory name)
      public override view returns (string memory)
  {
    bytes memory jsonData = bytes (buildMetadataJson (ns, name));
    return buildDataUrl ("application/json", jsonData);
  }

  /* ************************************************************************ */

}

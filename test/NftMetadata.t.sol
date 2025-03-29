// SPDX-License-Identifier: MIT
// Copyright (C) 2025 Autonomous Worlds Ltd

pragma solidity ^0.8.4;

import "../src/NftMetadata.sol";
import "../src/XayaPolicy.sol";

import { Test } from "forge-std/Test.sol";

/**
 * @dev This contract forms part of the unit tests for NftMetadata.  Other tests
 * are implemented in Python, because they need to do more involved things such
 * as parsing/validating JSON and XML.
 */
contract NftMetadataTest is Test
{

  address public constant owner = address (1);
  address public constant other = address (2);

  NftMetadata public m;

  constructor ()
  {
    vm.label (owner, "owner");
    vm.label (other, "other");
  }

  function setUp () public
  {
    vm.startPrank (owner);
    m = new NftMetadata ();
    m.setContractMetadata ("https://contract.meta/");
    m.setDataServerUrl ("https://data.server/");
    vm.stopPrank ();
  }

  /* ************************************************************************ */

  function test_namespaceConfiguration () public
  {
    vm.startPrank (other);
    vm.expectRevert ("Ownable: caller is not the owner");
    m.setNamespaceData ("", "wrong", "", "", "");
    vm.expectRevert ("Ownable: caller is not the owner");
    m.setNamespaceData ("p", "wrong", "", "", "");

    vm.startPrank (owner);
    vm.expectEmit (address (m));
    emit NftMetadata.NamespaceConfigured ("");
    m.setNamespaceData ("", "updated", "", "", "");
    vm.expectEmit (address (m));
    emit NftMetadata.NamespaceConfigured ("p");
    m.setNamespaceData ("p", "updated", "", "", "");
  }

  function test_contractLevelMetadata () public
  {
    vm.startPrank (other);
    vm.expectRevert ("Ownable: caller is not the owner");
    m.setContractMetadata ("https://example.com/");
    assertEq (m.contractUri (), "https://contract.meta/");

    vm.startPrank (owner);
    vm.expectEmit (address (m));
    emit NftMetadata.ContractMetadataUpdated ("https://example.com/");
    m.setContractMetadata ("https://example.com/");
    assertEq (m.contractUri (), "https://example.com/");
  }

  function test_dataServer () public
  {
    vm.startPrank (other);
    vm.expectRevert ("Ownable: caller is not the owner");
    m.setDataServerUrl ("https://example.com/");
    assertEq (m.dataServerUrl (), "https://data.server/");

    vm.startPrank (owner);
    vm.expectEmit (address (m));
    emit NftMetadata.DataServerUpdated ("https://example.com/");
    m.setDataServerUrl ("https://example.com/");
    assertEq (m.tokenUriForName ("p", "domob"),
              "https://example.com/metadata/70/646F6D6F62");
    assertEq (m.tokenUriForName ("p", unicode"äöü"),
              "https://example.com/metadata/70/C3A4C3B6C3BC");
  }

}

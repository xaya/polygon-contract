// SPDX-License-Identifier: MIT
// Copyright (C) 2025 Autonomous Worlds Ltd

pragma solidity ^0.8.4;

import "../src/HexEscapes.sol";

import { Test } from "forge-std/Test.sol";

contract HexEscapesTest is Test
{

  function test_encodeCodepointsAsJsonLiterals () public
  {
    assertEq (HexEscapes.jsonCodepoint (0x40), "\\u0040");
    assertEq (HexEscapes.jsonCodepoint (0xFFFF), "\\uFFFF");
    assertEq (HexEscapes.jsonCodepoint (0x1D11E), "\\uD834\\uDD1E");

    /* Part of surrogate pair */
    vm.expectRevert ("invalid codepoint");
    HexEscapes.jsonCodepoint (0xD834);

    /* Value too large */
    vm.expectRevert ("invalid codepoint");
    HexEscapes.jsonCodepoint (0xFF0000);
  }

  function test_encodeCodepointsAsXmlEscapes () public
  {
    assertEq (HexEscapes.xmlCodepoint (0x40), "&#x000040;");
    assertEq (HexEscapes.xmlCodepoint (0xFFFF), "&#x00FFFF;");
    assertEq (HexEscapes.xmlCodepoint (0xFF00FF), "&#xFF00FF;");

    vm.expectRevert ("codepoint does not fit into 24 bits");
    HexEscapes.xmlCodepoint (0x1000000);
  }

  function test_hexlifyStrings () public pure
  {
    assertEq (HexEscapes.hexlify (""), "");
    assertEq (HexEscapes.hexlify ("abc"), "616263");

    /* UTF-8 encoded string (six bytes in total) */
    assertEq (HexEscapes.hexlify (unicode"äöü"), "C3A4C3B6C3BC");
  }

}

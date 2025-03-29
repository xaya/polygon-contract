// SPDX-License-Identifier: MIT
// Copyright (C) 2025 Autonomous Worlds Ltd

pragma solidity ^0.8.4;

import "../src/Utf8.sol";

import { Test } from "forge-std/Test.sol";

contract StringBuilderTest is Test
{

  /**
   * @dev Helper function that calls decodeCodepoint and then verifies that
   * it succeeds and returns the expected codepoint and new offset.
   */
  function expectDecode (bytes memory data, uint offset,
                         uint32 expectedCp, uint expectedNewOffset)
      public pure
  {
    (uint32 cp, uint newOffset) = Utf8.decodeCodepoint (data, offset);
    assertEq (cp, expectedCp);
    assertEq (newOffset, expectedNewOffset);
  }

  function test_eof () public
  {
    bytes memory testData = abi.encodePacked ("abc");

    vm.expectRevert ("no more input bytes available");
    Utf8.decodeCodepoint (testData, 3);

    vm.expectRevert ("no more input bytes available");
    Utf8.decodeCodepoint (testData, 5);

    vm.expectRevert ("no more input bytes available");
    Utf8.decodeCodepoint ("", 0);
  }

  function test_validCodepointsWithOffsets () public pure
  {
    /* This contains a one, two, three and four byte sequence, and then
       again a single byte at the end.  */
    bytes memory testData = abi.encodePacked (
      hex"24",
      hex"C2A2",
      hex"E0A4B9",
      hex"F0908D88",
      hex"00"
    );
    expectDecode (testData, 0, 0x24, 1);
    expectDecode (testData, 1, 0xA2, 3);
    expectDecode (testData, 3, 0x939, 6);
    expectDecode (testData, 6, 0x10348, 10);
    expectDecode (testData, 10, 0x00, 11);
  }

  function test_firstAndLastCodepoints () public pure
  {
    expectDecode (hex"00", 0, 0x00, 1);
    expectDecode (hex"7F", 0, 0x7F, 1);

    expectDecode (hex"C280", 0, 0x80, 2);
    expectDecode (hex"DFBF", 0, 0x7FF, 2);

    expectDecode (hex"E0A080", 0, 0x800, 3);
    expectDecode (hex"EFBFBF", 0, 0xFFFF, 3);

    expectDecode (hex"F0908080", 0, 0x10000, 4);
    expectDecode (hex"F48FBFBF", 0, 0x10FFFF, 4);
  }

  function test_invalidStartCharacters () public
  {
    vm.expectRevert ("mid-sequence character at start of sequence");
    Utf8.decodeCodepoint (hex"82", 0);

    vm.expectRevert ("invalid sequence start");
    Utf8.decodeCodepoint (hex"F8", 0);
  }

  function test_midSequenceErrors () public
  {
    vm.expectRevert ("eof in the middle of a sequence");
    Utf8.decodeCodepoint (hex"C2", 0);

    vm.expectRevert ("expected sequence continuation");
    Utf8.decodeCodepoint (hex"C240", 0);

    vm.expectRevert ("expected sequence continuation");
    Utf8.decodeCodepoint (hex"C2E0", 0);
  }

  function test_tooLargeCodepoint () public
  {
    vm.expectRevert ("overlong sequence");
    Utf8.decodeCodepoint (hex"F4908080", 0);
  }

  function test_overlongSequences () public
  {
    vm.expectRevert ("overlong sequence");
    Utf8.decodeCodepoint (hex"C080", 0);

    vm.expectRevert ("overlong sequence");
    Utf8.decodeCodepoint (hex"C0AE", 0);

    vm.expectRevert ("overlong sequence");
    Utf8.decodeCodepoint (hex"E08080", 0);

    vm.expectRevert ("overlong sequence");
    Utf8.decodeCodepoint (hex"F0808080", 0);
  }

  function test_invalidSurrogatePairs () public
  {
    vm.expectRevert ("surrogate-pair character decoded");
    Utf8.decodeCodepoint (hex"EDA18C", 0);

    vm.expectRevert ("surrogate-pair character decoded");
    Utf8.decodeCodepoint (hex"EDBEB4", 0);
  }

  function test_stringValidation () public
  {
    Utf8.validate (abi.encodePacked (
      hex"24",
      hex"C2A2",
      hex"E0A4B9",
      hex"F0908D88",
      hex"00"
    ));

    vm.expectRevert ("eof in the middle of a sequence");
    Utf8.validate (hex"24C2");

    vm.expectRevert ("overlong sequence");
    Utf8.validate (hex"C080");
  }

}

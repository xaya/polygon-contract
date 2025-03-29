// SPDX-License-Identifier: MIT
// Copyright (C) 2025 Autonomous Worlds Ltd

pragma solidity ^0.8.4;

import "../src/StringBuilder.sol";

import { Test } from "forge-std/Test.sol";

contract StringBuilderTest is Test
{

  using StringBuilder for StringBuilder.Type;

  function test_append () public pure
  {
    StringBuilder.Type memory builder = StringBuilder.create (5);
    assertEq (builder.extract (), "");
    builder.append ("abc");
    assertEq (builder.extract (), "abc");
    builder.append ("de");
    assertEq (builder.extract (), "abcde");
  }

  function test_maxLen () public
  {
    StringBuilder.Type memory builder = StringBuilder.create (3);
    builder.append ("abc");
    builder.append ("");
    assertEq (builder.extract (), "abc");

    vm.expectRevert ("StringBuilder maxLen exceeded");
    builder.append ("x");
  }

}

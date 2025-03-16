// SPDX-License-Identifier: MIT
// Copyright (C) 2025 Autonomous Worlds Ltd

pragma solidity ^0.8.4;

import "../src/NftMetadata.sol";
import "../src/XayaPolicy.sol";

import { Test } from "forge-std/Test.sol";

contract XayaPolicyTest is Test
{

  address public constant owner = address (1);
  address public constant other = address (2);

  NftMetadata public metadata;
  XayaPolicy public pol;

  constructor ()
  {
    vm.label (owner, "owner");
    vm.label (other, "other");
  }

  function setUp () public
  {
    vm.startPrank (owner);
    metadata = new NftMetadata ();
    pol = new XayaPolicy (metadata, 100);
    vm.stopPrank ();
  }

  /**
   * @dev Calls the policy's checkRegistration function, but accepts bytes
   * instead of string as arguments.  This can be used to pass invalid UTF-8
   * to the contract to check that this is rejected.
   */
  function checkRegistrationWithBytes (bytes memory ns, bytes memory name)
      internal view returns (uint256)
  {
    return pol.checkRegistration (string (ns), string (name));
  }

  /**
   * @dev Helper function to return a byte string of given length.
   */
  function ofLength (uint len) internal pure returns (bytes memory res)
  {
    for (uint i = 0; i < len; ++i)
      res = abi.encodePacked (res, "x");
  }

  /* ************************************************************************ */

  function test_constructorRequiresMetadata () public
  {
    vm.expectRevert ("invalid metadata contract");
    new XayaPolicy (NftMetadata (address (0)), 100);
  }

  function test_metadataChanges () public
  {
    NftMetadata newMetadata = new NftMetadata ();

    vm.startPrank (other);
    vm.expectRevert ("Ownable: caller is not the owner");
    pol.setMetadataContract (newMetadata);

    vm.startPrank (owner);
    vm.expectRevert ("invalid metadata contract");
    pol.setMetadataContract (NftMetadata (address (0)));

    assertEq (address (pol.metadataContract ()), address (metadata));

    vm.expectEmit (address (pol));
    emit XayaPolicy.MetadataContractChanged (metadata, newMetadata);
    pol.setMetadataContract (newMetadata);

    assertEq (address (pol.metadataContract ()), address (newMetadata));
  }

  function test_feeReceiverChanges () public
  {
    vm.startPrank (other);
    vm.expectRevert ("Ownable: caller is not the owner");
    pol.setFeeReceiver (other);

    vm.startPrank (owner);
    vm.expectRevert ("invalid fee receiver");
    pol.setFeeReceiver (address (0));

    assertEq (pol.feeReceiver (), owner);

    vm.expectEmit (address (pol));
    emit XayaPolicy.FeeReceiverChanged (owner, other);
    pol.setFeeReceiver (other);
    assertEq (pol.feeReceiver (), other);

    /* Even if the fee receiver is changed, the owner should be used for
       access checks in the future.  */
    vm.startPrank (other);
    vm.expectRevert ("Ownable: caller is not the owner");
    pol.setFeeReceiver (owner);
    assertEq (pol.feeReceiver (), other);
  }

  function test_scheduledFeeChanges () public
  {
    assertEq (pol.registrationFee (), 100);

    vm.startPrank (other);
    vm.expectRevert ("no fee change is scheduled");
    pol.enactFeeChange ();
    vm.expectRevert ("Ownable: caller is not the owner");
    pol.scheduleFeeChange (42);

    /* Schedule a valid fee change.  */
    vm.startPrank (owner);
    vm.expectEmit (address (pol));
    uint feeAfter = block.timestamp + pol.feeTimelock ();
    emit XayaPolicy.FeeChangeScheduled (42, feeAfter);
    pol.scheduleFeeChange (42);

    assertEq (pol.registrationFee (), 100);
    assertEq (pol.nextFee (), 42);

    /* Schedule another fee change, which will override the existing one.  */
    pol.scheduleFeeChange (5);
    assertEq (pol.registrationFee (), 100);
    assertEq (pol.nextFee (), 5);

    /* Enact after the timelock is over.  */
    vm.startPrank (other);
    skip (pol.feeTimelock () - 100);
    vm.expectRevert ("fee timelock is not expired yet");
    pol.enactFeeChange ();

    skip (101);
    assertEq (pol.registrationFee (), 100);
    assertEq (pol.nextFee (), 5);

    vm.expectEmit (address (pol));
    emit XayaPolicy.FeeChanged (100, 5);
    pol.enactFeeChange ();

    assertEq (pol.registrationFee (), 5);
    assertEq (pol.nextFee (), 0);
    assertEq (pol.nextFeeAfter (), 0);

    vm.expectRevert ("no fee change is scheduled");
    pol.enactFeeChange ();
  }

  /* ************************************************************************ */

  function test_registrationFee () public view
  {
    uint fee = pol.registrationFee ();
    assertEq (pol.checkRegistration ("p", ""), fee);
    assertEq (pol.checkRegistration ("p", "abc"), fee);
    assertEq (pol.checkRegistration ("p", unicode"äöü"), fee);
  }

  function test_nameValidation () public
  {
    pol.checkRegistration ("p", "");
    pol.checkRegistration ("p", "abc");
    pol.checkRegistration ("p", unicode"domob äöü");

    checkRegistrationWithBytes (ofLength (1), ofLength (254));
    checkRegistrationWithBytes (ofLength (1),
                                abi.encodePacked (unicode"ß", ofLength (252)));

    vm.expectRevert ("namespace must be exactly one character");
    pol.checkRegistration ("", "x");
    vm.expectRevert ("namespace must be exactly one character");
    pol.checkRegistration ("xx", "x");

    vm.expectRevert ("name is too long");
    checkRegistrationWithBytes (ofLength (1), ofLength (255));
    vm.expectRevert ("name is too long");
    checkRegistrationWithBytes (ofLength (1),
                                abi.encodePacked (unicode"ß", ofLength (253)));

    vm.expectRevert ("invalid namespace");
    pol.checkRegistration (" ", "x");
    vm.expectRevert ("invalid namespace");
    pol.checkRegistration ("\x00", "x");
    vm.expectRevert ("invalid namespace");
    pol.checkRegistration ("X", "x");
    vm.expectRevert ("invalid namespace");
    pol.checkRegistration ("0", "x");

    vm.expectRevert ("invalid codepoint in name");
    pol.checkRegistration ("x", "a\nb");
    vm.expectRevert ("invalid codepoint in name");
    pol.checkRegistration ("x", "a\x00b");

    vm.expectRevert ("overlong sequence");
    checkRegistrationWithBytes (ofLength (1), hex"C080");
    vm.expectRevert ("eof in the middle of a sequence");
    checkRegistrationWithBytes (ofLength (1), hex"20C2");
  }

  function test_moveValidation () public
  {
    assertEq (pol.checkMove ("p", ""), 0);
    assertEq (pol.checkMove ("p", "abc {\": xyz}"), 0);

    vm.expectRevert ("invalid move data");
    pol.checkMove ("p", "42\n50");
    vm.expectRevert ("invalid move data");
    pol.checkMove ("p", "42\x7F");
    vm.expectRevert ("invalid move data");
    pol.checkMove ("p", unicode"abc äöü");
  }

  function test_metadataPerConfiguredContract () public view
  {
    assertEq (pol.contractUri (), metadata.contractUri ());
    assertEq (pol.tokenUriForName ("p", "domob"),
              metadata.tokenUriForName ("p", "domob"));
  }

}

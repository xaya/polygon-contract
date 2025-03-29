// SPDX-License-Identifier: MIT
// Copyright (C) 2025 Autonomous Worlds Ltd

pragma solidity ^0.8.4;

import "./TestPolicy.sol";
import "./TestToken.sol";
import "../src/XayaAccounts.sol";

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import { Test } from "forge-std/Test.sol";

contract XayaAccountsTest is Test
{

  address public constant wchiSupply = address (1);
  address public constant feeReceiver = address (2);
  address public constant owner = address (3);
  address public constant alice = address (4);
  address public constant bob = address (5);
  address public constant charly = address (6);

  uint256 public constant signer1Key = 123;
  address public immutable signer1;

  uint256 public constant signer2Key = 456;
  address public immutable signer2;

  IERC20 public wchi;
  IXayaPolicy public policy;
  XayaAccounts public xa;

  constructor ()
  {
    signer1 = vm.addr (signer1Key);
    signer2 = vm.addr (signer2Key);

    vm.label (wchiSupply, "WCHI supply");
    vm.label (feeReceiver, "fee receiver");
    vm.label (owner, "owner");
    vm.label (alice, "alice");
    vm.label (bob, "bob");
    vm.label (charly, "charly");
    vm.label (signer1, "signer 1");
    vm.label (signer2, "signer 2");
  }

  function setUp () public
  {
    vm.startPrank (wchiSupply);
    wchi = new TestToken (1e8 * 1e18);
    wchi.transfer (alice, 1e6);
    wchi.transfer (bob, 1e6);
    vm.stopPrank ();

    vm.prank (feeReceiver);
    policy = new TestPolicy ();

    vm.prank (owner);
    xa = new XayaAccounts (wchi, policy);

    vm.prank (alice);
    wchi.approve (address (xa), type (uint256).max);
    vm.prank (bob);
    wchi.approve (address (xa), type (uint256).max);
  }

  /**
   * @dev Utility function to send a "move" with default nonce and no
   * associated WCHI transfer.
   */
  function defaultMove (string memory ns, string memory name, string memory mv)
      internal
  {
    xa.move (ns, name, mv, type (uint256).max, 0, address (0));
  }

  /**
   * @dev Helper function to sign a permit message with a given key.
   */
  function sign (bytes memory message, uint256 key)
      internal pure returns (bytes memory)
  {
    bytes32 hashToSign = ECDSA.toEthSignedMessageHash (message);
    (uint8 v, bytes32 r, bytes32 s) = vm.sign (key, hashToSign);
    return abi.encodePacked (r, s, v);
  }

  /* ************************************************************************ */

  function test_idNameMapping () public
  {
    uint256 id1 = xa.tokenIdForName ("p", "foo");
    uint256 id2 = xa.tokenIdForName ("p", "bar");
    uint256 id3 = xa.tokenIdForName ("pf", "oo");
    assertNotEq (id1, id2);
    assertNotEq (id1, id3);
    assertNotEq (id2, id3);

    /* The other way (token ID to name, from hash to preimage) only works if
       we have the name already registered.  */
    vm.expectRevert ("no matching account found for token");
    xa.tokenIdToName (id1);
    vm.expectRevert ("no matching account found for token");
    xa.tokenIdToName (id2);

    vm.prank (alice);
    xa.register ("p", "foo");
    assertEq (xa.tokenIdForName ("p", "foo"), id1);

    /* After the name is registered, we can look up the preimage by hash.  */
    (string memory ns, string memory name) = xa.tokenIdToName (id1);
    assertEq (ns, "p");
    assertEq (name, "foo");

    vm.expectRevert ("no matching account found for token");
    xa.tokenIdToName (id2);
  }

  function test_exists () public
  {
    uint256 id1 = xa.tokenIdForName ("p", "foo");
    uint256 id2 = xa.tokenIdForName ("p", "bar");

    assertEq (xa.exists (id1), false);
    assertEq (xa.exists ("p", "foo"), false);

    vm.prank (alice);
    xa.register ("p", "foo");

    assertEq (xa.exists (id1), true);
    assertEq (xa.exists ("p", "foo"), true);

    assertEq (xa.exists (id2), false);
    assertEq (xa.exists ("p", "bar"), false);
  }

  function test_metadataFromPolicy () public
  {
    assertEq (xa.contractURI (), "contract metadata");

    uint256 id = xa.tokenIdForName ("p", "foo");

    vm.expectRevert ("no matching account found for token");
    xa.tokenURI (id);

    vm.prank (alice);
    xa.register ("p", "foo");
    assertEq (xa.tokenURI (id), "foo");
  }

  function test_policyChanges () public
  {
    IXayaPolicy newPolicy1 = new TestPolicy ();
    IXayaPolicy newPolicy2 = new TestPolicy ();

    vm.startPrank (alice);
    vm.expectRevert ("no policy change is scheduled");
    xa.enactPolicyChange ();

    vm.startPrank (owner);
    vm.expectRevert ("invalid policy scheduled");
    xa.schedulePolicyChange (IXayaPolicy (address (0)));

    vm.startPrank (alice);
    vm.expectRevert ("Ownable: caller is not the owner");
    xa.schedulePolicyChange (newPolicy1);

    /* Schedule a valid policy change.  */
    uint policyAfter = block.timestamp + xa.policyTimelock ();
    vm.startPrank (owner);
    vm.expectEmit (address (xa));
    emit XayaAccounts.PolicyChangeScheduled (newPolicy1, policyAfter);
    xa.schedulePolicyChange (newPolicy1);
    assertEq (address (xa.policy ()), address (policy));
    assertEq (address (xa.nextPolicy ()), address (newPolicy1));

    /* Schedule another policy change, which will overwrite the
       existing one.  */
    xa.schedulePolicyChange (newPolicy2);
    assertEq (address (xa.policy ()), address (policy));
    assertEq (address (xa.nextPolicy ()), address (newPolicy2));

    /* Enact after the timelock is over.  */
    vm.startPrank (alice);
    skip (xa.policyTimelock () - 100);
    vm.expectRevert ("policy timelock is not expired yet");
    xa.enactPolicyChange ();

    skip (101);
    assertEq (address (xa.policy ()), address (policy));
    assertEq (address (xa.nextPolicy ()), address (newPolicy2));

    vm.expectEmit (address (xa));
    emit XayaAccounts.PolicyChanged (policy, newPolicy2);
    xa.enactPolicyChange ();
    assertEq (address (xa.policy ()), address (newPolicy2));
    assertEq (address (xa.nextPolicy ()), address (0));
    assertEq (xa.nextPolicyAfter (), 0);

    vm.expectRevert ("no policy change is scheduled");
    xa.enactPolicyChange ();
  }

  /* ************************************************************************ */

  function test_tryRegisterExistingName () public
  {
    vm.startPrank (alice);
    xa.register ("p", "foo");
    xa.register ("g", "foo");

    vm.expectRevert ("ERC721: token already minted");
    xa.register ("p", "foo");

    vm.startPrank (bob);
    vm.expectRevert ("ERC721: token already minted");
    xa.register ("p", "foo");
  }

  function test_policyCheckedForRegistrations () public
  {
    vm.startPrank (alice);
    vm.expectRevert ("namespace must not be empty");
    xa.register ("", "foo");
  }

  function test_registrationFee () public
  {
    vm.startPrank (alice);
    xa.register ("p", "foo");
    vm.startPrank (bob);
    xa.register ("p", "zz");

    assertEq (wchi.balanceOf (alice), 1e6 - 300);
    assertEq (wchi.balanceOf (bob), 1e6 - 200);
    assertEq (wchi.balanceOf (feeReceiver), 500);

    vm.startPrank (alice);
    wchi.transfer (bob, 1e6 - 300 - 200);
    assertEq (wchi.balanceOf (alice), 200);

    vm.expectRevert ("ERC20: transfer amount exceeds balance");
    xa.register ("p", "bar");
    xa.register ("p", "ba");
    assertEq (wchi.balanceOf (alice), 0);
    assertEq (wchi.balanceOf (feeReceiver), 700);
  }

  function test_mintsToken () public
  {
    vm.startPrank (alice);
    assertEq (xa.balanceOf (alice), 0);

    uint id = xa.tokenIdForName ("p", "foo");
    xa.register ("p", "foo");

    assertEq (xa.balanceOf (alice), 1);
    assertEq (xa.ownerOf (id), alice);
  }

  function test_registrationEvent () public
  {
    vm.startPrank (alice);
    uint id = xa.tokenIdForName ("p", "foo");
    vm.expectEmit (address (xa));
    emit IXayaAccounts.Registration ("p", "foo", id, alice);
    xa.register ("p", "foo");
  }

  /* ************************************************************************ */

  function test_moveAuthorisation () public
  {
    vm.startPrank (alice);
    vm.expectRevert ("ERC721: operator query for nonexistent token");
    defaultMove ("p", "foo", "x");

    uint id = xa.tokenIdForName ("p", "foo");
    xa.register ("p", "foo");

    defaultMove ("p", "foo", "x");

    vm.startPrank (bob);
    vm.expectRevert ("not allowed to send a move for this account");
    defaultMove ("p", "foo", "x");

    vm.startPrank (alice);
    xa.transferFrom (alice, bob, id);
    vm.startPrank (bob);
    defaultMove ("p", "foo", "x");

    vm.startPrank (alice);
    vm.expectRevert ("not allowed to send a move for this account");
    defaultMove ("p", "foo", "x");

    vm.startPrank (bob);
    xa.approve (alice, id);
    xa.setApprovalForAll (charly, true);

    vm.startPrank (alice);
    defaultMove ("p", "foo", "x");
    vm.startPrank (charly);
    defaultMove ("p", "foo", "x");
  }

  function test_moveNonces () public
  {
    vm.startPrank (alice);
    uint id = xa.tokenIdForName ("p", "foo");

    xa.register ("p", "foo");
    defaultMove ("p", "foo", "x");
    defaultMove ("p", "foo", "x");
    assertEq (xa.nextNonce (id), 2);

    vm.expectRevert ("nonce mismatch");
    xa.move ("p", "foo", "x", 0, 0, address (0));
    vm.expectRevert ("nonce mismatch");
    xa.move ("p", "foo", "x", 1, 0, address (0));
    vm.expectRevert ("nonce mismatch");
    xa.move ("p", "foo", "x", 3, 0, address (0));

    xa.move ("p", "foo", "x", 2, 0, address (0));
    assertEq (xa.nextNonce (id), 3);
  }

  function test_policyCheckedForMoves () public
  {
    vm.startPrank (alice);
    xa.register ("p", "foo");
    vm.expectRevert ("move data must not be empty");
    defaultMove ("p", "foo", "");
  }

  function test_moveFee () public
  {
    uint id = xa.tokenIdForName ("p", "foo");

    vm.startPrank (alice);
    xa.register ("p", "foo");
    xa.approve (bob, id);

    defaultMove ("p", "foo", "abc");
    vm.startPrank (bob);
    defaultMove ("p", "foo", "xy");

    assertEq (wchi.balanceOf (alice), 1e6 - 303);
    assertEq (wchi.balanceOf (bob), 1e6 - 2);
    assertEq (wchi.balanceOf (feeReceiver), 305);

    vm.startPrank (alice);
    wchi.transfer (bob, 1e6 - 303 - 2);
    assertEq (wchi.balanceOf (alice), 2);

    vm.expectRevert ("ERC20: transfer amount exceeds balance");
    defaultMove ("p", "foo", "abc");
    defaultMove ("p", "foo", "ab");

    assertEq (wchi.balanceOf (alice), 0);
    assertEq (wchi.balanceOf (feeReceiver), 307);
  }

  function test_paymentsWithMoves () public
  {
    uint id = xa.tokenIdForName ("p", "foo");

    vm.startPrank (alice);
    xa.register ("p", "foo");
    xa.approve (bob, id);

    vm.expectRevert ("non-zero amount for zero receiver");
    xa.move ("p", "foo", "x", type (uint256).max, 42, address (0));
    xa.move ("p", "foo", "x", type (uint256).max, 0, bob);

    assertEq (wchi.balanceOf (alice), 1e6 - 300);
    assertEq (wchi.balanceOf (bob), 1e6);
    assertEq (wchi.balanceOf (feeReceiver), 300);

    vm.startPrank (bob);
    vm.expectRevert ("ERC20: transfer amount exceeds balance");
    xa.move ("p", "foo", "x", type (uint256).max, 1e6 + 1, alice);
    xa.move ("p", "foo", "x", type (uint256).max, 1e6, alice);

    assertEq (wchi.balanceOf (alice), 2e6 - 300);
    assertEq (wchi.balanceOf (bob), 0);
    assertEq (wchi.balanceOf (feeReceiver), 300);
  }

  function test_moveEvents () public
  {
    uint id = xa.tokenIdForName ("p", "foo");

    vm.startPrank (alice);
    xa.register ("p", "foo");
    xa.approve (bob, id);

    vm.startPrank (bob);
    vm.expectEmit (address (xa));
    emit IXayaAccounts.Move ("p", "foo", "x", id, 0, bob, 42, alice);
    xa.move ("p", "foo", "x", type (uint256).max, 42, alice);
  }

  /* ************************************************************************ */

  function test_freeRegistrationsAndMoves () public
  {
    vm.startPrank (alice);
    wchi.approve (address (xa), 0);
    xa.register ("p", "x");
    defaultMove ("p", "x", "y");

    assertEq (wchi.balanceOf (alice), 1e6);
    assertEq (wchi.balanceOf (feeReceiver), 0);
  }

  function test_permitOperator () public
  {
    uint id = xa.tokenIdForName ("p", "foo");
    vm.startPrank (alice);
    xa.register ("p", "foo");
    xa.transferFrom (alice, signer1, id);

    bytes memory message = xa.permitOperatorMessage (bob);
    bytes memory sgn1 = sign (message, signer1Key);
    bytes memory sgn2 = sign (abi.encodePacked ("something"), signer1Key);
    bytes memory sgn3 = sign (message, signer2Key);

    vm.startPrank (charly);
    xa.permitOperator (alice, sgn1);
    xa.permitOperator (bob, sgn2);
    xa.permitOperator (bob, sgn3);

    assertFalse (xa.isApprovedForAll (signer1, alice));
    assertFalse (xa.isApprovedForAll (signer1, bob));

    vm.startPrank (alice);
    vm.expectRevert ("ERC721: transfer caller is not owner nor approved");
    xa.transferFrom (signer1, alice, id);

    vm.startPrank (bob);
    vm.expectRevert ("ERC721: transfer caller is not owner nor approved");
    xa.transferFrom (signer1, alice, id);

    vm.startPrank (charly);
    xa.permitOperator (bob, sgn1);

    assertTrue (xa.isApprovedForAll (signer1, bob));
    vm.startPrank (bob);
    xa.transferFrom (signer1, alice, id);
  }

  function test_permitBoundToContract () public
  {
    vm.startPrank (owner);
    XayaAccounts xa2 = new XayaAccounts (wchi, policy);

    bytes memory message = xa.permitOperatorMessage (alice);
    bytes memory sgn = sign (message, signer1Key);

    xa.permitOperator (alice, sgn);
    xa2.permitOperator (alice, sgn);

    assertTrue (xa.isApprovedForAll (signer1, alice));
    assertFalse (xa2.isApprovedForAll (signer1, alice));
  }

}

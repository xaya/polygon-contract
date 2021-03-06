// SPDX-License-Identifier: MIT
// Copyright (C) 2021-2022 Autonomous Worlds Ltd

const truffleAssert = require ("truffle-assertions");
const truffleContract = require ("@truffle/contract");
const { time } = require ("@openzeppelin/test-helpers");

const wchiData = require ("@xaya/wchi/build/contracts/WCHI.json");
const WCHI = truffleContract (wchiData);
WCHI.setProvider (web3.currentProvider);

const TestPolicy = artifacts.require ("TestPolicy");
const XayaAccounts = artifacts.require ("XayaAccounts");

const zeroAddr = "0x0000000000000000000000000000000000000000";
const maxUint256 = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
const bnMaxUint256 = web3.utils.toBN (maxUint256);
const noNonce = bnMaxUint256;

contract ("XayaAccounts", accounts => {
  let wchiSupply = accounts[0];
  let feeReceiver = accounts[1];
  let owner = accounts[2];
  let alice = accounts[3];
  let bob = accounts[4];

  let wchi, policy, xa;
  beforeEach (async () => {
    wchi = await WCHI.new ({from: wchiSupply});
    policy = await TestPolicy.new ({from: feeReceiver});
    xa = await XayaAccounts.new (wchi.address, policy.address, {from: owner});

    await wchi.transfer (alice, 1000000, {from: wchiSupply});
    await wchi.transfer (bob, 1000000, {from: wchiSupply});

    await wchi.approve (xa.address, bnMaxUint256, {from: alice});
    await wchi.approve (xa.address, bnMaxUint256, {from: bob});
  });

  /* ************************************************************************ */

  it ("should handle ID/name mapping correctly", async () => {
    const id1 = await xa.tokenIdForName ("p", "foo");
    const id2 = await xa.tokenIdForName ("p", "bar");
    const id3 = await xa.tokenIdForName ("g", "foo");
    assert.notEqual (id1.toString (), id2.toString ());
    assert.notEqual (id1.toString (), id3.toString ());

    /* The other way (token ID to name, from hash to preimage) only works if
       we have the name already registered.  */
    await truffleAssert.reverts (xa.tokenIdToName (id1), "no matching account");
    await truffleAssert.reverts (xa.tokenIdToName (id2), "no matching account");

    await xa.register ("p", "foo", {from: alice});
    assert.equal ((await xa.tokenIdForName ("p", "foo")).toString (),
                  id1.toString ());

    /* After the name is registered, we can look up the preimage by hash.  */
    assert.deepEqual (await xa.tokenIdToName (id1), {"0": "p", "1": "foo"});
    await truffleAssert.reverts (xa.tokenIdToName (id2), "no matching account");
  });

  it ("should answer exists correctly", async () => {
    const id1 = await xa.tokenIdForName ("p", "foo");
    const id2 = await xa.tokenIdForName ("p", "bar");

    assert.equal (await xa.exists (id1), false);
    assert.equal (await xa.exists ("p", "foo"), false);

    await xa.register ("p", "foo", {from: alice});

    assert.equal (await xa.exists (id1), true);
    assert.equal (await xa.exists ("p", "foo"), true);

    assert.equal (await xa.exists (id2), false);
    assert.equal (await xa.exists ("p", "bar"), false);
  });

  it ("should return metadata per the policy", async () => {
    assert.equal (await xa.contractURI (), "contract metadata");

    const id = await xa.tokenIdForName ("p", "foo");
    await truffleAssert.reverts (xa.tokenURI (id), "no matching account");
    await xa.register ("p", "foo", {from: alice});
    assert.equal (await xa.tokenURI (id), "foo");
  });

  it ("should handle policy changes correctly", async () => {
    const newPolicy1 = await TestPolicy.new ({from: feeReceiver});
    const newPolicy2 = await TestPolicy.new ({from: feeReceiver});

    await truffleAssert.reverts (xa.enactPolicyChange ({from: alice}),
                                 "no policy change is scheduled");

    await truffleAssert.reverts (
        xa.schedulePolicyChange (zeroAddr, {from: owner}),
        "invalid policy");
    await truffleAssert.reverts (
        xa.schedulePolicyChange (newPolicy1.address, {from: alice}),
        "not the owner");

    /* Schedule a valid policy change.  */

    let tx = await xa.schedulePolicyChange (newPolicy1.address, {from: owner});
    truffleAssert.eventNotEmitted (tx, "PolicyChanged");
    truffleAssert.eventEmitted (tx, "PolicyChangeScheduled", (ev) => {
      return ev.newPolicy === newPolicy1.address;
    });

    assert.equal (await xa.policy (), policy.address);
    assert.equal (await xa.nextPolicy (), newPolicy1.address);

    /* Schedule another policy change, which will override the existing one.  */

    await xa.schedulePolicyChange (newPolicy2.address, {from: owner});

    assert.equal (await xa.policy (), policy.address);
    assert.equal (await xa.nextPolicy (), newPolicy2.address);

    /* Enact after the timelock is over.  */

    const timeLock = await xa.policyTimelock ();
    time.increase (timeLock - 100);
    await truffleAssert.reverts (xa.enactPolicyChange ({from: alice}),
                                 "timelock is not expired");

    time.increase (101);

    assert.equal (await xa.policy (), policy.address);
    assert.equal (await xa.nextPolicy (), newPolicy2.address);

    tx = await xa.enactPolicyChange ({from: alice});
    truffleAssert.eventNotEmitted (tx, "PolicyChangeScheduled");
    truffleAssert.eventEmitted (tx, "PolicyChanged", (ev) => {
      return ev.oldPolicy === policy.address
          && ev.newPolicy === newPolicy2.address;
    });

    assert.equal (await xa.policy (), newPolicy2.address);
    assert.equal (await xa.nextPolicy (), zeroAddr);
    assert.equal (await xa.nextPolicyAfter (), 0);

    await truffleAssert.reverts (xa.enactPolicyChange ({from: alice}),
                                 "no policy change is scheduled");
  });

  /* ************************************************************************ */

  it ("should not allow to register an existing name", async () => {
    await xa.register ("p", "foo", {from: alice});
    await xa.register ("g", "foo", {from: alice});

    await truffleAssert.reverts (xa.register ("p", "foo", {from: alice}),
                                 "token already minted");
    await truffleAssert.reverts (xa.register ("p", "foo", {from: bob}),
                                 "token already minted");
  });

  it ("should check the policy for registrations", async () => {
    await truffleAssert.reverts (xa.register ("", "foo", {from: alice}),
                                 "namespace must not be empty");
  });

  it ("should charge the registration fee", async () => {
    await xa.register ("p", "foo", {from: alice});
    await xa.register ("p", "zz", {from: bob});
    assert.equal ((await wchi.balanceOf (alice)).toNumber (), 1000000 - 300);
    assert.equal ((await wchi.balanceOf (bob)).toNumber (), 1000000 - 200);
    assert.equal ((await wchi.balanceOf (feeReceiver)).toNumber (), 500);

    await wchi.transfer (bob, 1000000 - 300 - 200, {from: alice});
    assert.equal ((await wchi.balanceOf (alice)).toNumber (), 200);

    await truffleAssert.reverts (xa.register ("p", "bar", {from: alice}),
                                 "insufficient balance");
    await xa.register ("p", "ba", {from: alice});
    assert.equal ((await wchi.balanceOf (alice)).toNumber (), 0);
    assert.equal ((await wchi.balanceOf (feeReceiver)).toNumber (), 700);
  });

  it ("should mint the token correctly", async () => {
    assert.equal ((await xa.balanceOf (alice)).toNumber (), 0);

    const id = await xa.tokenIdForName ("p", "foo");
    await xa.register ("p", "foo", {from: alice});

    assert.equal ((await xa.balanceOf (alice)).toNumber (), 1);
    assert.equal (await xa.ownerOf (id), alice);
  });

  it ("should emit registration events correctly", async () => {
    const id = await xa.tokenIdForName ("p", "foo");
    let tx = await xa.register ("p", "foo", {from: alice});
    truffleAssert.eventEmitted (tx, "Registration", (ev) => {
      return ev.ns === "p" && ev.name === "foo"
          && ev.tokenId.toString () === id.toString ()
          && ev.owner === alice;
    });
  });

  /* ************************************************************************ */

  it ("should allow moves only for authorised senders", async () => {
    await truffleAssert.reverts (
        xa.move ("p", "foo", "x", noNonce, 0, zeroAddr, {from: alice}),
        "nonexistent token");

    const id = await xa.tokenIdForName ("p", "foo");
    await xa.register ("p", "foo", {from: alice});

    await xa.move ("p", "foo", "x", noNonce, 0, zeroAddr, {from: alice});
    await truffleAssert.reverts (
        xa.move ("p", "foo", "x", noNonce, 0, zeroAddr, {from: bob}),
        "not allowed");

    await xa.transferFrom (alice, bob, id, {from: alice});
    await xa.move ("p", "foo", "x", noNonce, 0, zeroAddr, {from: bob});
    await truffleAssert.reverts (
        xa.move ("p", "foo", "x", noNonce, 0, zeroAddr, {from: alice}),
        "not allowed");

    await xa.approve (alice, id, {from: bob});
    await xa.move ("p", "foo", "x", noNonce, 0, zeroAddr, {from: alice});
  });

  it ("should handle nonces for moves correctly", async () => {
    const id = await xa.tokenIdForName ("p", "foo");
    await xa.register ("p", "foo", {from: alice});
    await xa.move ("p", "foo", "x", noNonce, 0, zeroAddr, {from: alice});
    await xa.move ("p", "foo", "x", noNonce, 0, zeroAddr, {from: alice});

    assert.equal ((await xa.nextNonce (id)).toNumber (), 2);

    await truffleAssert.reverts (
        xa.move ("p", "foo", "x", 0, 0, zeroAddr, {from: alice}),
        "nonce mismatch");
    await truffleAssert.reverts (
        xa.move ("p", "foo", "x", 1, 0, zeroAddr, {from: alice}),
        "nonce mismatch");
    await truffleAssert.reverts (
        xa.move ("p", "foo", "x", 3, 0, zeroAddr, {from: alice}),
        "nonce mismatch");
    await xa.move ("p", "foo", "x", 2, 0, zeroAddr, {from: alice});
  });

  it ("should check the policy for moves", async () => {
    await xa.register ("p", "foo", {from: alice});
    await truffleAssert.reverts (
        xa.move ("p", "foo", "", noNonce, 0, zeroAddr, {from: alice}),
        "move data must not be empty");
  });

  it ("should charge the move fee", async () => {
    const id = await xa.tokenIdForName ("p", "foo");
    await xa.register ("p", "foo", {from: alice});
    await xa.approve (bob, id, {from: alice});

    await xa.move ("p", "foo", "abc", noNonce, 0, zeroAddr, {from: alice});
    await xa.move ("p", "foo", "xy", noNonce, 0, zeroAddr, {from: bob});

    assert.equal ((await wchi.balanceOf (alice)).toNumber (), 1000000 - 303);
    assert.equal ((await wchi.balanceOf (bob)).toNumber (), 1000000 - 2);
    assert.equal ((await wchi.balanceOf (feeReceiver)).toNumber (), 305);

    await wchi.transfer (bob, 1000000 - 303 - 2, {from: alice});
    assert.equal ((await wchi.balanceOf (alice)).toNumber (), 2);

    await truffleAssert.reverts (
        xa.move ("p", "foo", "abc", noNonce, 0, zeroAddr, {from: alice}),
        "insufficient balance");
    await xa.move ("p", "foo", "ab", noNonce, 0, zeroAddr, {from: alice});
    assert.equal ((await wchi.balanceOf (alice)).toNumber (), 0);
    assert.equal ((await wchi.balanceOf (feeReceiver)).toNumber (), 307);
  });

  it ("should handle payments with moves", async () => {
    const id = await xa.tokenIdForName ("p", "foo");
    await xa.register ("p", "foo", {from: alice});
    await xa.approve (bob, id, {from: alice});

    await truffleAssert.reverts (
        xa.move ("p", "foo", "x", noNonce, 42, zeroAddr, {from: alice}),
        "non-zero amount for zero receiver");
    await xa.move ("p", "foo", "x", noNonce, 0, bob, {from: alice});

    assert.equal ((await wchi.balanceOf (alice)).toNumber (), 1000000 - 300);
    assert.equal ((await wchi.balanceOf (bob)).toNumber (), 1000000);
    assert.equal ((await wchi.balanceOf (feeReceiver)).toNumber (), 300);

    await truffleAssert.reverts (
        xa.move ("p", "foo", "x", noNonce, 1000001, alice, {from: bob}),
        "insufficient balance");
    await xa.move ("p", "foo", "x", noNonce, 1000000, alice, {from: bob});

    assert.equal ((await wchi.balanceOf (alice)).toNumber (), 2000000 - 300);
    assert.equal ((await wchi.balanceOf (bob)).toNumber (), 0);
    assert.equal ((await wchi.balanceOf (feeReceiver)).toNumber (), 300);
  });

  it ("should emit move events correctly", async () => {
    const id = await xa.tokenIdForName ("p", "foo");
    await xa.register ("p", "foo", {from: alice});
    await xa.approve (bob, id, {from: alice});

    let tx = await xa.move ("p", "foo", "x", noNonce, 42, alice, {from: bob});
    truffleAssert.eventEmitted (tx, "Move", (ev) => {
      return ev.ns === "p" && ev.name === "foo" && ev.mv === "x"
          && ev.tokenId.toString () === id.toString ()
          && ev.nonce.toNumber () === 0
          && ev.mover === bob
          && ev.amount.toNumber () === 42 && ev.receiver === alice;
    });
  });

  /* ************************************************************************ */

  it ("should handle free registrations and moves", async () => {
    await wchi.approve (xa.address, 0, {from: alice});
    await xa.register ("p", "x", {from: alice});
    await xa.move ("p", "x", "y", noNonce, 0, zeroAddr, {from: alice});
    assert.equal ((await wchi.balanceOf (alice)).toNumber (), 1000000);
    assert.equal ((await wchi.balanceOf (feeReceiver)).toNumber (), 0);
  });

  it ("should properly handle permit signatures", async () => {
    const id = await xa.tokenIdForName ("p", "foo");
    await xa.register ("p", "foo", {from: alice});

    /* To be able to sign messages, we need to create a new account
       explicitly with web3.eth.accounts.wallet (instead of the
       pre-existing accounts).  This one will own the name but need not
       have any funds.  */
    const wallet = web3.eth.accounts.wallet.create (2);
    await xa.transferFrom (alice, wallet[0].address, id, {from: alice});

    const msg = await xa.permitOperatorMessage (bob);
    const sgn1 = await wallet[0].sign (msg);
    const sgn2 = await wallet[0].sign ("something");
    const sgn3 = await wallet[1].sign (msg);

    await xa.permitOperator (alice, sgn1.signature);
    await xa.permitOperator (bob, sgn2.signature);
    await xa.permitOperator (bob, sgn3.signature);

    assert.isFalse (await xa.isApprovedForAll (wallet[0].address, alice));
    assert.isFalse (await xa.isApprovedForAll (wallet[0].address, bob));
    await truffleAssert.reverts (
        xa.transferFrom (wallet[0].address, alice, id, {from: alice}),
        "is not owner nor approved");
    await truffleAssert.reverts (
        xa.transferFrom (wallet[0].address, alice, id, {from: bob}),
        "is not owner nor approved");

    await xa.permitOperator (bob, sgn1.signature);
    assert.isTrue (await xa.isApprovedForAll (wallet[0].address, bob));
    await xa.transferFrom (wallet[0].address, alice, id, {from: bob});
  });

  it ("should ensure replay protection of permit signatures", async () => {
    const xa2 = await XayaAccounts.new (wchi.address, policy.address,
                                        {from: owner});

    const wallet = web3.eth.accounts.wallet.create (2);

    const msg = await xa.permitOperatorMessage (alice);
    const sgn = await wallet[0].sign (msg);

    await xa.permitOperator (alice, sgn.signature);
    await xa2.permitOperator (alice, sgn.signature);

    assert.isTrue (await xa.isApprovedForAll (wallet[0].address, alice));
    assert.isFalse (await xa2.isApprovedForAll (wallet[0].address, alice));
  });

  /* ************************************************************************ */

});

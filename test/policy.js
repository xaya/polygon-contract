// SPDX-License-Identifier: MIT
// Copyright (C) 2021-2022 Autonomous Worlds Ltd

const truffleAssert = require ("truffle-assertions");
const { time } = require ("@openzeppelin/test-helpers");

const NftMetadata = artifacts.require ("NftMetadata");
const XayaPolicy = artifacts.require ("XayaPolicyTestHelper");

const zeroAddr = "0x0000000000000000000000000000000000000000";

contract ("XayaPolicy", accounts => {
  let owner = accounts[0];
  let other = accounts[1];

  let metadata, pol;
  beforeEach (async () => {
    metadata = await NftMetadata.new ({from: owner});
    pol = await XayaPolicy.new (metadata.address, 100, {from: owner});
  });

  /* ************************************************************************ */

  it ("should require a metadata contract address", async () => {
    await truffleAssert.reverts (
        XayaPolicy.new (zeroAddr, 100, {from: owner, gas: 1000000}),
        "invalid metadata contract");
  });

  it ("should handle metadata contract changes correctly", async () => {
    let newMetadata = await NftMetadata.new ({from: owner});

    await truffleAssert.reverts (
        pol.setMetadataContract (newMetadata, {from: other}),
        "not the owner");
    await truffleAssert.reverts (
        pol.setMetadataContract (zeroAddr, {from: owner}),
        "invalid metadata contract");
    assert.equal (await pol.metadataContract (), metadata.address);

    let tx = await pol.setMetadataContract (newMetadata.address, {from: owner});
    truffleAssert.eventEmitted (tx, "MetadataContractChanged", (ev) => {
      return ev.oldContract === metadata.address
          && ev.newContract === newMetadata.address;
    });
    assert.equal (await pol.metadataContract (), newMetadata.address);
  });

  it ("should handle fee receiver changes correctly", async () => {
    await truffleAssert.reverts (
        pol.setFeeReceiver (other, {from: other}),
        "not the owner");
    await truffleAssert.reverts (
        pol.setFeeReceiver (zeroAddr, {from: owner}),
        "invalid fee receiver");
    assert.equal (await pol.feeReceiver (), owner);

    let tx = await pol.setFeeReceiver (other, {from: owner});
    truffleAssert.eventEmitted (tx, "FeeReceiverChanged", (ev) => {
      return ev.oldReceiver === owner && ev.newReceiver === other;
    });
    assert.equal (await pol.feeReceiver (), other);

    /* Even if the fee receiver is changed, the owner should be used for
       access checks in the future.  */
    await truffleAssert.reverts (
        pol.setFeeReceiver (owner, {from: other}),
        "not the owner");
    await pol.setFeeReceiver (owner, {from: owner});
    assert.equal (await pol.feeReceiver (), owner);
  });

  it ("should handle scheduled fee changes correctly", async () => {
    assert.equal ((await pol.registrationFee ()).toNumber (), 100);

    await truffleAssert.reverts (pol.enactFeeChange ({from: other}),
                                 "no fee change is scheduled");
    await truffleAssert.reverts (
        pol.scheduleFeeChange (42, {from: other}),
        "not the owner");

    /* Schedule a valid fee change.  */

    let tx = await pol.scheduleFeeChange (42, {from: owner});
    truffleAssert.eventNotEmitted (tx, "FeeChanged");
    truffleAssert.eventEmitted (tx, "FeeChangeScheduled", (ev) => {
      return ev.newRegistrationFee.toNumber () === 42;
    });

    assert.equal (await pol.registrationFee (), 100);
    assert.equal (await pol.nextFee (), 42);

    /* Schedule another fee change, which will override the existing one.  */

    await pol.scheduleFeeChange (0, {from: owner});

    assert.equal (await pol.registrationFee (), 100);
    assert.equal (await pol.nextFee (), 0);

    /* Enact after the timelock is over.  */

    const timeLock = await pol.feeTimelock ();
    time.increase (timeLock - 100);
    await truffleAssert.reverts (pol.enactFeeChange ({from: other}),
                                 "timelock is not expired");

    time.increase (101);

    assert.equal (await pol.registrationFee (), 100);
    assert.equal (await pol.nextFee (), 0);

    tx = await pol.enactFeeChange ({from: owner});
    truffleAssert.eventNotEmitted (tx, "FeeChangeScheduled");
    truffleAssert.eventEmitted (tx, "FeeChanged", (ev) => {
      return ev.oldRegistrationFee.toNumber () === 100
          && ev.newRegistrationFee.toNumber () === 0;
    });

    assert.equal (await pol.registrationFee (), 0);
    assert.equal (await pol.nextFee (), 0);
    assert.equal (await pol.nextFeeAfter (), 0);

    await truffleAssert.reverts (pol.enactFeeChange ({from: other}),
                                 "no fee change is scheduled");
  });

  /* ************************************************************************ */

  it ("should return the correct registration fee", async () => {
    const fee = (await pol.registrationFee ()).toNumber ();
    assert.equal ((await pol.checkRegistration ("p", "")).toNumber (), fee);
    assert.equal ((await pol.checkRegistration ("g", "abc")).toNumber (), fee);
    assert.equal ((await pol.checkRegistration ("g", "äöü")).toNumber (), fee);
  });

  it ("should validate names correctly", async () => {
    await pol.checkRegistration ("p", "");
    await pol.checkRegistration ("p", "abc");
    await pol.checkRegistration ("p", "domob äöü");

    const ofLength = (n) => {
      let res = "";
      while (res.length < n)
        res += "x";
      return res;
    };

    await pol.checkRegistration (ofLength (1), ofLength (254));
    await pol.checkRegistration (ofLength (1), "ß" + ofLength (252));
    await pol.checkRegistration (ofLength (10), ofLength (245));
    await pol.checkRegistration (ofLength (255), ofLength (0));

    await truffleAssert.reverts (pol.checkRegistration ("", "x"),
                                 "namespace must not be empty");

    await truffleAssert.reverts (
        pol.checkRegistration (ofLength (1), ofLength (255)),
        "name is too long");
    await truffleAssert.reverts (
        pol.checkRegistration (ofLength (1), "ß" + ofLength (253)),
        "name is too long");
    await truffleAssert.reverts (
        pol.checkRegistration (ofLength (10), ofLength (255)),
        "name is too long");

    await truffleAssert.reverts (pol.checkRegistration ("a b", "x"),
                                 "invalid namespace");
    await truffleAssert.reverts (pol.checkRegistration ("äöü", "x"),
                                 "invalid namespace");
    await truffleAssert.reverts (pol.checkRegistration ("X", "x"),
                                 "invalid namespace");
    await truffleAssert.reverts (pol.checkRegistration ("0", "x"),
                                 "invalid namespace");

    await truffleAssert.reverts (pol.checkRegistration ("x", "a\nb"),
                                 "invalid codepoint in name");
    await truffleAssert.reverts (pol.checkRegistration ("x", "a\0b"),
                                 "invalid codepoint in name");
    await truffleAssert.reverts (
        pol.checkRegistrationWithBytes (web3.utils.asciiToHex ("x"), "0xC080"),
        "overlong sequence");
    await truffleAssert.reverts (
        pol.checkRegistrationWithBytes (web3.utils.asciiToHex ("x"), "0x20C2"),
        "eof in the middle");
  });

  it ("should validate moves correctly", async () => {
    assert.equal ((await pol.checkMove ("p", "")).toNumber (), 0);
    assert.equal ((await pol.checkMove ("p", "abc {\": xyz}")).toNumber (), 0);
    await truffleAssert.reverts (pol.checkMove ("p", "42\n50"),
                                 "invalid move data");
    await truffleAssert.reverts (pol.checkMove ("p", "abcx\u007F"),
                                 "invalid move data");
    await truffleAssert.reverts (pol.checkMove ("p", "abc äöü"),
                                 "invalid move data");
  });

  it ("should return metadata per the configured contract", async () => {
    assert.equal (
        await pol.tokenUriForName ("p", "domob"),
        await metadata.tokenUriForName ("p", "domob"));
    assert.equal (await pol.contractUri (), await metadata.contractUri ());
  });

  /* ************************************************************************ */

});

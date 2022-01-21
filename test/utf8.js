// SPDX-License-Identifier: MIT
// Copyright (C) 2021-2022 Autonomous Worlds Ltd

const truffleAssert = require ("truffle-assertions");

const Utf8 = artifacts.require ("Utf8TestHelper");

contract ("Utf8", accounts => {
  let utf8;
  before (async () => {
    utf8 = await Utf8.new ();
  });

  /* Helper function that calls decodeCodepoint and then verifies that
     it succeeds and returns the expected codepoint and new offset.  */
  const expectDecode = async (data, offset, expectedCp, expectedNewOffset) => {
    const res = await utf8.decodeCodepoint (data, offset);
    assert.equal (res.cp.toNumber (), expectedCp);
    assert.equal (res.newOffset.toNumber (), expectedNewOffset);
  };

  it ("catches eof before decoding codepoints", async () => {
    await truffleAssert.reverts (
        utf8.decodeCodepoint (web3.utils.asciiToHex ("abc"), 3),
        "no more input");
    await truffleAssert.reverts (
        utf8.decodeCodepoint (web3.utils.asciiToHex ("abc"), 5),
        "no more input");
    await truffleAssert.reverts (utf8.decodeCodepoint ([], 0), "no more input");
  });

  it ("decodes codepoints with offsets correctly", async () => {
    /* This contains a one, two, three and four byte sequence, and then
       again a single byte at the end.  */
    const testData = "0x24" + "C2A2" + "E0A4B9" + "F0908D88" + "00";
    await expectDecode (testData, 0, 0x24, 1);
    await expectDecode (testData, 1, 0xA2, 3);
    await expectDecode (testData, 3, 0x939, 6);
    await expectDecode (testData, 6, 0x10348, 10);
    await expectDecode (testData, 10, 0x00, 11);
  });

  it ("decodes first/last codepoints correctly", async () => {
    await expectDecode ("0x00", 0, 0x00, 1);
    await expectDecode ("0x7F", 0, 0x7F, 1);

    await expectDecode ("0xC280", 0, 0x80, 2);
    await expectDecode ("0xDFBF", 0, 0x7FF, 2);

    await expectDecode ("0xE0A080", 0, 0x800, 3);
    await expectDecode ("0xEFBFBF", 0, 0xFFFF, 3);

    await expectDecode ("0xF0908080", 0, 0x10000, 4);
    await expectDecode ("0xF48FBFBF", 0, 0x10FFFF, 4);
  });

  it ("handles invalid start characters", async () => {
    await truffleAssert.reverts (utf8.decodeCodepoint ("0x82", 0),
                                 "mid-sequence character");
    await truffleAssert.reverts (utf8.decodeCodepoint ("0xF8", 0),
                                 "invalid sequence start");
  });

  it ("handles mid-sequence errors", async () => {
    await truffleAssert.reverts (utf8.decodeCodepoint ("0xC2", 0),
                                 "eof in the middle of a sequence");
    await truffleAssert.reverts (utf8.decodeCodepoint ("0xC240", 0),
                                 "expected sequence continuation");
    await truffleAssert.reverts (utf8.decodeCodepoint ("0xC2E0", 0),
                                 "expected sequence continuation");
  });

  it ("fails to decode too large codepoints", async () => {
    await truffleAssert.reverts (utf8.decodeCodepoint ("0xF4908080", 0),
                                 "overlong sequence");
  });

  it ("fails to decode overlong sequences", async () => {
    await truffleAssert.reverts (utf8.decodeCodepoint ("0xC080", 0),
                                 "overlong sequence");
    await truffleAssert.reverts (utf8.decodeCodepoint ("0xC0AE", 0),
                                 "overlong sequence");
    await truffleAssert.reverts (utf8.decodeCodepoint ("0xE08080", 0),
                                 "overlong sequence");
    await truffleAssert.reverts (utf8.decodeCodepoint ("0xF0808080", 0),
                                 "overlong sequence");
  });

  it ("fails to decode surrogate pairs", async () => {
    await truffleAssert.reverts (utf8.decodeCodepoint ("0xEDA18C", 0),
                                 "surrogate-pair character");
    await truffleAssert.reverts (utf8.decodeCodepoint ("0xEDBEB4", 0),
                                 "surrogate-pair character");
  });

  it ("validates a string correctly", async () => {
    await utf8.validate ("0x24" + "C2A2" + "E0A4B9" + "F0908D88" + "00");
    await truffleAssert.reverts (utf8.validate ("0x24C2"), "eof in the middle");
    await truffleAssert.reverts (utf8.validate ("0xC080"), "overlong sequence");
  });

});

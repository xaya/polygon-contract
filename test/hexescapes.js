// SPDX-License-Identifier: MIT
// Copyright (C) 2022 Autonomous Worlds Ltd

const truffleAssert = require ("truffle-assertions");

const HexEscapes = artifacts.require ("HexEscapesTestHelper");

contract ("HexEscapes", accounts => {
  let esc;
  before (async () => {
    esc = await HexEscapes.new ();
  });

  it ("encodes codepoints correctly as JSON literals", async () => {
    assert.equal (await esc.jsonCodepoint (0x40), "\\u0040");
    assert.equal (await esc.jsonCodepoint (0xFFFF), "\\uFFFF");
    assert.equal (await esc.jsonCodepoint (0x1D11E), "\\uD834\\uDD1E");

    /* Part of surrogate pair.  */
    await truffleAssert.reverts (
        esc.jsonCodepoint (0xD834),
        "invalid codepoint");

    /* Value too large.  */
    await truffleAssert.reverts (
        esc.jsonCodepoint (0xFF0000),
        "invalid codepoint");
  });

  it ("encodes codepoints correctly as XML escapes", async () => {
    assert.equal (await esc.xmlCodepoint (0x40), "&#x000040;");
    assert.equal (await esc.xmlCodepoint (0xFFFF), "&#x00FFFF;");
    assert.equal (await esc.xmlCodepoint (0xFF00FF), "&#xFF00FF;");
    await truffleAssert.reverts (esc.xmlCodepoint (0x1000000), "does not fit");
  });

  it ("hexlifies strings correctly", async () => {
    assert.equal (await esc.hexlify (""), "");
    assert.equal (await esc.hexlify ("abc"), "616263");

    /* UTF-8 encoded string (six bytes in total).  */
    assert.equal (await esc.hexlify ("äöü"), "C3A4C3B6C3BC");
  });

});

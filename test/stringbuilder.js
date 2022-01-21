// SPDX-License-Identifier: MIT
// Copyright (C) 2022 Autonomous Worlds Ltd

const truffleAssert = require ("truffle-assertions");

const StringBuilder = artifacts.require ("StringBuilderTestHelper");

contract ("StringBuilder", accounts => {

  it ("catches eof before decoding codepoints", async () => {
    const builder = await StringBuilder.new (5);
    assert.equal (await builder.extract (), "");
    await builder.append ("abc");
    assert.equal (await builder.extract (), "abc");
    await builder.append ("de");
    assert.equal (await builder.extract (), "abcde");
  });

  it ("fails to decode surrogate pairs", async () => {
    const builder = await StringBuilder.new (3);
    await builder.append ("abc");
    await builder.append ("");
    assert.equal (await builder.extract (), "abc");
    await truffleAssert.reverts (builder.append ("x"), "maxLen exceeded");
  });

});

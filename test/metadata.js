// SPDX-License-Identifier: MIT
// Copyright (C) 2021 Autonomous Worlds Ltd

const truffleAssert = require ("truffle-assertions");

const NftMetadata = artifacts.require ("NftMetadata");

contract ("NftMetadata", accounts => {
  let owner = accounts[0];
  let other = accounts[1];

  let m;
  beforeEach (async () => {
    m = await NftMetadata.new ({from: owner});

    /* Set a simpler namespace configuration for testing.  */
    await m.setNamespaceData ("", "default description", "000000", "unknown");
    await m.setNamespaceData ("p", "player accounts", "ffffff", "player");
  });

  /**
   * Helper method that parses a data URL, asserts certain things (e.g. that
   * it is in base64 format) and returns the mime-type and decoded payload
   * data as array.
   */
  const parseDataUrl = (url) => {
    assert.equal (url.substr (0, 5), "data:");
    url = url.substr (5);

    const parts = url.split (",");
    assert.equal (parts.length, 2);

    const mimeAndBase64 = parts[0];
    const decoded = Buffer.from (parts[1], "base64").toString ("utf-8");

    assert.equal (mimeAndBase64.substr (mimeAndBase64.length - 7), ";base64");
    const mime = mimeAndBase64.substr (0, mimeAndBase64.length - 7);

    return [mime, decoded];
  };

  /**
   * Extracts the token URI for a given namespace/name combination from our
   * test contract and decodes it as JSON.
   */
  const getDataJson = async (ns, name) => {
    const uri = await m.tokenUriForName (ns, name);
    const parts = parseDataUrl (uri);
    assert.equal (parts.length, 2);
    assert.equal (parts[0], "application/json");
    return JSON.parse (parts[1]);
  }

  /* ************************************************************************ */

  it ("should build the expected JSON for player accounts", async () => {
    assert.deepEqual (await getDataJson ("p", "domob"), {
      "name": "p/domob",
      "description": "player accounts",
      "background_color": "ffffff",
      "attributes":
        [
          {"trait_type": "Namespace", "value": "p"},
          {"trait_type": "Name", "value": "domob"},
          {"trait_type": "Type", "value": "player"}
        ]
    });
  });

  it ("should build the expected JSON for unknown namespaces", async () => {
    assert.deepEqual (await getDataJson ("x", "domob"), {
      "name": "x/domob",
      "description": "default description",
      "background_color": "000000",
      "attributes":
        [
          {"trait_type": "Namespace", "value": "x"},
          {"trait_type": "Name", "value": "domob"},
          {"trait_type": "Type", "value": "unknown"}
        ]
    });
  });

  it ("should properly escape strings", async () => {
    assert.equal ((await getDataJson ("x", "äöü\"\\ß"))["name"], "x/äöü\"\\ß");
    /* This is a character encoded as UTF-16 surrogate pair.  */
    assert.equal ((await getDataJson ("x", "\uD801\uDC37"))["name"], "x/𐐷");
  });

  it ("should handle namespace configuration correctly", async () => {
    await truffleAssert.reverts (
        m.setNamespaceData ("", "wrong", "", "", {from: other}),
        "not the owner");
    await truffleAssert.reverts (
        m.setNamespaceData ("p", "wrong", "", "", {from: other}),
        "not the owner");

    assert.equal ((await getDataJson ("x", "domob"))["description"],
                  "default description");
    assert.equal ((await getDataJson ("p", "domob"))["description"],
                  "player accounts");

    let tx = await m.setNamespaceData ("", "new default desc", "", "",
                                       {from: owner});
    truffleAssert.eventEmitted (tx, "NamespaceConfigured", (ev) => {
      return ev.ns === "";
    });

    tx = await m.setNamespaceData ("p", "new player desc", "", "",
                                   {from: owner});
    truffleAssert.eventEmitted (tx, "NamespaceConfigured", (ev) => {
      return ev.ns === "p";
    });

    assert.equal ((await getDataJson ("x", "domob"))["description"],
                  "new default desc");
    assert.equal ((await getDataJson ("p", "domob"))["description"],
                  "new player desc");
  });

  /* TODO: Test escaping of ", \ and Unicode.  */

  /* ************************************************************************ */

});

// SPDX-License-Identifier: MIT
// Copyright (C) 2021-2022 Autonomous Worlds Ltd

const libxmljs = require ("libxmljs");
const truffleAssert = require ("truffle-assertions");

const NftMetadata = artifacts.require ("NftMetadata");

contract ("NftMetadata", accounts => {
  let owner = accounts[0];
  let other = accounts[1];

  let m;
  beforeEach (async () => {
    m = await NftMetadata.new ({from: owner});

    /* Update some configurations to fixed values for testing.  */
    await m.setNamespaceData ("", "default description", "urlX", "ff0000",
                              "unknown");
    await m.setNamespaceData ("p", "player accounts", "urlP", "ff0000",
                              "player");
    await m.setContractMetadata ("https://contract.meta/");
    await m.setDataServerUrl ("https://data.server/");
  });

  /**
   * Helper method to check if a string starts with a given prefix.
   */
  const startsWith = (str, prefix) => {
    return str.substr (0, prefix.length) === prefix;
  };

  /**
   * Helper method that parses a data URL, asserts certain things (e.g. that
   * it is in base64 format) and returns the mime-type and decoded payload
   * data as array.
   */
  const parseDataUrl = (url) => {
    assert.isTrue (startsWith (url, "data:"));
    url = url.substr ("data:".length);

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
  const getMetadataJson = async (ns, name) => {
    const uri = await m.buildMetadataJson (ns, name);

    const parts = parseDataUrl (uri);
    assert.equal (parts.length, 2);
    assert.equal (parts[0], "application/json");

    return JSON.parse (parts[1]);
  }

  /* ************************************************************************ */

  it ("should build the expected JSON for player accounts", async () => {
    assert.deepEqual (await getMetadataJson ("p", "domob"), {
      "name": "p/domob",
      "image": "https://data.server/image/70/646F6D6F62",
      "description": "player accounts",
      "attributes":
        [
          {"trait_type": "Namespace", "value": "p"},
          {"trait_type": "Name", "value": "domob"},
          {"trait_type": "Type", "value": "player"}
        ]
    });
  });

  it ("should build the expected JSON for unknown namespaces", async () => {
    assert.deepEqual (await getMetadataJson ("x", "domob"), {
      "name": "x/domob",
      "image": "https://data.server/image/78/646F6D6F62",
      "description": "default description",
      "attributes":
        [
          {"trait_type": "Namespace", "value": "x"},
          {"trait_type": "Name", "value": "domob"},
          {"trait_type": "Type", "value": "unknown"}
        ]
    });
  });

  it ("should properly escape strings", async () => {
    assert.equal ((await getMetadataJson ("x", "äöü\"\\ß"))["name"],
                   "x/äöü\"\\ß");
    /* This is a character encoded as UTF-16 surrogate pair.  */
    assert.equal ((await getMetadataJson ("x", "\uD801\uDC37"))["name"], "x/𐐷");
  });

  it ("should build well-formed SVG", async () => {
    const testOneName = async (ns, name) => {
      const uri = await m.buildSvgImage (ns, name);
      const parts = parseDataUrl (uri);
      assert.equal (parts.length, 2);
      assert.equal (parts[0], "image/svg+xml");

      /* Check that the constructed payload is at least well-formed
         XML.  It is not easy to "verify" that it is the "correct" image,
         but this at least ensures the code is not broken and also does
         e.g. things like escapes properly.  */
      libxmljs.parseXml (parts[1]);
    };

    await testOneName ("p", "domob");
    await testOneName ("x", "foo");
    /* This name is not abbreviated but falls into a later size bucket.  */
    await testOneName ("1234567890", "123456");
    /* This name gets abbreviated with an ellipsis "..." at the end.  */
    await testOneName ("this-is-some", "very-very-very-long-name");
    await testOneName ("ß", "<>");
  });

  /* ************************************************************************ */

  it ("should handle namespace configuration correctly", async () => {
    await truffleAssert.reverts (
        m.setNamespaceData ("", "wrong", "", "", "", {from: other}),
        "not the owner");
    await truffleAssert.reverts (
        m.setNamespaceData ("p", "wrong", "", "", "", {from: other}),
        "not the owner");

    assert.equal ((await getMetadataJson ("x", "domob"))["description"],
                  "default description");
    assert.equal ((await getMetadataJson ("p", "domob"))["description"],
                  "player accounts");

    let tx = await m.setNamespaceData ("", "new default desc", "", "", "",
                                       {from: owner});
    truffleAssert.eventEmitted (tx, "NamespaceConfigured", (ev) => {
      return ev.ns === "";
    });

    tx = await m.setNamespaceData ("p", "new player desc", "", "", "",
                                   {from: owner});
    truffleAssert.eventEmitted (tx, "NamespaceConfigured", (ev) => {
      return ev.ns === "p";
    });

    assert.equal ((await getMetadataJson ("x", "domob"))["description"],
                  "new default desc");
    assert.equal ((await getMetadataJson ("p", "domob"))["description"],
                  "new player desc");
  });

  it ("should handle contract-level metadata", async () => {
    await truffleAssert.reverts (
        m.setContractMetadata ("https://example.com/", {from: other}),
        "not the owner");
    assert.equal (await m.contractUri (), "https://contract.meta/");

    await m.setContractMetadata ("https://example.com/", {from: owner});
    assert.equal (await m.contractUri (), "https://example.com/");
  });

  it ("should handle the data server correctly", async () => {
    await truffleAssert.reverts (
        m.setDataServerUrl ("https://example.com/", {from: other}),
        "not the owner");
    assert.equal (await m.dataServerUrl (), "https://data.server/");

    await m.setDataServerUrl ("https://example.com/", {from: owner});
    assert.equal (await m.dataServerUrl (), "https://example.com/");

    assert.equal (await m.tokenUriForName ("p", "domob"),
                  "https://example.com/metadata/70/646F6D6F62");
    assert.equal (await m.tokenUriForName ("p", "äöü"),
                  "https://example.com/metadata/70/C3A4C3B6C3BC");
  });

  /* ************************************************************************ */

});

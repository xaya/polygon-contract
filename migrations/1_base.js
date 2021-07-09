// SPDX-License-Identifier: MIT
// Copyright (C) 2021 Autonomous Worlds Ltd

const truffleContract = require ("truffle-contract");
const { networks } = require ("../truffle-config.js");

const XayaAccounts = artifacts.require ("XayaAccounts");
const XayaPolicy = artifacts.require ("XayaPolicy");

const wchiData = require ("@xaya/wchi/build/contracts/WCHI.json");
const WCHI = truffleContract (wchiData);
WCHI.setProvider (XayaAccounts.currentProvider);

const initialFeeInCHI = 10;

module.exports = async function (deployer, network)
  {
    /* This script is for the real deployment.  Unit tests use custom deployment
       on a per-test basis as needed, so we want to skip deployment entirely
       for them.  */
    if (network === "test")
      return;

    const wchi = await WCHI.at (networks[network].wchiAddress);
    const decimals = await wchi.decimals ();
    const fee = web3.utils.toBN (10).pow (decimals).muln (initialFeeInCHI);

    const policy = await deployer.deploy (XayaPolicy, fee);
    await deployer.deploy (XayaAccounts, wchi.address, policy.address);
  };
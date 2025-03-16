
// SPDX-License-Identifier: MIT
// Copyright (C) 2025 Autonomous Worlds Ltd

pragma solidity ^0.8.4;

import "./PolygonConfig.sol";
import "../src/INftMetadata.sol";
import "../src/XayaPolicy.sol";

import { Script } from "forge-std/Script.sol";

/**
 * @dev This script deploys the XayaPolicy contract, based on an
 * already-deployed NftMetadata.
 */
contract XayaPolicyScript is Script
{

  /** @dev The NftMetadata contract to use.  */
  INftMetadata public constant metadata
      = INftMetadata (0xd22BDf8D648f7b4200387D749d0eA0f1000DF8aA);

  /** @dev The initial fee receiver.  */
  address public constant feeReceiver
      = 0x2ffAC329b8894Ed2a1EbEF7532F9C1C5199a6af8;

  function run () public
  {
    uint256 privkey = vm.envUint ("PRIVKEY");

    uint decimals = PolygonConfig.wchi.decimals ();
    uint fee = 1 * (10**decimals);

    vm.startBroadcast (privkey);

    XayaPolicy pol = new XayaPolicy (metadata, fee);
    pol.setFeeReceiver (feeReceiver);

    vm.stopBroadcast ();
  }

}

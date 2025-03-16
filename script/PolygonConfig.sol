
// SPDX-License-Identifier: MIT
// Copyright (C) 2025 Autonomous Worlds Ltd

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

/**
 * @dev Configuration constants used in deployment scripts.  This is for
 * the Polygon network.
 */
library PolygonConfig
{

  /** @dev The WCHI token address.  */
  IERC20Metadata public constant wchi
      = IERC20Metadata (0xE79feAAA457ad7899357E8E2065a3267aC9eE601);

}

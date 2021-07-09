// SPDX-License-Identifier: MIT
// Copyright (C) 2021 Autonomous Worlds Ltd

pragma solidity ^0.8.4;

import "./IXayaPolicy.sol";

/**
 * @dev An implementation of IXayaPolicy for use in unit tests, with
 * very simple behaviour that allows to exercise all possible cases.
 *
 * THIS CONTRACT IS MEANT ONLY FOR TESTING, AND SHOULD NOT BE DEPLOYED
 * OR USED IN PRODUCTION!
 */
contract TestPolicy is IXayaPolicy
{

  /** @dev The fee receiver address.  */
  address public override feeReceiver;

  /**
   * @dev Constructs the contract, setting the policy receiver initially
   * to the deploying account.
   */
  constructor ()
  {
    feeReceiver = msg.sender;
  }

  /**
   * @dev Modifies the fee receiver address.  Note that this is callable
   * by everyone without access checks, which is fine, since we use this
   * contract only in testing.
   */
  function setFeeReceiver (address newReceiver) public
  {
    feeReceiver = newReceiver;
  }

  /**
   * @dev Checks if a name registration is valid.  In this policy, they are
   * valid if the namespace is non-empty.  The fee is 100 units per byte
   * in the name.
   */
  function checkRegistration (string memory ns, string memory name)
      external pure override returns (uint256)
  {
    require (bytes (ns).length > 0, "namespace must not be empty");
    return 100 * bytes (name).length;
  }

  /**
   * @dev Checks if a move is valid.  In this policy, a move is valid if
   * it is not empty.  The fee is one unit per byte in the move data.
   */
  function checkMove (string memory, string memory mv)
      external pure override returns (uint256)
  {
    require (bytes (mv).length > 0, "move data must not be empty");
    return bytes (mv).length;
  }

  /**
   * @dev Returns the metadata URI for a name.  This is just the
   * name itself in the test policy.
   */
  function tokenUriForName (string memory, string memory name)
      external pure override returns (string memory)
  {
    return name;
  }

}

# Base contracts for EVM-based Xaya

The Xaya technology and [SDK](https://github.com/xaya/libxayagame) are,
mostly, blockchain agnostic, and can be run with another base layer than
Xaya Core.

## Contracts

This repository contains smart contracts that can form the base layer for
Xaya to run on EVM-based blockchains like Polygon.

### Account Registry

The foundation of Xaya tech is management of *names* (user accounts).
In this implementation, names are ERC-721 compliant NFTs.  Each name consists
of a namespace (one or more lower-case English letters, e.g. `p` for
names that are normal player accounts) and the actual name, which is
a sequence of bytes that must form valid UTF-8.

Names can be minted (registered) by everyone on a first-come, first-serve
basis, for a fee in [WCHI](https://github.com/xaya/wchi).
The ERC-721 token ID is based on the hash of namespace and name
(rather than e.g. given out sequentially).

Once registered, names can be used to send *moves* via calling a special
function on the smart contract.  The owner and any approved address
can send moves on behalf of any given name.  The move just records an
event that contains some payload data (parsed and interpreted by
individual games), and optionally transfers WCHI in the same transaction
to allow for certain types of
[atomic trading](https://github.com/xaya/xaya/blob/master/doc/xaya/trading.md).

### Policy

The base account registry contract is not upgradable, but it has a configurable
pointer to a policy contract.  The policy determines the fees for moves
and registrations, the recipient address of fees, and the validation rules
for names and moves.

## Deployment

The contracts from this repository have been deployed on various networks.

### Mumbai Testnet

On the Mumbai testnet for Polygon, the contracts are deployed as:

- `XayaAccounts`: [0xA33e8dDb8af7C2dFCA2Dc17077C4Aa7eAbB832Da](https://mumbai.polygonscan.com/address/0xA33e8dDb8af7C2dFCA2Dc17077C4Aa7eAbB832Da)
- `XayaPolicy`: [0xcEF51ACa83e35e0C0BF4B452206eB2080cf8C003](https://mumbai.polygonscan.com/address/0xcEF51ACa83e35e0C0BF4B452206eB2080cf8C003)

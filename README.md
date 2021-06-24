# Base contracts for EVM-based Xaya

The Xaya technology and [SDK](https://github.com/xaya/libxayagame) are,
mostly, blockchain agnostic, and can be run with another base layer than
Xaya Core.

This repository contains smart contracts that can form the base layer for
Xaya to run on EVM-based blockchains like Polygon.

## Account Registry

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

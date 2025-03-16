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
for names and moves.  It also determines how the NFT and contract
metadata is computed.

## Deployment

The contracts from this repository have been deployed on various networks.

### Polygon Mainnet

On the Polygon mainnet, the contracts are deployed as:

- `NftMetadata`: [0xd22BDf8D648f7b4200387D749d0eA0f1000DF8aA](https://polygonscan.com/address/0xd22BDf8D648f7b4200387D749d0eA0f1000DF8aA)
- `XayaAccounts`: [0x8C12253F71091b9582908C8a44F78870Ec6F304F](https://polygonscan.com/address/0x8C12253F71091b9582908C8a44F78870Ec6F304F)
- `XayaPolicy`: [0xd81585544e5e219B2E107Ff610E8F35960bd9da6](https://polygonscan.com/address/0xd81585544e5e219B2E107Ff610E8F35960bd9da6)

### Mumbai Testnet

On the Mumbai testnet for Polygon, the contracts are deployed as:

- `NftMetadata`: [0x9cfF75C2777257ee91C687eD9d81A339F25A52D5](https://mumbai.polygonscan.com/address/0x9cfF75C2777257ee91C687eD9d81A339F25A52D5)
- `XayaAccounts`: [0xA0C1034c66f82e8EC5d6D3D14e0aA8Ca3fCAD281](https://mumbai.polygonscan.com/address/0xA0C1034c66f82e8EC5d6D3D14e0aA8Ca3fCAD281)
- `XayaPolicy`: [0x0b2082441eEbC3304725273277197003185bfd7E](https://mumbai.polygonscan.com/address/0x0b2082441eEbC3304725273277197003185bfd7E)

## Audit

The main contract code (excluding NFT metadata generation) has been
audited by Solidified based on commit
`6271ae0ec19432b74e3b31be1bf5cadc26dc9793`.  The audit report can be found
[here](audit/Solidified_20220319.pdf) and in the official [Solidified Github
account](https://github.com/solidified-platform/audits/blob/master/Audit%20Report%20-%20Xaya.pdf).

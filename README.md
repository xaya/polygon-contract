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

- `NftMetadata`: [0x4ea3E827eB33d51E284b4f022288A0629Bfd724F](https://polygonscan.com/address/0x4ea3E827eB33d51E284b4f022288A0629Bfd724F)
- `XayaAccounts`: [0xCBcfe2b36408Bde1137eD1cf8b1dbD6C9217539b](https://polygonscan.com/address/0xCBcfe2b36408Bde1137eD1cf8b1dbD6C9217539b)
- `XayaPolicy`: [0xc87eac7C9951439703f1B655C33F81DAa670F56F](https://polygonscan.com/address/0xc87eac7C9951439703f1B655C33F81DAa670F56F)

### Mumbai Testnet

On the Mumbai testnet for Polygon, the contracts are deployed as:

- `NftMetadata`: [0x96e808B61b2AD2d815F66A7DfabeEF9614febF86](https://mumbai.polygonscan.com/address/0x96e808B61b2AD2d815F66A7DfabeEF9614febF86)
- `XayaAccounts`: [0xF84Af6Eaf2C50D68aD1EFa22299043B7416CB453](https://mumbai.polygonscan.com/address/0xF84Af6Eaf2C50D68aD1EFa22299043B7416CB453)
- `XayaPolicy`: [0xDB154ab26f6725F593391Bc7bd1bbF2e93d05DE2](https://mumbai.polygonscan.com/address/0xDB154ab26f6725F593391Bc7bd1bbF2e93d05DE2)

## Audit

The main contract code (excluding NFT metadata generation) has been
audited by Solidified based on commit
`6271ae0ec19432b74e3b31be1bf5cadc26dc9793`.  The audit report can be found
[here](audit/Solidified_20220319.pdf) and in the official [Solidified Github
account](https://github.com/solidified-platform/audits/blob/master/Audit%20Report%20-%20Xaya.pdf).

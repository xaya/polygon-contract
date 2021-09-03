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

- `NftMetadata`: [0x9DD86899D37acaD7bCCBCB147507654F24E45728](https://polygonscan.com/address/0x9DD86899D37acaD7bCCBCB147507654F24E45728)
- `XayaAccounts`: [0xA24de294dd014cEcdd28dc7588DE3939882A7B43](https://polygonscan.com/address/0xA24de294dd014cEcdd28dc7588DE3939882A7B43)
- `XayaPolicy`: [0xdd35e89f02a2B51e5D522239198B181b1e19f293](https://polygonscan.com/address/0xdd35e89f02a2B51e5D522239198B181b1e19f293)

### Mumbai Testnet

On the Mumbai testnet for Polygon, the contracts are deployed as:

- `NftMetadata`: [0x8Ea2A975042feaD97d0319E2591c5eFB327A7079](https://mumbai.polygonscan.com/address/0x8Ea2A975042feaD97d0319E2591c5eFB327A7079)
- `XayaAccounts`: [0xB1AFe92557Da434154F4f7b6df265d6b00AE2b4e](https://mumbai.polygonscan.com/address/0xB1AFe92557Da434154F4f7b6df265d6b00AE2b4e)
- `XayaPolicy`: [0x12f2dd362B2e15db7e9E1543216716bD426a1667](https://mumbai.polygonscan.com/address/0x12f2dd362B2e15db7e9E1543216716bD426a1667)

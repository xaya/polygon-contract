const c =
{
  "contractName": "IERC20",
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "metadata": "{\"compiler\":{\"version\":\"0.8.4+commit.c7e474f2\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"Interface of the ERC20 standard as defined in the EIP.\",\"events\":{\"Approval(address,address,uint256)\":{\"details\":\"Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}. `value` is the new allowance.\"},\"Transfer(address,address,uint256)\":{\"details\":\"Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero.\"}},\"kind\":\"dev\",\"methods\":{\"allowance(address,address)\":{\"details\":\"Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called.\"},\"approve(address,uint256)\":{\"details\":\"Sets `amount` as the allowance of `spender` over the caller's tokens. Returns a boolean value indicating whether the operation succeeded. IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729 Emits an {Approval} event.\"},\"balanceOf(address)\":{\"details\":\"Returns the amount of tokens owned by `account`.\"},\"totalSupply()\":{\"details\":\"Returns the amount of tokens in existence.\"},\"transfer(address,uint256)\":{\"details\":\"Moves `amount` tokens from the caller's account to `recipient`. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.\"},\"transferFrom(address,address,uint256)\":{\"details\":\"Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller's allowance. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.\"}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"@openzeppelin/contracts/token/ERC20/IERC20.sol\":\"IERC20\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":20000},\"remappings\":[]},\"sources\":{\"@openzeppelin/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0xf8e8d118a7a8b2e134181f7da655f6266aa3a0f9134b2605747139fcb0c5d835\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://9ec48567e7ad06acb670980d5cdf3fd7f3949bf12894f02d68c3bb43e75aa84f\",\"dweb:/ipfs/QmaG3R2J9cz92YT77vFjYrjMNU2wHp4ypwYD62HqDUqS5U\"]}},\"version\":1}",
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "immutableReferences": {},
  "generatedSources": [],
  "deployedGeneratedSources": [],
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "// SPDX-License-Identifier: MIT\n\npragma solidity ^0.8.0;\n\n/**\n * @dev Interface of the ERC20 standard as defined in the EIP.\n */\ninterface IERC20 {\n    /**\n     * @dev Returns the amount of tokens in existence.\n     */\n    function totalSupply() external view returns (uint256);\n\n    /**\n     * @dev Returns the amount of tokens owned by `account`.\n     */\n    function balanceOf(address account) external view returns (uint256);\n\n    /**\n     * @dev Moves `amount` tokens from the caller's account to `recipient`.\n     *\n     * Returns a boolean value indicating whether the operation succeeded.\n     *\n     * Emits a {Transfer} event.\n     */\n    function transfer(address recipient, uint256 amount) external returns (bool);\n\n    /**\n     * @dev Returns the remaining number of tokens that `spender` will be\n     * allowed to spend on behalf of `owner` through {transferFrom}. This is\n     * zero by default.\n     *\n     * This value changes when {approve} or {transferFrom} are called.\n     */\n    function allowance(address owner, address spender) external view returns (uint256);\n\n    /**\n     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.\n     *\n     * Returns a boolean value indicating whether the operation succeeded.\n     *\n     * IMPORTANT: Beware that changing an allowance with this method brings the risk\n     * that someone may use both the old and the new allowance by unfortunate\n     * transaction ordering. One possible solution to mitigate this race\n     * condition is to first reduce the spender's allowance to 0 and set the\n     * desired value afterwards:\n     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729\n     *\n     * Emits an {Approval} event.\n     */\n    function approve(address spender, uint256 amount) external returns (bool);\n\n    /**\n     * @dev Moves `amount` tokens from `sender` to `recipient` using the\n     * allowance mechanism. `amount` is then deducted from the caller's\n     * allowance.\n     *\n     * Returns a boolean value indicating whether the operation succeeded.\n     *\n     * Emits a {Transfer} event.\n     */\n    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);\n\n    /**\n     * @dev Emitted when `value` tokens are moved from one account (`from`) to\n     * another (`to`).\n     *\n     * Note that `value` may be zero.\n     */\n    event Transfer(address indexed from, address indexed to, uint256 value);\n\n    /**\n     * @dev Emitted when the allowance of a `spender` for an `owner` is set by\n     * a call to {approve}. `value` is the new allowance.\n     */\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n}\n",
  "sourcePath": "@openzeppelin/contracts/token/ERC20/IERC20.sol",
  "ast": {
    "absolutePath": "@openzeppelin/contracts/token/ERC20/IERC20.sol",
    "exportedSymbols": {
      "IERC20": [
        1654
      ]
    },
    "id": 1655,
    "license": "MIT",
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1578,
        "literals": [
          "solidity",
          "^",
          "0.8",
          ".0"
        ],
        "nodeType": "PragmaDirective",
        "src": "33:23:9"
      },
      {
        "abstract": false,
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": {
          "id": 1579,
          "nodeType": "StructuredDocumentation",
          "src": "58:70:9",
          "text": " @dev Interface of the ERC20 standard as defined in the EIP."
        },
        "fullyImplemented": false,
        "id": 1654,
        "linearizedBaseContracts": [
          1654
        ],
        "name": "IERC20",
        "nameLocation": "139:6:9",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "documentation": {
              "id": 1580,
              "nodeType": "StructuredDocumentation",
              "src": "152:66:9",
              "text": " @dev Returns the amount of tokens in existence."
            },
            "functionSelector": "18160ddd",
            "id": 1585,
            "implemented": false,
            "kind": "function",
            "modifiers": [],
            "name": "totalSupply",
            "nameLocation": "232:11:9",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1581,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "243:2:9"
            },
            "returnParameters": {
              "id": 1584,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1583,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 1585,
                  "src": "269:7:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1582,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "269:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "268:9:9"
            },
            "scope": 1654,
            "src": "223:55:9",
            "stateMutability": "view",
            "virtual": false,
            "visibility": "external"
          },
          {
            "documentation": {
              "id": 1586,
              "nodeType": "StructuredDocumentation",
              "src": "284:72:9",
              "text": " @dev Returns the amount of tokens owned by `account`."
            },
            "functionSelector": "70a08231",
            "id": 1593,
            "implemented": false,
            "kind": "function",
            "modifiers": [],
            "name": "balanceOf",
            "nameLocation": "370:9:9",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1589,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1588,
                  "mutability": "mutable",
                  "name": "account",
                  "nameLocation": "388:7:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1593,
                  "src": "380:15:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1587,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "380:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "379:17:9"
            },
            "returnParameters": {
              "id": 1592,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1591,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 1593,
                  "src": "420:7:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1590,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "420:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "419:9:9"
            },
            "scope": 1654,
            "src": "361:68:9",
            "stateMutability": "view",
            "virtual": false,
            "visibility": "external"
          },
          {
            "documentation": {
              "id": 1594,
              "nodeType": "StructuredDocumentation",
              "src": "435:209:9",
              "text": " @dev Moves `amount` tokens from the caller's account to `recipient`.\n Returns a boolean value indicating whether the operation succeeded.\n Emits a {Transfer} event."
            },
            "functionSelector": "a9059cbb",
            "id": 1603,
            "implemented": false,
            "kind": "function",
            "modifiers": [],
            "name": "transfer",
            "nameLocation": "658:8:9",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1599,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1596,
                  "mutability": "mutable",
                  "name": "recipient",
                  "nameLocation": "675:9:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1603,
                  "src": "667:17:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1595,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "667:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1598,
                  "mutability": "mutable",
                  "name": "amount",
                  "nameLocation": "694:6:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1603,
                  "src": "686:14:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1597,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "686:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "666:35:9"
            },
            "returnParameters": {
              "id": 1602,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1601,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 1603,
                  "src": "720:4:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1600,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "720:4:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "719:6:9"
            },
            "scope": 1654,
            "src": "649:77:9",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "external"
          },
          {
            "documentation": {
              "id": 1604,
              "nodeType": "StructuredDocumentation",
              "src": "732:264:9",
              "text": " @dev Returns the remaining number of tokens that `spender` will be\n allowed to spend on behalf of `owner` through {transferFrom}. This is\n zero by default.\n This value changes when {approve} or {transferFrom} are called."
            },
            "functionSelector": "dd62ed3e",
            "id": 1613,
            "implemented": false,
            "kind": "function",
            "modifiers": [],
            "name": "allowance",
            "nameLocation": "1010:9:9",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1609,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1606,
                  "mutability": "mutable",
                  "name": "owner",
                  "nameLocation": "1028:5:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1613,
                  "src": "1020:13:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1605,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1020:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1608,
                  "mutability": "mutable",
                  "name": "spender",
                  "nameLocation": "1043:7:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1613,
                  "src": "1035:15:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1607,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1035:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "1019:32:9"
            },
            "returnParameters": {
              "id": 1612,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1611,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 1613,
                  "src": "1075:7:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1610,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1075:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "1074:9:9"
            },
            "scope": 1654,
            "src": "1001:83:9",
            "stateMutability": "view",
            "virtual": false,
            "visibility": "external"
          },
          {
            "documentation": {
              "id": 1614,
              "nodeType": "StructuredDocumentation",
              "src": "1090:642:9",
              "text": " @dev Sets `amount` as the allowance of `spender` over the caller's tokens.\n Returns a boolean value indicating whether the operation succeeded.\n IMPORTANT: Beware that changing an allowance with this method brings the risk\n that someone may use both the old and the new allowance by unfortunate\n transaction ordering. One possible solution to mitigate this race\n condition is to first reduce the spender's allowance to 0 and set the\n desired value afterwards:\n https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729\n Emits an {Approval} event."
            },
            "functionSelector": "095ea7b3",
            "id": 1623,
            "implemented": false,
            "kind": "function",
            "modifiers": [],
            "name": "approve",
            "nameLocation": "1746:7:9",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1619,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1616,
                  "mutability": "mutable",
                  "name": "spender",
                  "nameLocation": "1762:7:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1623,
                  "src": "1754:15:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1615,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1754:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1618,
                  "mutability": "mutable",
                  "name": "amount",
                  "nameLocation": "1779:6:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1623,
                  "src": "1771:14:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1617,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1771:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "1753:33:9"
            },
            "returnParameters": {
              "id": 1622,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1621,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 1623,
                  "src": "1805:4:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1620,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1805:4:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "1804:6:9"
            },
            "scope": 1654,
            "src": "1737:74:9",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "external"
          },
          {
            "documentation": {
              "id": 1624,
              "nodeType": "StructuredDocumentation",
              "src": "1817:296:9",
              "text": " @dev Moves `amount` tokens from `sender` to `recipient` using the\n allowance mechanism. `amount` is then deducted from the caller's\n allowance.\n Returns a boolean value indicating whether the operation succeeded.\n Emits a {Transfer} event."
            },
            "functionSelector": "23b872dd",
            "id": 1635,
            "implemented": false,
            "kind": "function",
            "modifiers": [],
            "name": "transferFrom",
            "nameLocation": "2127:12:9",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1631,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1626,
                  "mutability": "mutable",
                  "name": "sender",
                  "nameLocation": "2148:6:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1635,
                  "src": "2140:14:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1625,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2140:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1628,
                  "mutability": "mutable",
                  "name": "recipient",
                  "nameLocation": "2164:9:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1635,
                  "src": "2156:17:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1627,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2156:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1630,
                  "mutability": "mutable",
                  "name": "amount",
                  "nameLocation": "2183:6:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1635,
                  "src": "2175:14:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1629,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2175:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "2139:51:9"
            },
            "returnParameters": {
              "id": 1634,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1633,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 1635,
                  "src": "2209:4:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1632,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2209:4:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "2208:6:9"
            },
            "scope": 1654,
            "src": "2118:97:9",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "external"
          },
          {
            "anonymous": false,
            "documentation": {
              "id": 1636,
              "nodeType": "StructuredDocumentation",
              "src": "2221:158:9",
              "text": " @dev Emitted when `value` tokens are moved from one account (`from`) to\n another (`to`).\n Note that `value` may be zero."
            },
            "id": 1644,
            "name": "Transfer",
            "nameLocation": "2390:8:9",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1643,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1638,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "from",
                  "nameLocation": "2415:4:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1644,
                  "src": "2399:20:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1637,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2399:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1640,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "to",
                  "nameLocation": "2437:2:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1644,
                  "src": "2421:18:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1639,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2421:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1642,
                  "indexed": false,
                  "mutability": "mutable",
                  "name": "value",
                  "nameLocation": "2449:5:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1644,
                  "src": "2441:13:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1641,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2441:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "2398:57:9"
            },
            "src": "2384:72:9"
          },
          {
            "anonymous": false,
            "documentation": {
              "id": 1645,
              "nodeType": "StructuredDocumentation",
              "src": "2462:148:9",
              "text": " @dev Emitted when the allowance of a `spender` for an `owner` is set by\n a call to {approve}. `value` is the new allowance."
            },
            "id": 1653,
            "name": "Approval",
            "nameLocation": "2621:8:9",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1652,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1647,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "owner",
                  "nameLocation": "2646:5:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1653,
                  "src": "2630:21:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1646,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2630:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1649,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "spender",
                  "nameLocation": "2669:7:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1653,
                  "src": "2653:23:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1648,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2653:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1651,
                  "indexed": false,
                  "mutability": "mutable",
                  "name": "value",
                  "nameLocation": "2686:5:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1653,
                  "src": "2678:13:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1650,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2678:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "2629:63:9"
            },
            "src": "2615:78:9"
          }
        ],
        "scope": 1655,
        "src": "129:2566:9",
        "usedErrors": []
      }
    ],
    "src": "33:2663:9"
  },
  "legacyAST": {
    "absolutePath": "@openzeppelin/contracts/token/ERC20/IERC20.sol",
    "exportedSymbols": {
      "IERC20": [
        1654
      ]
    },
    "id": 1655,
    "license": "MIT",
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1578,
        "literals": [
          "solidity",
          "^",
          "0.8",
          ".0"
        ],
        "nodeType": "PragmaDirective",
        "src": "33:23:9"
      },
      {
        "abstract": false,
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": {
          "id": 1579,
          "nodeType": "StructuredDocumentation",
          "src": "58:70:9",
          "text": " @dev Interface of the ERC20 standard as defined in the EIP."
        },
        "fullyImplemented": false,
        "id": 1654,
        "linearizedBaseContracts": [
          1654
        ],
        "name": "IERC20",
        "nameLocation": "139:6:9",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "documentation": {
              "id": 1580,
              "nodeType": "StructuredDocumentation",
              "src": "152:66:9",
              "text": " @dev Returns the amount of tokens in existence."
            },
            "functionSelector": "18160ddd",
            "id": 1585,
            "implemented": false,
            "kind": "function",
            "modifiers": [],
            "name": "totalSupply",
            "nameLocation": "232:11:9",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1581,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "243:2:9"
            },
            "returnParameters": {
              "id": 1584,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1583,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 1585,
                  "src": "269:7:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1582,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "269:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "268:9:9"
            },
            "scope": 1654,
            "src": "223:55:9",
            "stateMutability": "view",
            "virtual": false,
            "visibility": "external"
          },
          {
            "documentation": {
              "id": 1586,
              "nodeType": "StructuredDocumentation",
              "src": "284:72:9",
              "text": " @dev Returns the amount of tokens owned by `account`."
            },
            "functionSelector": "70a08231",
            "id": 1593,
            "implemented": false,
            "kind": "function",
            "modifiers": [],
            "name": "balanceOf",
            "nameLocation": "370:9:9",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1589,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1588,
                  "mutability": "mutable",
                  "name": "account",
                  "nameLocation": "388:7:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1593,
                  "src": "380:15:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1587,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "380:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "379:17:9"
            },
            "returnParameters": {
              "id": 1592,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1591,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 1593,
                  "src": "420:7:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1590,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "420:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "419:9:9"
            },
            "scope": 1654,
            "src": "361:68:9",
            "stateMutability": "view",
            "virtual": false,
            "visibility": "external"
          },
          {
            "documentation": {
              "id": 1594,
              "nodeType": "StructuredDocumentation",
              "src": "435:209:9",
              "text": " @dev Moves `amount` tokens from the caller's account to `recipient`.\n Returns a boolean value indicating whether the operation succeeded.\n Emits a {Transfer} event."
            },
            "functionSelector": "a9059cbb",
            "id": 1603,
            "implemented": false,
            "kind": "function",
            "modifiers": [],
            "name": "transfer",
            "nameLocation": "658:8:9",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1599,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1596,
                  "mutability": "mutable",
                  "name": "recipient",
                  "nameLocation": "675:9:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1603,
                  "src": "667:17:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1595,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "667:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1598,
                  "mutability": "mutable",
                  "name": "amount",
                  "nameLocation": "694:6:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1603,
                  "src": "686:14:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1597,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "686:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "666:35:9"
            },
            "returnParameters": {
              "id": 1602,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1601,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 1603,
                  "src": "720:4:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1600,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "720:4:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "719:6:9"
            },
            "scope": 1654,
            "src": "649:77:9",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "external"
          },
          {
            "documentation": {
              "id": 1604,
              "nodeType": "StructuredDocumentation",
              "src": "732:264:9",
              "text": " @dev Returns the remaining number of tokens that `spender` will be\n allowed to spend on behalf of `owner` through {transferFrom}. This is\n zero by default.\n This value changes when {approve} or {transferFrom} are called."
            },
            "functionSelector": "dd62ed3e",
            "id": 1613,
            "implemented": false,
            "kind": "function",
            "modifiers": [],
            "name": "allowance",
            "nameLocation": "1010:9:9",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1609,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1606,
                  "mutability": "mutable",
                  "name": "owner",
                  "nameLocation": "1028:5:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1613,
                  "src": "1020:13:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1605,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1020:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1608,
                  "mutability": "mutable",
                  "name": "spender",
                  "nameLocation": "1043:7:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1613,
                  "src": "1035:15:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1607,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1035:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "1019:32:9"
            },
            "returnParameters": {
              "id": 1612,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1611,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 1613,
                  "src": "1075:7:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1610,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1075:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "1074:9:9"
            },
            "scope": 1654,
            "src": "1001:83:9",
            "stateMutability": "view",
            "virtual": false,
            "visibility": "external"
          },
          {
            "documentation": {
              "id": 1614,
              "nodeType": "StructuredDocumentation",
              "src": "1090:642:9",
              "text": " @dev Sets `amount` as the allowance of `spender` over the caller's tokens.\n Returns a boolean value indicating whether the operation succeeded.\n IMPORTANT: Beware that changing an allowance with this method brings the risk\n that someone may use both the old and the new allowance by unfortunate\n transaction ordering. One possible solution to mitigate this race\n condition is to first reduce the spender's allowance to 0 and set the\n desired value afterwards:\n https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729\n Emits an {Approval} event."
            },
            "functionSelector": "095ea7b3",
            "id": 1623,
            "implemented": false,
            "kind": "function",
            "modifiers": [],
            "name": "approve",
            "nameLocation": "1746:7:9",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1619,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1616,
                  "mutability": "mutable",
                  "name": "spender",
                  "nameLocation": "1762:7:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1623,
                  "src": "1754:15:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1615,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1754:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1618,
                  "mutability": "mutable",
                  "name": "amount",
                  "nameLocation": "1779:6:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1623,
                  "src": "1771:14:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1617,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1771:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "1753:33:9"
            },
            "returnParameters": {
              "id": 1622,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1621,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 1623,
                  "src": "1805:4:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1620,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1805:4:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "1804:6:9"
            },
            "scope": 1654,
            "src": "1737:74:9",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "external"
          },
          {
            "documentation": {
              "id": 1624,
              "nodeType": "StructuredDocumentation",
              "src": "1817:296:9",
              "text": " @dev Moves `amount` tokens from `sender` to `recipient` using the\n allowance mechanism. `amount` is then deducted from the caller's\n allowance.\n Returns a boolean value indicating whether the operation succeeded.\n Emits a {Transfer} event."
            },
            "functionSelector": "23b872dd",
            "id": 1635,
            "implemented": false,
            "kind": "function",
            "modifiers": [],
            "name": "transferFrom",
            "nameLocation": "2127:12:9",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1631,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1626,
                  "mutability": "mutable",
                  "name": "sender",
                  "nameLocation": "2148:6:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1635,
                  "src": "2140:14:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1625,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2140:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1628,
                  "mutability": "mutable",
                  "name": "recipient",
                  "nameLocation": "2164:9:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1635,
                  "src": "2156:17:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1627,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2156:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1630,
                  "mutability": "mutable",
                  "name": "amount",
                  "nameLocation": "2183:6:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1635,
                  "src": "2175:14:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1629,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2175:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "2139:51:9"
            },
            "returnParameters": {
              "id": 1634,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1633,
                  "mutability": "mutable",
                  "name": "",
                  "nameLocation": "-1:-1:-1",
                  "nodeType": "VariableDeclaration",
                  "scope": 1635,
                  "src": "2209:4:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1632,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "2209:4:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "2208:6:9"
            },
            "scope": 1654,
            "src": "2118:97:9",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "external"
          },
          {
            "anonymous": false,
            "documentation": {
              "id": 1636,
              "nodeType": "StructuredDocumentation",
              "src": "2221:158:9",
              "text": " @dev Emitted when `value` tokens are moved from one account (`from`) to\n another (`to`).\n Note that `value` may be zero."
            },
            "id": 1644,
            "name": "Transfer",
            "nameLocation": "2390:8:9",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1643,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1638,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "from",
                  "nameLocation": "2415:4:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1644,
                  "src": "2399:20:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1637,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2399:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1640,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "to",
                  "nameLocation": "2437:2:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1644,
                  "src": "2421:18:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1639,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2421:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1642,
                  "indexed": false,
                  "mutability": "mutable",
                  "name": "value",
                  "nameLocation": "2449:5:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1644,
                  "src": "2441:13:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1641,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2441:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "2398:57:9"
            },
            "src": "2384:72:9"
          },
          {
            "anonymous": false,
            "documentation": {
              "id": 1645,
              "nodeType": "StructuredDocumentation",
              "src": "2462:148:9",
              "text": " @dev Emitted when the allowance of a `spender` for an `owner` is set by\n a call to {approve}. `value` is the new allowance."
            },
            "id": 1653,
            "name": "Approval",
            "nameLocation": "2621:8:9",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1652,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1647,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "owner",
                  "nameLocation": "2646:5:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1653,
                  "src": "2630:21:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1646,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2630:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1649,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "spender",
                  "nameLocation": "2669:7:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1653,
                  "src": "2653:23:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1648,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2653:7:9",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1651,
                  "indexed": false,
                  "mutability": "mutable",
                  "name": "value",
                  "nameLocation": "2686:5:9",
                  "nodeType": "VariableDeclaration",
                  "scope": 1653,
                  "src": "2678:13:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1650,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2678:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "2629:63:9"
            },
            "src": "2615:78:9"
          }
        ],
        "scope": 1655,
        "src": "129:2566:9",
        "usedErrors": []
      }
    ],
    "src": "33:2663:9"
  },
  "compiler": {
    "name": "solc",
    "version": "0.8.4+commit.c7e474f2.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "3.3.4",
  "updatedAt": "2021-07-09T09:28:20.632Z",
  "devdoc": {
    "details": "Interface of the ERC20 standard as defined in the EIP.",
    "events": {
      "Approval(address,address,uint256)": {
        "details": "Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}. `value` is the new allowance."
      },
      "Transfer(address,address,uint256)": {
        "details": "Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero."
      }
    },
    "kind": "dev",
    "methods": {
      "allowance(address,address)": {
        "details": "Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called."
      },
      "approve(address,uint256)": {
        "details": "Sets `amount` as the allowance of `spender` over the caller's tokens. Returns a boolean value indicating whether the operation succeeded. IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729 Emits an {Approval} event."
      },
      "balanceOf(address)": {
        "details": "Returns the amount of tokens owned by `account`."
      },
      "totalSupply()": {
        "details": "Returns the amount of tokens in existence."
      },
      "transfer(address,uint256)": {
        "details": "Moves `amount` tokens from the caller's account to `recipient`. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event."
      },
      "transferFrom(address,address,uint256)": {
        "details": "Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller's allowance. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event."
      }
    },
    "version": 1
  },
  "userdoc": {
    "kind": "user",
    "methods": {},
    "version": 1
  }
}
; export default c;

import IERC20 from "./IERC20.js";
import XayaAccounts from "./XayaAccounts.js";

import { ethers } from "./ethers-5.2.esm.min.js";

/** Some data (e.g. the WCHI contract address) per supported chain.  */
const allChainData = {
  /* Ethereum mainnet */
  1: {
    "wchi": "0x6DC02164d75651758aC74435806093E421b64605"
  },
  /* Ropsten */
  3: {
    "wchi": "0xFa4da906b17fD27E0Ffbe9fDb4E3a17C1aFB1F2e"
  },
  /* Görli */
  5: {
    "wchi": "0x39d1276C5421d3A9f8367F0C071DB4af242f5D8f"
  },
  /* Polygon mainnet */
  137: {
    "wchi": "0xE79feAAA457ad7899357E8E2065a3267aC9eE601"
  },
  /* Mumbai testnet */
  80001: {
    "wchi": "0x35AAfF0B6B0540a667A7f726d86A7644f6A6Eee8"
  }
};

function setError (val)
{
  const el = document.getElementById ("error");
  if (val === null)
    el.style.display = "none";
  else
    {
      el.style.display = "block";
      el.textContent = val;
    }
}

function formatBalance (elementId, value)
{
  const str = ethers.utils.formatUnits (value, 8);
  document.getElementById (elementId).textContent = str;
}

function parseName ()
{
  const el = document.getElementById ("name");
  const fullValue = el.value;
  const ind = fullValue.indexOf ("/");
  if (ind === -1)
    {
      setError ("name is missing namespace");
      return null;
    }

  const ns = fullValue.substring (0, ind);
  const name = fullValue.substring (ind + 1);

  return [ns, name];
}

function parseMove ()
{
  const el = document.getElementById ("move");
  try
    {
      return JSON.stringify (JSON.parse (el.value));
    }
  catch (err)
    {
      setError ("invalid move JSON");
      return null;
    }
}

async function main ()
{
  setError (null);

  if (window.ethereum === undefined)
    {
      setError ("MetaMask not active");
      return;
    }

  const chainId = await (async () => {
    const str = await ethereum.request ({method: "eth_chainId"});
    return parseInt (Number (str), 10);
  }) ();
  ethereum.on ("chainChanged", () => { window.location.reload (); });
  document.getElementById ("chainId").textContent = chainId;

  if (allChainData[chainId] === undefined
        || XayaAccounts.networks[chainId] === undefined)
    {
      setError ("Unsupported chain");
      return;
    }
  const chainData = allChainData[chainId];
  const xayaAddress = XayaAccounts.networks[chainId].address;

  try
    {
      await ethereum.request ({method: "eth_requestAccounts"});
    }
  catch (err)
    {
      setError (err.message);
      return;
    }
  const accounts = await ethereum.request ({method: "eth_accounts"});
  if (accounts.length === 0)
    {
      setError ("No account is connected");
      return;
    }
  const account = accounts[0];
  ethereum.on ("accountsChanged", () => { window.location.reload (); });
  document.getElementById ("address").textContent = account;

  const provider = new ethers.providers.Web3Provider (ethereum);
  const signer = provider.getSigner ();
  const wchi = new ethers.Contract (chainData["wchi"], IERC20.abi, provider)
                  .connect (signer);
  const registry = new ethers.Contract (xayaAddress, XayaAccounts.abi, provider)
                      .connect (signer);

  formatBalance ("balance", await wchi.balanceOf (account));
  formatBalance ("approved", await wchi.allowance (account, xayaAddress));

  const maxUint256 = ethers.BigNumber.from (2).pow (256).sub (1);
  document.getElementById ("approve").addEventListener ("click", async () => {
    try
      {
        await wchi.approve (xayaAddress, maxUint256);
        setError (null);
      }
    catch (err)
      {
        setError (err.message);
      }
  });

  document.getElementById ("register").addEventListener ("click", async () => {
    try
      {
        const parts = parseName ();
        if (parts === null)
          return;
        console.log (parts);
        await registry.register (parts[0], parts[1]);
        setError (null);
      }
    catch (err)
      {
        setError (err.message);
      }
  });

  const zeroAddr = "0x0000000000000000000000000000000000000000";
  document.getElementById ("sendMove").addEventListener ("click", async () => {
    try
      {
        const parts = parseName ();
        if (parts === null)
          return;
        const move = parseMove ();
        if (move === null)
          return;
        await registry.move (parts[0], parts[1], move, maxUint256, 0, zeroAddr);
        setError (null);
      }
    catch (err)
      {
        setError (err.message);
      }
  });
}

await main ();

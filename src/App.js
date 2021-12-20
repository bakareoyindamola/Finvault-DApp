import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";

function App() {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum,
    "any"
  );

  const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

  const daiAbi = [
    // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",

    // Get the account balance
    "function balanceOf(address) view returns (uint)",

    // Send some of your tokens to someone else
    "function transfer(address to, uint amount)",

    // An event triggered whenever anyone transfers to someone else
    "event Transfer(address indexed from, address indexed to, uint amount)"
  ];

  const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

  const [contractName, setContractName] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    (async() => {
      const name = await daiContract.name();
      const apiBalance = await provider.getBalance("ethers.eth")
      setBalance(ethers.utils.formatEther(apiBalance))
      setContractName(name);
    })()
  }, [])

  return (
    <div>
      <h2>Contract Name: {contractName}</h2>
      <h2>Initial Supply: {balance}</h2>
    </div>
  );
}

export default App;

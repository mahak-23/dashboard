import React, { useState } from "react";
import Web3 from "web3";

//icon
import { FaEye } from "react-icons/fa";

//style
import "./style.css";

const MetaMask = () => {
  const [connectedAccount, setConnectedAccount] = useState(null);

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const selectedAccount = accounts[0];
        setConnectedAccount(selectedAccount);
        alert("Wallet connected:", selectedAccount);
      } catch (error) {
        alert("Failed to connect wallet:", error);
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  const disconnectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
        setConnectedAccount(null);
        alert("Wallet disconnected");
      } catch (error) {
        alert("Failed to disconnect wallet:", error);
      }
    } else {
      alert("MetaMask is not installed.");
    }
  };

  return (
    <div className="metamask-container">
      {connectedAccount && (
        <FaEye
          title={`Connected Account: ${connectedAccount}`}
          className="icon"
        />
      )}

      {!connectedAccount ? (
        <button onClick={() => connectMetamask()}>Connect to MetaMask</button>
      ) : (
        <button onClick={() => disconnectWallet()}>Disconnect Wallet</button>
      )}
    </div>
  );
};

export default MetaMask;

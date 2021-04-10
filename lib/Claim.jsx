import React from 'react'
import { Button } from 'react-bootstrap'
import { utils } from 'ethers'
import { useEthers, ChainId } from '@usedapp/core'
import { toast } from 'react-toastify';
import {merkleDistibutor_abi, merkleDistibutor_address_mainnet, merkleDistibutor_address_rinkeby} from '../abis/MerkleDistributor'
import merkleTree from '../assets/merkle_tree'
import merkle_tree_abi from '../abis/MerkleDistributor.json'
import { fetchIsClaimed } from './fetchIsClaimed'
import { callClaim } from './callClaim'

import 'react-toastify/dist/ReactToastify.css';


const merkleInterface = new utils.Interface(merkle_tree_abi)


export const Claim = () => {

  const { account, chainId, library } = useEthers()

  const handleClaimClick = () => {
    if (!merkleTree.claims[account]){
    //if (!merkleTree.claims['0x01AB07010c2F4bf5971537669Cc19d5D8Cf320A0']){
      toast.warn('Sorry, no claim available for this address..', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return null;
    }

    const proof = merkleTree.claims[account];
    //const proof = merkleTree.claims['0x01AB07010c2F4bf5971537669Cc19d5D8Cf320A0'];

    const MERKEL_ADDRESS = chainId === ChainId.Mainnet ? merkleDistibutor_address_mainnet : chainId === ChainId.Rinkeby ? merkleDistibutor_address_rinkeby : '';
  
    const t = async () => {
      const isClaimed = await fetchIsClaimed(library.getSigner(), MERKEL_ADDRESS, merkleDistibutor_abi, proof.index)
  
      if (isClaimed.retroPoolV2){
        toast.info('Drop has already been claimed for this address.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        return null;
      }

      const params = [proof.index, account, proof.amount, proof.proof]
      await callClaim(library.getSigner(), MERKEL_ADDRESS, merkleDistibutor_abi, params)
    }
    t()
  }

  return (
    <>
      <Button variant="dark" onClick={handleClaimClick} block>Claim</Button>
    </>
  )
}
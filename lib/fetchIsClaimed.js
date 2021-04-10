import { ethers } from 'ethers'

export const fetchIsClaimed = async (
  signer,
  contractAddress,
  contractAbi,
  index
) => {
  const isClaimed = {
    retroPoolV2: true
  }
  
  try {

    const contract = new ethers.Contract(contractAddress, contractAbi, signer)

    isClaimed.retroPoolV2 = await contract.isClaimed(index);

  } catch (e) {
    console.warn(e.message)
  } finally {
    return isClaimed
  }
}
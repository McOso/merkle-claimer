import { ethers } from 'ethers'
import { toast } from 'react-toastify'

const GAS_MULTIPLIER = 1.2


export const callClaim = async (
  signer,
  contractAddress,
  contractAbi,
  params = []
) => {

  try {

    const contract = new ethers.Contract(contractAddress, contractAbi, signer)
    const method = 'claim'
    let gasEstimate
    try {
      gasEstimate = await contract.estimateGas[method](...params)
    } catch (e) {
      console.warn(`error while estimating gas: `, e)
    }

    let gasLimit
    if (gasEstimate) {
      gasLimit = parseInt(gasEstimate.toNumber() * GAS_MULTIPLIER, 10)
    }

    const newTx = await contract[method].apply(null, params, gasLimit)

    await newTx.wait()

    toast.success('POOL Claim Successdul!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  } catch (e) {
    console.error(e)

    if (e?.message?.match('User denied transaction signature')) {

      toast.warn('Transaction cancelled', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      // You cancelled the transaction
    } else {
      setTx((tx) => ({
        ...tx,
        completed: true,
        error: true
      }))

      toast.error('Error with POOL Claim transaction', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      console.error(e.message)
    }
  }
}
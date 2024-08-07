const { ethers, AbiCoder } = require('ethers')
const abi = require('../abi/titanx.abi.json')

export function getEventFilters() {
  return abi.map(row => row.type === 'event' && row.name).filter(Boolean)
}

export function getSignatures() {
  console.log()
  console.log('Transfer(address,address,uint256)', ethers.keccak256(ethers.toUtf8Bytes('Transfer(address,address,uint256)')))
}

export async function getTitanX(env) {
  const rpcurl = env.ETHEREUM_RPC
  const address = env.TITANX_ADDRESS
  const provider = new ethers.JsonRpcProvider(rpcurl)
  const contract = new ethers.Contract(address, abi, provider)

  return {
    provider,
    contract
  }
}

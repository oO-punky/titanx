import { Router } from 'itty-router'

const router = Router()

const { ethers, AbiCoder } = require('ethers')
const { getTitanX, getEventFilters, getSignatures } = require('../lib/contract')
const { addMintStartedEvents } = require('../lib/database')


const abi = require('../abi/titanx.abi.json')


router.get('/scrape/mintstarted', async function(request, env, ctx) {
  const { provider, contract } = await getTitanX(env)

  const startBlock = env.START_BLOCK
  const endBlock = await provider.getBlockNumber()

  console.log(`number of blocks: ${endBlock - startBlock}`)

  for (let blockNumber = startBlock; blockNumber <= endBlock; blockNumber += 100) {
    console.log(`Processing block ${blockNumber}`);
    const events = await contract.queryFilter(contract.filters.MintStarted(), blockNumber, blockNumber + 100)

    if (events.length > 0) {
      for (const event of events) {
        await addMintStartedEvents(event, env);
      }
    }
  }

})


router.get('/', async function(request, env, ctx) {
  const { provider, contract } = await getTitanX(env)
})
router.all('*', () => new Response('Not Found.', { status: 404 }))

export default {
  fetch: router.handle
}

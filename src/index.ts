import { ethers } from "ethers"

// Local
import { type Chain } from "./types/index.js"
import { config } from "./config.js"
import { getTokenInfo, formatTokenAmount } from "./utils.js"

const startTrackWalletPerChain = async (chain: Chain) => {
  const provider = new ethers.WebSocketProvider(chain.wssUrl)

  for (const address of config.listAddress) {
    console.log(`Tracking wallet: ${address} on ${chain.networkName}`)

    const incomingFilter = {
      topics: [ethers.id("Transfer(address,address,uint256)"), null, ethers.zeroPadValue(address, 32)],
    }

    const outgoingFilter = {
      topics: [ethers.id("Transfer(address,address,uint256)"), ethers.zeroPadValue(address, 32), null],
    }

    provider.on(incomingFilter, async (log) => {
      const tokenInfo = await getTokenInfo(provider, log.address)
      const amount = formatTokenAmount(log.data, tokenInfo.decimals)

      console.log(`\n[${new Date().toISOString()}] New incoming transaction.`)
      console.log(`Network: ${chain.networkName}`)
      console.log(`Wallet: ${address}`)
      console.log(`Amount: ${amount} ${tokenInfo.symbol}`)
      console.log(`Token: ${tokenInfo.name}`)
      console.log(`Block: ${log.blockNumber}`)
      console.log(`Transaction: ${log.transactionHash}`)
      console.log(`Explorer: ${chain.explorerUrl}/tx/${log.transactionHash}`)
    })

    provider.on(outgoingFilter, async (log) => {
      const tokenInfo = await getTokenInfo(provider, log.address)
      const amount = formatTokenAmount(log.data, tokenInfo.decimals)

      console.log(`\n[${new Date().toISOString()}] New outgoing transaction.`)
      console.log(`Network: ${chain.networkName}`)
      console.log(`Wallet: ${address}`)
      console.log(`Amount: ${amount} ${tokenInfo.symbol}`)
      console.log(`Token: ${tokenInfo.name}`)
      console.log(`Block: ${log.blockNumber}`)
      console.log(`Transaction: ${log.transactionHash}`)
      console.log(`Explorer: ${chain.explorerUrl}/tx/${log.transactionHash}`)
    })
  }
}

;(async () => {
  for (const chain of config.listChains) {
    startTrackWalletPerChain(chain)
  }

  console.log("App is starting. CTRL + C to stop.")
})()

export type Chain = {
  networkName: string
  wssUrl: string
  chainId: string
  symbol: string
  explorerUrl: string
}

export type Config = {
  listChains: Chain[]
  listAddress: string[]
}

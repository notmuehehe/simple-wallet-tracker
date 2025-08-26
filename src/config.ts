import { type Config } from "./types/index.js"

export const config: Config = {
  listChains: [
    {
      networkName: "base-mainnet", // Isi dengan nama networknya
      wssUrl: "", // Isi dengan wss url kamu. bisa ambil di https://alchemy.com/
      chainId: "8453", // Isi dengan chain id nya
      symbol: "ETH", // Isi dengan simbol koin nya
      explorerUrl: "https://basescan.org", // Isi dengan url explorer untuk network ini
    },
  ],
  listAddress: [],
}

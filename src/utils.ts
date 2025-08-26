import { ethers, WebSocketProvider } from "ethers"

export const getTokenInfo = async (provider: WebSocketProvider, tokenAddress: string) => {
  try {
    const contract = new ethers.Contract(
      tokenAddress,
      [
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)",
        "function name() view returns (string)",
      ],
      provider
    )

    const [symbol, decimals, name] = await Promise.all([contract.symbol!(), contract.decimals!(), contract.name!()])

    return { symbol, decimals, name }
  } catch {
    return { symbol: "UNKNOWN", decimals: 18, name: "Unknown Token" }
  }
}

export const formatTokenAmount = (amount: string, decimals: number) => {
  return ethers.formatUnits(amount, decimals)
}

/** @jsxImportSource frog/jsx */

import { Frog } from 'frog'
import { pinata } from 'frog/hubs'

export const app = new Frog({
  basePath: '/api',
  hub: pinata(),
  browserLocation: '/',
})

app.transaction('/transaction', async (c) => {
  const targetAddress = c.address
  const shortId = [54]
  const amountUSD = 5

  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
  if (!response.ok) {
    throw new Error('Failed to fetch exchange rate')
  }
  const data = await response.json()
  const usdToEthRate = data.ethereum.usd
  const amountETH = amountUSD / usdToEthRate
  const chainsBN = shortId.reduce((p, c) => (p << BigInt(8)) + BigInt(c), BigInt(0))
  const amountWei: bigint = BigInt(Math.floor(amountETH * 1e18))

  return c.contract({
    abi: depositABI,
    chainId: 'eip155:10',
    functionName: 'deposit',
    value: amountWei,
    to: '0x9e22ebec84c7e4c4bd6d4ae7ff6f4d436d6d8390',
    args: [chainsBN, targetAddress as `0x${string}`],
  })
})

const depositABI = [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'chains',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
      ],
      name: 'deposit',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
  ] as const
  
  
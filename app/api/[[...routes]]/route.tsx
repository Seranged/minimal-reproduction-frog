/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { pinata } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { devtools } from 'frog/dev'

const app = new Frog({
  basePath: '/api/',
  hub: pinata(),
  browserLocation: '/',
})

app.frame('/:dynamicUrl', (c) => {
  const dynamicUrl = c.req.param('dynamicUrl')
  return c.res({
    image: (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000000',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', fontSize: 60 }}>
          Test Minimal Dynamic Url ID: {dynamicUrl}
        </div>
      </div>
    ),
    intents: [
      <Button.Transaction target="/bridge">$5</Button.Transaction>,
    ],
  })
})

app.transaction('/bridge', async (c) => {
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

devtools(app, { serveStatic })
export const GET = handle(app)
export const POST = handle(app)

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


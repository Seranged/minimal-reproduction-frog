/** @jsxImportSource frog/jsx */

import { Frog } from 'frog'
import { pinata } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { devtools } from 'frog/dev'
import { app as transactionFrame } from '../../frames/transaction'
import { app as rootFrame } from '../../frames/root'

const app = new Frog({
  basePath: '/api',
  hub: pinata(),
  browserLocation: '/',
})

app.route('/transaction', transactionFrame)
app.route('/:dynamicUrl', rootFrame)

devtools(app, { serveStatic })
export const GET = handle(app)
export const POST = handle(app)


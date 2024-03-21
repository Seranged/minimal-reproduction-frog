/** @jsxImportSource frog/jsx */

import { Button, Frog } from 'frog'
import { pinata } from 'frog/hubs'

export const app = new Frog({
    basePath: '/api',
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
        <Button.Transaction target="/transaction">10</Button.Transaction>,
      ],
    })
  })
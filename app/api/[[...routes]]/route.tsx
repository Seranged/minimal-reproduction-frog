/** @jsxImportSource frog/jsx */
import { Button, Frog } from 'frog'
import { handle } from 'frog/next'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'

const app = new Frog({
  basePath: '/api',
  browserLocation: '/',
})

app.frame('/', async (c) => {
  return c.res({
    image: (
      <div
        style={{
          fontFamily: 'Inter',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000000',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ color: 'white', fontSize: 60 }}>Test Frame 1 </div>
          <div style={{ color: 'white', fontSize: 40 }}>
            Test Frame 1 
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button action={`/goToFrame2/testPropButton1`} value='10'>
        Optimism
      </Button>,
      <Button action={`/goToFrame2/testPropButton2`} value='8453'>
        Base
      </Button>,
    ]
  })
})

app.frame('/goToFrame2/:testProp', (c) => { 
  const { buttonValue } = c
  const { testProp } = c.req.param()

  console.log('buttonValue', buttonValue)
  console.log('testProp', testProp)

  return c.res({
    image: (
      <div
        style={{
          fontFamily: 'Inter',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000000',
        }}
    >       
     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <div style={{ color: 'white', fontSize: 60 }}>Test Frame 2</div>
       <div style={{ color: 'white', fontSize: 40 }}>
         Test Frame 2 (Works)
         {/* Test Frame 2 - Button Value {buttonValue} (Doesn't work) */}
         {/* Test Frame 2 - Prop Value {testProp} (Doesn't work) */}
          </div>
       </div>
      </div>
    )
  })
})

devtools(app, { serveStatic })
export const GET = handle(app)
export const POST = handle(app)





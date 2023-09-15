import { watch, existsSync } from 'fs'
import { dirname, join } from 'path'
import { build } from 'build_lib'
import express from 'express'
// import { Router } from '@stricjs/router'
// import { dir } from '@stricjs/utils'

const server_config = await Bun.file("server.json").json()

function find_buildable_dir(filename) {
  const dir = dirname(filename)
  if(existsSync(join(dir, 'build.js'))) {
    return dir
  }
  return find_buildable_dir(dir)
}

let timeout_handle = null
let to_build = null
let building = false
let websockets = []

const watcher = watch(server_config.root, { recursive: true }, (_, filename) => {
  if(building) return

  const dir = find_buildable_dir(join(server_config.root, filename))
  
  if(!to_build) {
    to_build = dir
  }

  if(dir.length < to_build.length) {
    to_build = dir
  }

  clearTimeout(timeout_handle)
  timeout_handle = setTimeout(async () => {
    building = true
    process.stdout.write(`Building ${dir}...`)
    await build(dir)
    setTimeout(() => {
      to_build = null
      building = false
      for(const ws of websockets) {
        ws.send('Reload!!')
      }
      process.stdout.write(` Done\n`)
    }, 100)
  }, 0)
})


// const appp = new Router()
// appp.port = 4000
// appp.get('/reload.js', async () => {
//   const js = await Bun.file('reload.js').text()
//   return new Response(js.replace('PORT', String(4000)), {
//     headers: {'content-type': 'application/javascript; charset=utf-8'}
//   })
// })
// appp.get('/*', async ctx => {
//   let url = ctx.params['*']
//   if(url.endsWith('/')) {
//     url = join(url, 'index.html')
//   }
//
//   if(url.endsWith('.html')) {
//     const file = join(server_config.root, url) 
//     if(existsSync(file)) {
//       let html = await Bun.file(file).text()
//       html = html.replace('</body>', '<script src="/reload.js"></script></body>')
//       return new Response(html, {
//         headers: { 'content-type': 'text/html; charset=utf-8' }
//       })
//     }
//   }
//
//   return dir('docs')(ctx)
// })
// appp.ws('/ws', {
//   open(ws) {
//     websockets.push(ws)
//     console.log(`Connection to WebSocket: ${websockets.length}`)
//   },
//   close(ws) {
//     const index = websockets.indexOf(ws)
//     websockets.splice(index, 1)
//     console.log(`Connection to WebSocket: ${websockets.length}`)
//   },
//   // this is called when a message is received
//   message() {
//     console.log(`Received ${message}`)
//   },
// })
//
// Bun.serve(appp)


const app = express()
const port = 3000
const ws_port = 3003

app.get('/reload.js', async (_, res) => {
  const js = await Bun.file('reload.js').text()
  res.setHeader('content-type', 'application/javascript');
  res.send(js.replace('PORT', String(ws_port)))
})

app.use(async (req, res, next) => {
  let url = req.url
  if(url.endsWith('/')) {
    url = join(url, 'index.html')
  }

  if(req.method === 'GET' && url.endsWith('.html')) {
    const file = join(server_config.root, url) 
    if(existsSync(file)) {
      let html = await Bun.file(file).text()
      html = html.replace('</body>', '<script src="/reload.js"></script></body>')
      res.send(html)
      return
    }
  }

  next()
});

app.use(express.static(server_config.root))


const server = app.listen(port, () => {
  console.log(`Web server listening on port ${port}`)
})


const ws_server = Bun.serve({
  port: ws_port,
  fetch(req, server) {
    // upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return // do not return a Response
    }
    return new Response("Upgrade failed :(", { status: 500 })
  },
  websocket: {
    open(ws) {
      websockets.push(ws)
      // console.log(`Connection to WebSocket: ${websockets.length}`)
    },
    close(ws) {
      const index = websockets.indexOf(ws)
      websockets.splice(index, 1)
      // console.log(`Connection to WebSocket: ${websockets.length}`)
    },
    // this is called when a message is received
    message() {
      console.log(`Received ${message}`)
    },
  }, // handlers
})

console.log(`WebSocket on localhost:${ws_server.port}`)

process.on('SIGINT', () => {
  console.log('\nClosing watcher...')
  watcher.close()
  console.log('Closing server...')
  server.close()
  console.log('Closing WebSocket...')
  ws_server.stop()

  console.log('Bye')
  process.exit(0)
});


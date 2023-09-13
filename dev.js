import { watch, existsSync } from 'fs'
import { dirname, join } from 'path'
import { build } from 'build_lib'
import express from 'express'

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
    console.log(`Building ${dir}`)
    await build(dir)
    setTimeout(() => {
      to_build = null
      building = false
      for(const ws of websockets) {
        ws.send('Reload!!')
      }
    }, 100)
  }, 0)
})


const app = express()
const port = 3000

app.use(async function(req, res, next) {
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
  port: 3003,
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
      console.log(`Connection to WebSocket: ${websockets.length}`)
    },
    close(ws) {
      const index = websockets.indexOf(ws)
      websockets.splice(index, 1)
      console.log(`Connection to WebSocket: ${websockets.length}`)
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


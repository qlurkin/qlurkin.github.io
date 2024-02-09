import { watch, existsSync, lstatSync } from 'node:fs'
import { dirname, join } from 'path'
import { build } from 'build_lib'
import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

const server_config = await Bun.file('server.json').json()

function find_buildable_dir(filename) {
  const dir = dirname(filename)
  if (existsSync(join(dir, 'build.js'))) {
    return dir
  }
  return find_buildable_dir(dir)
}

let timeout_handle = null
let to_build = null
let building = false
let websockets = []

const watcher = watch(
  server_config.root,
  { recursive: true },
  (_, filename) => {
    if (building) return

    const dir = find_buildable_dir(join(server_config.root, filename))

    if (!to_build) {
      to_build = dir
    }

    if (dir.length < to_build.length) {
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
        for (const ws of websockets) {
          ws.send('Reload!!')
        }
        process.stdout.write(` Done\n`)
      }, 100)
    }, 0)
  },
)

const app = new Hono()
const port = 3000

app.get('/', (c) => c.redirect('/courses'))

app.get('/reload.js', async (c) => {
  const js = await Bun.file('reload.js').text()
  c.header('Content-Type', 'application/javascript')
  c.status(200)
  return c.body(js.replace('PORT', String(port)))
})

app.get('/ws', (c) => {
  const success = c.env.upgrade(c.req.raw)
  return true
})

app.use(async (c, next) => {
  const path = c.req.path
  const local_path = join(server_config.root, path)
  let file = local_path
  if (lstatSync(local_path).isDirectory()) {
    file = join(local_path, 'index.html')
  }

  if (c.req.method === 'GET' && file.endsWith('.html')) {
    if (existsSync(file)) {
      let html = await Bun.file(file).text()
      html = html.replace(
        '</body>',
        '<script src="/reload.js"></script></body>',
      )
      return c.html(html)
    }
  }

  await next()
})

app.use(serveStatic({ root: server_config.root }))

const server = Bun.serve({
  port: port,
  fetch: app.fetch,
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

console.log(`Listen on localhost:${port}`)

process.on('SIGINT', () => {
  console.log('\nClosing watcher...')
  watcher.close()
  console.log('Closing server...')
  server.stop()

  console.log('Bye')
  process.exit(0)
})

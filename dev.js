import { watch, existsSync } from 'fs'
import { dirname, join } from 'path'
import { build } from 'build_lib'
//import live_server from 'live-server'
//const live = require('live-server')

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
    }, 100)
  }, 0)
})

process.on('SIGINT', () => {
  console.log('\nClosing watcher...')
  watcher.close()

  process.exit(0)
});

const params = {
	port: 8181, // Set the server port. Defaults to 8080.
	host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
	root: "docs", // Set root directory that's being served. Defaults to cwd.
	open: true, // When false, it won't load your browser by default.
	ignore: '**/*.md', // comma-separated string for paths to ignore
	wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
	logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
}

//const server = live_server.start(params)
//console.log(server)
// const server = Bun.serve({
//   port: 3000,
//   fetch(request) {
//     return new Response(import.meta.dir);
//   },
// });
//
// console.log(`Listening on localhost: ${server.port}`);

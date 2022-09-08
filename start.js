const chokidar = require('chokidar')
const liveServer = require("@compodoc/live-server")
const build = require('./build_fun')
const fs = require('fs')

let timer = null
const changes = []
const watched = './last_build.json'
let running = false
let should_rebuild = false
let server_started = false

const params = {
    port: 8181, // Set the server port. Defaults to 8080.
    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: "./docs", // Set root directory that's being served. Defaults to cwd.
    open: true, // When false, it won't load your browser by default.
    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    //mount: [["/components", "./node_modules"]], // Mount a directory to a route.
    watch: watched,
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
    middleware: [
        function (req, res, next) {
            next();
        },
    ], // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
}

function request_build() {
    if(timer !== null) {
        clearTimeout(timer)
        timer = null
    }
    timer = setTimeout(() => {
        if(!running) {
            console.log(`Auto Build (${changes.length} changes)`)
            changes.splice(0,changes.length)
            running = true
            build(() => {
                running = false
                if(should_rebuild) {
                    should_rebuild = false
                    request_build()
                }
                else {
                    fs.writeFileSync(watched, JSON.stringify({
                        last_build: (new Date()).toJSON()
                    }))
                    if(!server_started) {
                        liveServer.start(params)
                        server_started = true
                    }
                }
            })
        }
        else should_rebuild = true
    }, 1000)
}

chokidar.watch('./src').on('all', (event, path) => {
    changes.push({
        event,
        path
    })
    request_build()
})


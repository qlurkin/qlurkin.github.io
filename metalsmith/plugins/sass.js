const sassLib = require('sass')
const path = require('path')
const fs = require('fs')

function sass(scssPath, cssPath) {
    fs.mkdirSync(cssPath, { recursive: true })
    for(file of fs.readdirSync(scssPath)) {
        if(file[0] !== '_' && file.endsWith('.scss')) {
            const scssFilename = path.join(scssPath, file)
            const cssFilename = path.join(cssPath, file.slice(0, file.length-5) + ".css")
            const result = sassLib.compile(scssFilename)
            fs.writeFileSync(cssFilename, result.css)
        }
    }
}

module.exports = sass
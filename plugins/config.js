const path = require('path')
const isDescendant = require('./helpers').isDescendant

function config() {
    return (files, metalsmith, done) => {
        const configs = {}
        const filenames = []
        // collect .config.json files and all files
        for (const [filename, file] of Object.entries(files)) {
            filenames.push(filename)
            if(path.basename(filename) === '.config.json') {
                configs[path.dirname(filename)] = JSON.parse(file.contents.toString())
            }
        }

        configFolders = Object.keys(configs)
        configFolders.sort((a, b) => a.length-b.length)

        // apply config to files
        for(filename of filenames) {
            for (const ancestor of configFolders) {
                if(isDescendant(filename, ancestor)) {
                    Object.assign(files[filename], configs[ancestor])
                }
            }
        }

        // remove config from output
        for (const directory of configFolders) {
            delete files[path.join(directory, '.config.json')]
        }

        done()
    }
}

module.exports = config
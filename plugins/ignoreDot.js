const path = require('path')

function ignoreDot() {
    return (files, metalsmith, done) => {
        for (const [filename, file] of Object.entries(files)) {
            const parts = filename.split(path.sep)
            let ignore = false
            for(const part of parts) {
                if(part.startsWith('.')) {
                    if(part !== '.gitignore')
                        ignore = true
                }
            }
            if(ignore) {
                delete files[filename]
            }
        }
        done()
    }
}

module.exports = ignoreDot
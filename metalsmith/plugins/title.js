// Get title from title tag or h1 tag
const path = require('path')

function title() {
    return (files, metalsmith, done) => {
        var title = new RegExp("<title[^>]*>(.+)</title>");
        var h1 = new RegExp("<h1[^>]*>(.+)</h1>");
        for (const [filename, file] of Object.entries(files)) {
            if(path.extname(filename) === '.html') {
                const content = file.contents.toString()
                //print(content)
                res = content.match(title)
                if(res === null)
                    res = content.match(h1)
                if(res !== null) {
                    if(file.title === undefined) {
                        file.title = res[1]
                    }
                }
            }
        }
        done()
    }
}

module.exports = title
const path = require('path')
const getAncestors = require('./helpers').getAncestors

function index() {
    return (files, metalsmith, done) => {
        const indexes = []
        const autoIndexes = []

        for (const filename of Object.keys(files)) {
            const base = path.basename(filename)

            if(base.startsWith('index.')) {
                indexes.push(filename)
            }

            if(base === 'index-auto.html') {
                autoIndexes.push(filename)
            }
        }

        autoIndexes.sort((a, b) => b.length - a.length)

        for(const autoIndex of autoIndexes) {
            const folder = path.dirname(autoIndex)
            const links = []
            for(const index of indexes) {
                if(folder === path.dirname(path.dirname(index))) {
                    links.push(index)
                }
            }
            if(links.length > 0) {
                indexPath = path.join(folder, 'index.html')
                const title = files[autoIndex].title
                files[indexPath] = files[autoIndex]
                files[indexPath].links = links.map(link => ({link, title: files[link].title}))
                files[indexPath].layout = 'index.njk'
                delete files[autoIndex]
                indexes.push(indexPath)
            }
        }

        done()
    }
}

module.exports = index
const path = require('path')
const getAncestors = require('./helpers').getAncestors

function index() {
    return (files, metalsmith, done) => {

        // folders = {}
        // for (const filename of Object.keys(files)) {
        //     for(folder of getAncestors(path.dirname(filename))) {
        //         folders[folder] = []
        //     }
        // }

        const indexes = []
        const autoIndexes = []

        for (const filename of Object.keys(files)) {
            //const dir = path.dirname(filename)
            const base = path.basename(filename)

            if(base.startsWith('index.')) {
                indexes.push(filename)
            }

            if(base === 'index-auto.html') {
                autoIndexes.push(filename)
            }

            //folders[dir].push(base)
        }

        autoIndexes.sort((a, b) => b.length - a.length)

        console.log("autoIndexes:", autoIndexes)
        console.log("indexes:", indexes)

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
                console.log('CREATE INDEX')
                console.log('   ', indexPath)
                console.log('   ', links)
                const title = files[autoIndex].title
                let html = `<h1>${title}</h1>\n<ul>\n${links.map(link => `    <li><a href="${link}">${files[link].title}</a></li>`).join('\n')}\n</ul>`
                files[indexPath] = files[autoIndex]
                files[indexPath].contents = Buffer.from(html, "utf-8")
                delete files[autoIndex]
                indexes.push(indexPath)
            }
        }

        console.log("autoIndexes:", autoIndexes)
        console.log("indexes:", indexes)



        // folders_to_add_index = []
        // for (const [folder, files] of Object.entries(folders)) {
        //     addIndex = true
        //     for(const file of files) {
        //         if(file.startsWith('index.')) {
        //             addIndex = false
        //             break
        //         }
        //     }
        //     if(addIndex) {
        //         folders_to_add_index.push(folder)
        //     }
        // }

        // //console.log('folders:', folders)
        // console.log('to add index:', folders_to_add_index)
        // console.log('indexes:', indexes)

        // let newIndexCreated = true
        // while(newIndexCreated) {
        //     newIndexCreated = false
        //     for(const folder of folders_to_add_index) {
        //         links = []
        //         for(const index of indexes) {
        //             if(folder === path.dirname(path.dirname(index))) {
        //                 links.push(index)
        //             }
        //         }
        //         if(links.length > 0) {
        //             indexPath = path.join(folder, 'index.html')
        //             console.log(indexPath)
        //             console.log(links)
        //             indexes.push(indexPath)
        //             newIndexCreated = true
        //             const index = folders_to_add_index.indexOf(folder);
        //             if (index > -1) {
        //                 folders_to_add_index.splice(index, 1); // 2nd parameter means remove one item only
        //             }
        //         }
        //     }
        // }
        
        //console.log('folders:', folders)
        // console.log('to add index:', folders_to_add_index)
        // console.log('indexes:', indexes)

        done()
    }
}

module.exports = index
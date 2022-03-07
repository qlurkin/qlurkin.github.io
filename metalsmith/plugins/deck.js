function deck() {
    return (files, metalsmith, done) => {
        for (const [filename, file] of Object.entries(files)) {
            if(file.layout === undefined) {
                const content = file.contents.toString()
                if(content.includes('</section>')) {
                    file.layout = 'deck.njk'
                }
            }
        }
        done()
    }
}

module.exports = deck
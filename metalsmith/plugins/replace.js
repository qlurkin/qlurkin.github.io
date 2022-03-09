function replace(replacements) {
    return (files, metalsmith, done) => {
        for (const [filename, file] of Object.entries(files)) {
            if(filename.endsWith('.html')) {
                let content = file.contents.toString()
                for(const {find, replace} of replacements) {
                    content = content.replace(find, replace)
                }
                file.contents = Buffer.from(content)
            }
        }
        done()
    }
}

module.exports = replace
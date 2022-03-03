function source() {
    return (files, metalsmith, done) => {
        for (const [key, value] of Object.entries(files)) {
            value.src = key
        }
        done()
    }
}

module.exports = source
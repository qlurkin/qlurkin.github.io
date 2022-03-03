function show() {
    return (files, metalsmith, done) => {
        console.log(files)
        done()
    }
}

module.exports = show
function filter(conditional, plugin) {
    return (files, metalsmith, done) => {
        const filtered = {}
        for (const [key, value] of Object.entries(files)) {
            if(conditional(value)) {
                filtered[key] = value
            }
        }
        plugin(filtered, metalsmith, done)
    }
}

module.exports = filter
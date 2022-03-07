const rollupLib = require('rollup')

async function build(inputOptions, outputOptions) {
    let bundle
    let buildFailed = false
    try {
        // create a bundle
        bundle = await rollupLib.rollup(inputOptions)

        // an array of file names this bundle depends on
        //console.log(bundle.watchFiles);

        return await bundle.write(outputOptions)
    } catch (error) {
        buildFailed = true
        // do some error reporting
        console.error(error)
    }
    if (bundle) {
        // closes the bundle
        await bundle.close()
    }
    process.exit(buildFailed ? 1 : 0)
}

async function rollup(optionsList) {
    for(options of optionsList) {
        const outputOptions = options.output
        const inputOptions = options
        delete inputOptions.output
        await build(inputOptions, outputOptions)
    }
}

module.exports = rollup
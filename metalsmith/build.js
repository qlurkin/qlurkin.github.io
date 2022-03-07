const Metalsmith = require('metalsmith')
const path = require('path')
const markdown = require('@metalsmith/markdown')
const layouts = require('@metalsmith/layouts')
const debug = require('metalsmith-debug')
const ancestry = require('metalsmith-ancestry')
const filter = require('./plugins/filter')
const show = require('./plugins/show')
const source = require('./plugins/source')
const index = require('./plugins/index')
const config = require('./plugins/config')
const title = require('./plugins/title')
const sass = require('./plugins/sass')
const rollup = require('./plugins/rollup')


Metalsmith(__dirname)
    .source('./src')
    .destination('./docs')
    .clean(true)
    .use(config())
    .use(source())
    .use(markdown())
    .use(title())
    .use(index())
    .use(filter(
        function (file) {
            if(!file.contents.toString().includes('</html>'))
                return true
            return false
        },
        layouts({
            default: 'document.njk',
            directory: 'layouts',
            suppressNoFilesError: true,
            pattern: '**/*.html'
        })
    ))
    //.use(ancestry())
    //.use(show())
    //.use(debug())
    .build(function (err) {
        if (err) throw err
        sass('./scss', './docs/css')
        rollup([{
            input: 'js/deckBehavior.js',
            output: {
                file: 'docs/js/deckBehavior.js',
                format: 'iife',
                name: 'Deck'
            }
        }])
        .then(() => {
            console.log('Build finished!')
        })
    })


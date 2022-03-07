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
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const rollup_sass = require('rollup-plugin-sass')
const deck = require('./plugins/deck')

Metalsmith(__dirname)
    .source('./src')
    .destination('./docs')
    .clean(true)
    .use(config())
    .use(source())
    .use(markdown())
    .use(title())
    .use(index())
    .use(deck())
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
        //sass('./scss', './docs/css')
        rollup([
            {
                input: 'js/deck.js',
                output: {
                    file: 'docs/deck.js',
                    format: 'iife',
                    name: 'Deck'
                },
                plugins: [ 
                    resolve(),
                    commonjs(),
                    rollup_sass({
                        insert: true
                    })
                ]
            },
            {
                input: 'js/document.js',
                output: {
                    file: 'docs/document.js',
                    format: 'iife',
                    name: 'Document'
                },
                plugins: [ 
                    resolve(),
                    commonjs(),
                    rollup_sass({
                        insert: true
                    })
                ]
            }
        ])
        .then(() => {
            console.log('Build finished!')
        })
    })


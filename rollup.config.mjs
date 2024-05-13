import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sass from 'rollup-plugin-sass'
import * as core_sass from 'sass'
import fs from 'fs'

const result = core_sass.compile('scss/document.scss')
fs.writeFileSync('docs/document.css', result.css)
console.log('document.css DONE')

export default [
  {
    input: 'js/deck.js',
    output: {
      file: 'docs/deck.js',
      format: 'iife',
      name: 'Deck',
    },
    plugins: [
      resolve(),
      commonjs(),
      sass({
        insert: true,
      }),
    ],
  },
  {
    input: 'js/document.js',
    output: {
      file: 'docs/document.js',
      format: 'iife',
      name: 'Doc',
    },
    plugins: [
      resolve(),
      commonjs(),
      sass({
        insert: true,
      }),
    ],
  },
]

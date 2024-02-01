import { unlink, readFile, writeFile } from 'node:fs/promises'
import util from 'node:util'
import { exec } from 'node:child_process'
import path from 'node:path'
const cmd = util.promisify(exec)

function getRandomFileName() {
  var timestamp = new Date().toISOString().replace(/[-:.]/g, '')
  var random = ('' + Math.random()).substring(2, 8)
  var random_number = timestamp + random
  return random_number
}

async function base64_encode(file) {
  var bitmap = await readFile(file)
  return `data:image/svg+xml;base64,${bitmap.toString('base64')}`
}

function img_inline(src, font_size) {
  return `<img class="typst-formula-inline" style="display: inline-block; margin: -${
    font_size / 2
  }px 0;" src="${src}">`
}

function img_display(src, font_size) {
  return `<img class="typst-formula-display" style="display: block; margin: 1em auto;" src="${src}">`
}

async function create_document_inline(filename, src, font_size) {
  const content = `#set text(${font_size}pt)

#set page(
  width: auto,
  height: auto,
  margin: (x: 0pt, y: ${font_size / 2}pt),
)

$${src}$
`
  await writeFile(filename, content)
}

async function create_document_display(filename, src, font_size) {
  const content = `#set text(${font_size}pt)

#set page(
  width: auto,
  height: auto,
  margin: 0pt,
)

$${src}$
`
  await writeFile(filename, content)
}

async function get_svg(filename) {
  return await readfile(filename, { encoding: 'utf8' })
}

export async function compile_inline(src, font_size) {
  const name = getRandomFileName()
  const svgpath = path.resolve(`${name}.svg`)
  const typpath = path.resolve(`${name}.typ`)
  await create_document_inline(typpath, src, font_size)
  // const proc = Bun.spawn(['typst', 'compile', 'tmp.typ', 'tmp.svg'], {
  //   cwd: '.', // specify a working directory
  // })
  await cmd(`typst compile ${typpath} ${svgpath}`)
  const img_src = await base64_encode(svgpath)
  const img = img_inline(img_src, font_size)
  await unlink(typpath)
  await unlink(svgpath)
  return img
}

export async function compile_display(src, font_size) {
  const name = getRandomFileName()
  const svgpath = path.resolve(`${name}.svg`)
  const typpath = path.resolve(`${name}.typ`)
  await create_document_display(typpath, src, font_size)
  // const proc = Bun.spawn(['typst', 'compile', 'tmp.typ', 'tmp.svg'], {
  //   cwd: '.', // specify a working directory
  // })
  // await proc.exited
  await cmd(`typst compile ${typpath} ${svgpath}`)
  const img_src = await base64_encode(svgpath)
  const img = img_display(img_src, font_size)
  await unlink(typpath)
  await unlink(svgpath)

  return img
}

export async function compile(src, font_size) {
  const re = new RegExp('\\$\\$(.+?)\\$\\$')
  const res = re.exec(src)
  if (!res) return src
  const start = src.substring(0, res.index)
  const rest = src.substring(res.index + res[0].length)
  const formula = res[1]
  if (formula.startsWith(' ')) {
    return (
      start +
      (await compile_display(formula, font_size)) +
      (await compile(rest, font_size))
    )
  } else {
    return (
      start +
      (await compile_inline(formula, font_size)) +
      (await compile(rest, font_size))
    )
  }
}

export default compile

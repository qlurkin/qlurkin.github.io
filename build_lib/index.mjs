import { stat, readdir, writeFile, readFile } from 'node:fs/promises'
import child_process from 'child_process'
import { marked } from 'marked'
import { parse, join, resolve, relative } from 'path'
import nunjucks from 'nunjucks'
import yaml from 'js-yaml'
import puppeteer from 'puppeteer'
import express from 'express'
import { PDFDocument } from 'pdf-lib'

const build_script = 'build.js'

async function get_parent_dir_with(filename) {
  let current = '.'
  while(!(await readdir(current)).includes(filename)) {
    current = join(current, '..')
  }
  return resolve(current)
}

async function get_root() {
  return await get_parent_dir_with('package.json')
}

function enforceList(obj) {
    if(!obj) return
    if(!Array.isArray(obj))
        return [obj]
    return obj
}

const root = await get_root()
const server = JSON.parse(await readFile(join(root, 'server.json'), {encoding: 'utf8'}))
const server_root = join(root, server.root)

const env = nunjucks.configure(join(root, 'layouts'), { autoescape: true })
env.addFilter('enforceList', enforceList)

marked.use({
  mangle: false,
  headerIds: false,
  gfm: true,
})

// marked.use(markedHighlight({
//   langPrefix: 'hljs language-',
//   highlight(code, lang) {
//     const language = hljs.getLanguage(lang) ? lang : 'plaintext'
//     return hljs.highlight(code, { language }).value
//   }
// }))

function runScript(scriptPath, args, options) {
  return new Promise((resolve, reject) => {
    const process = child_process.fork(scriptPath, args, options)

    process.on('error', function (error) {
      const err = new Error(`Error in '${scriptPath}': ${error}`)
      reject(err)
    })

    process.on('exit', function (code) {
      resolve(code)
    })
  })
}

async function build_dir(path) {
  if(path === '.') return
  const files = await readdir(path)
  if(files.includes(build_script)) {
    await runScript(build_script, [], {
      cwd: path
    })
  }
}

async function build_md(path) {
  const info = parse(path)
  let content = await readFile(path, {encoding: 'utf8'})
  const opts = {layout: 'document'}
  if(content.startsWith('---\n')) {
    const parts = content.slice(4).split('\n---\n')
    const prelude = parts[0]
    content = parts.slice(1).join('\n---\n').trimStart()
    Object.assign(opts, yaml.load(prelude))
  }
  opts.content = await marked.parse(content, {async: true})
  const html = nunjucks.render(`${opts.layout}.njk`, opts)
  await writeFile(`${info.name}.html`, html)
}

export async function build(path) {
  if(Array.isArray(path)) {
    const promises = []
    for(const item of path) {
      promises.push(build(item))
    }
    return Promise.all(promises)
  }

  const stats = await stat(path)
  const info = parse(path)
  if(stats.isDirectory()) {
    await build_dir(path)
  }
  else if(info.ext === '.md') {
    await build_md(path)
  }
}

export async function index(dirs, opts) {
  opts = Object.assign({title: ''}, opts)
  opts.links = await Promise.all(dirs.map(async dir => {
    let title = dir
    if((await readdir(dir)).includes('index.html')) {
      const content = await readFile(join(dir, 'index.html'), {encoding: 'utf8'})
      const re = new RegExp("<title>(.*)<\/title>")
      const matches = content.match(re)
      if(matches) {
        title = matches[1]
        
      }
    }
    const link = relative(server_root, `./${dir}`)
    return {
      link: `/${link}/`,
      title
    }
  }))
  const content = nunjucks.render('index.njk', opts);
  await writeFile('index.html', content)
}

export async function build_and_index(dirs, opts) {
  await build(dirs)
  await index(dirs, opts)
}

export async function redirect(target, opts) {
  const link = target.startsWith('http') ? target : '/'+relative(server_root, `./${target}`)
  opts.target = link
  const content = nunjucks.render('redirect.njk', opts);
  await writeFile('index.html', content)
}

export async function screenshot_website(url, filename, width, height, actions) {
  const browser = await puppeteer.launch({
    headless: "new"
  })
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2',
  })
  await page.setViewport({width, height})
  if(actions)
    await actions(page)
  await page.screenshot({
    path: filename,
  })
  await browser.close()
}

function filenamify(s) {
  const re = new RegExp('[<>:"/\|?*]', 'g')
  return s.replace(re, '_')
}

export async function pdf(chapters, filename) {
  const app = express()

  app.use(express.static(join(root, 'docs')))

  const srv = app.listen(0, async () => {
    const port = srv.address().port

    const browser = await puppeteer.launch({
      headless: "new"
    })

    const pdfDoc = await PDFDocument.create()
  
    for(const chapter of chapters) {
      
      const url = `http://localhost:${port}/${relative(server_root, chapter)}`
      const page = await browser.newPage()
      await page.goto(url, {
        waitUntil: 'networkidle2',
      })
      const bytes = await page.pdf({ format: 'a4', printBackground: true })
      const pdf = await PDFDocument.load(bytes)
      for(let i=0; i<pdf.getPageCount(); i++) {
        const [page] = await pdfDoc.copyPages(pdf, [i])
        pdfDoc.addPage(page)
      }
    }

    await writeFile(filename, await pdfDoc.save()) 
  
    await browser.close()

    srv.close()
    srv.emit('close')
  })
}

export default { build, index, build_and_index, redirect }

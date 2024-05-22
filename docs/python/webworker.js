importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js')

const src_open = `
class open:
  def __init__(self, filename):
    self.filename = filename
    self.content = (f'filename: {filename}\\ncaca').encode('utf8')
  def read(self):
    return self.content.decode('utf8')

globals()
`
let globals = undefined
async function loadPyodideAndPackages() {
  self.pyodide = await loadPyodide()
  await self.pyodide.loadPackage(['numpy'])
  globals = await self.pyodide.runPythonAsync(src_open)
  console.log(globals)
}
let pyodideReadyPromise = loadPyodideAndPackages()

self.onmessage = async (event) => {
  await pyodideReadyPromise
  const { id, python } = event.data
  try {
    await self.pyodide.loadPackagesFromImports(python)
    let results = await self.pyodide.runPythonAsync(python, { globals })
    self.postMessage({ results, id })
  } catch (error) {
    self.postMessage({ error: error.message, id })
  }
}

const fs = require('fs')

function strip_ipynb(file) {
  const nb = JSON.parse(fs.readFileSync(file, 'utf8'))
  for (const cell of nb.cells) {
    if (cell.cell_type === 'code') {
      cell.outputs = []
      cell.execution_count = null
    }
  }

  fs.writeFileSync(file, JSON.stringify(nb, null, 2))
}

export default strip_ipynb

import { pandoc, make_zip, strip_ipynb } from 'build_lib'
import fs from 'fs'

const files = fs.readdirSync('.')

const imgs = []

for (const file of files) {
  if (file.endsWith('.svg') || file.endsWith('.png')) {
    imgs.push(file)
  }
}

const notebooks = [
  './2_Digital Signal Processing.ipynb',
  './2_1_sin_waves.ipynb',
  './2_2_TL.ipynb',
  './presentation.ipynb',
]

notebooks.forEach(strip_ipynb)

make_zip(
  'lab2.zip',
  imgs.concat(notebooks).concat(['data_DSP_exercise_1_v2.npz', 'data_TL.npz']),
)

pandoc('index.md')

import { pandoc, make_zip } from 'build_lib'
import fs from "fs";

const files = fs.readdirSync('.');

const imgs = []

for (const file of files) {
  if(file.endsWith(".svg") || file.endsWith(".png")) {
    imgs.push(file)
  }
}

make_zip("lab2.zip", imgs.concat([
    './2_1_sin_waves.ipynb',
    './2_Digital Signal Processing.ipynb',
]))

pandoc('index.md')
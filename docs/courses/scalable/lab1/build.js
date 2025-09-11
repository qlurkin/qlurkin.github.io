import { pandoc } from 'build_lib'

pandoc('index.md')
pandoc('mandelbrot.md')
pandoc('./levenshtein.md')

import { build_and_index, build } from 'build_lib'

build('python1ba/book')
build('test')

build_and_index(
  [
    'gpu',
    'imageprocessing',
    'mobile',
    'poo',
    'python1ba',
    'python2ba',
    'python2be',
    'scalable',
    'ergonomy',
  ],
  { title: 'Courses' },
)

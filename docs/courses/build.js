import { build_and_index, build } from "build_lib"

build('python1ba/book')

build_and_index([
  'gpu',
  'imageprocessing',
  'mobile',
  'poo',
  'python1ba/slides',
  'python2ba',
  'python2be',
  'scalable',
  'ergonomy',
], {title: 'Courses'})
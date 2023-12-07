import { build_and_index } from 'build_lib'

build_and_index(
  [
    '../book',
    'slides1',
    'slides2',
    'slides3',
    'slides4',
    'exam',
    //  'slides5',
  ],
  { title: 'Python Part 1' },
)

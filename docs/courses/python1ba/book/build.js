import { build_and_index, pdf } from "build_lib";

await build_and_index([
    'chapter1',
    'chapter2',
    'chapter3',
])

pdf([
    'chapter1',
    'chapter2',
    'chapter3',
], 'book.pdf')

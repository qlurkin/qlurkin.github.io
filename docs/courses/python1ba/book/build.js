import { build_and_index, pdf } from "build_lib";

await build_and_index([
    'chapter1',
    'chapter2',
    // 'chapter3',
    // 'chapter4',
], {title: 'Syllabus'})

// pdf([
//     'chapter1',
//     'chapter2',
//     'chapter3',
//     'chapter4',
// ], 'book.pdf')

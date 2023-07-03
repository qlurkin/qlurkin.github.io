import { build, screenshot_website } from "build_lib";

// screenshot_website('https://python.org', './python.org.jpg', 1024, 576, async page => {
//     await page.hover('#downloads')
// })
// screenshot_website('https://code.visualstudio.com/', './code_visualstudio_com.jpg', 1024, 576, async page => {
//     await page.evaluate(() => {
//         const banner = document.querySelector('#cookie-banner')
//         banner.remove()
//     })
// })

build('index.md')

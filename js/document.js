import '../scss/document.scss'
import CodeReady from './code.js'
import renderMath from './math'
import arrowLine from 'arrow-line'
import FontReady from './fontready'

function initDocument() {
    const math = renderMath()

    return Promise.all([math, CodeReady, FontReady]).then(() => {
        console.log('Ready for Arrows')
    })
}

export const ReadyForArrows = initDocument()

export { arrowLine }
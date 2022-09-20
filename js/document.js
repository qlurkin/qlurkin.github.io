import '../scss/document.scss'
import renderCode from './code'
import renderMath from './math'

function initDocument() {
    renderMath()
    renderCode()
}

initDocument()
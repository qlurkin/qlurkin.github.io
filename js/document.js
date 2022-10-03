import '../scss/document.scss'
import renderCode from './code'
import renderMath from './math'
import { readyToDraw } from './readyToDraw'

function initDocument() {
    renderMath()
    renderCode()
}

initDocument()

//export { readyToDraw }
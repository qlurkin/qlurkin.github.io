import '../scss/document.scss'
import renderCode from './code'
import renderMath from './math'
import { ready } from './ready'
import { Draw } from './draw'

function initDocument() {
    renderMath()
    renderCode()
}

initDocument()

export { ready, Draw }
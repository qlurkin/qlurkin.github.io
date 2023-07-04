import '../scss/document.scss'
import renderCode from './code'
import renderMath from './math'
import { ready } from './ready'
import { Draw } from './draw'
import { renderRefs, setChapterNb } from './refs'

function initDocument() {
    renderMath()
    renderCode()
    renderRefs()
}

initDocument()

export { ready, Draw, setChapterNb }
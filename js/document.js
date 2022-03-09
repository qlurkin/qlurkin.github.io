import {DOMReady} from './helpers'
import '../scss/document.scss'
import './code.js'
import renderMath from './math'

function initDocument() {
    renderMath()
}

DOMReady().then(() => {
	initDocument()
})
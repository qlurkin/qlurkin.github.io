import hljs from 'highlight.js'
import {DOMReady} from './helpers'

function normalizeIndent(str) {
	// trim empty lines from start & end
	str = str.replace(/^\s?\n|\n\s?$/g, '');
 
	const lines = str.split('\n');
	const indentLen = /^\s*/.exec(lines[0])[0].length;
	return lines.map(l => l.slice(indentLen)).join('\n');
}

function normalizeAllIndent() {
	const codes = document.querySelectorAll('pre>code')
	codes.forEach(code => {
		code.innerHTML = normalizeIndent(code.innerHTML)
	})
	const terminals = document.querySelectorAll('.terminal')
	terminals.forEach(term => {
		term.innerHTML = normalizeIndent(term.innerHTML)
	})
}

const CodeReady = new Promise((resolve, reject) => {
	DOMReady().then(() => {
		normalizeAllIndent()
		console.log("Code Indentation Done")
		resolve()
	})
})

CodeReady.then(() => {
	hljs.highlightAll()
})

export default CodeReady

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
	//console.log(codes)
	codes.forEach(code => {
		//console.log(code.innerHTML)
		//console.log(normalizeIndent(code.innerHTML))
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
	console.log("Start Code Rendering")
	hljs.highlightAll()
	console.log('Code Rendering Finished')
})

export default CodeReady

import hljs from 'highlight.js'

let resolveCodeReady
export const codeReady = new Promise((resolve) => {
	resolveCodeReady = resolve
})

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
		const pre = code.parentElement
		while (pre.firstChild) {
			pre.removeChild(pre.lastChild)
		}
		pre.appendChild(code)
	})
	const terminals = document.querySelectorAll('.terminal')
	terminals.forEach(term => {
		term.innerHTML = normalizeIndent(term.innerHTML)
	})
}

export const renderCode = () => {
	normalizeAllIndent()
	console.log("Code Indentation Done")
	hljs.highlightAll()
	console.log('Code Rendering Finished')
	resolveCodeReady()
	return codeReady
}

export default renderCode

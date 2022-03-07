import {loadScript} from './helpers'

export function renderMath() {
	const content = document.body.innerText

	if(content.includes('$$') ||
		(content.includes('\\(') && content.includes('\\)')) ||
		(content.includes('\\[') && content.includes('\\]'))) {
			console.log('Loading MathJax...')
			loadScript('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js')
		}
}

export default renderMath
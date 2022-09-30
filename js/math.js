import {loadScript} from './helpers'

let resolveMathReady = null

export const mathReady = new Promise((resolve) => {
    resolveMathReady = resolve
})

export function renderMath() {
    const content = document.body.innerText

    if(content.includes('$$') ||
      (content.includes('\\(') && content.includes('\\)')) ||
      (content.includes('\\[') && content.includes('\\]'))) {
        
        console.log('Loading MathJax...')
        window.MathJax = {
            startup: {
                pageReady: () => {
                    return MathJax.startup.defaultPageReady().then(() => {
                        console.log('MathJax initial typesetting complete');
                        resolveMathReady()
                    });
                }
            }
        };
        loadScript('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js')
        return mathReady
    }
    else {
        resolveMathReady()
        return mathReady
    }
}

export default renderMath
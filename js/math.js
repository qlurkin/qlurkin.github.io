import {loadScript} from './helpers'

export function renderMath() {
    const content = document.body.innerText

    if(content.includes('$$') ||
      (content.includes('\\(') && content.includes('\\)')) ||
      (content.includes('\\[') && content.includes('\\]'))) {
        return new Promise((resolve, reject) => {
            console.log('Loading MathJax...')
            window.MathJax = {
                startup: {
                    pageReady: () => {
                        return MathJax.startup.defaultPageReady().then(() => {
                            console.log('MathJax initial typesetting complete');
                            resolve()
                        });
                    }
                }
            };
            loadScript('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js')
        })
    }
    else {
        return Promise.resolve()
    }
}

export default renderMath
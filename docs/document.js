(function () {
	'use strict';

	const loadScript = url => new Promise((resolve, reject) => {
	  const script = document.createElement('script');
	  script.async = true;

	  const callback = () => {
	    resolve();
	  };

	  script.onload = callback;
	  script.onreadystatechange = callback;
	  script.setAttribute("src", url); //document.head.insertBefore(script , null)

	  document.body.appendChild(script); // const script = document.createElement('script')
	  // script.async = true
	  // script.onload = () => {
	  // 	resolve()
	  // }
	  // script.onerror = () => {
	  // 	reject()
	  // }
	  // script.setAttribute("src", url)
	  // document.head.insertBefore(script , null)
	});
	const loadCSS = url => new Promise(resolve => {
	  const link = document.createElement('link');

	  link.onload = () => {
	    resolve();
	  };

	  link.setAttribute("rel", "stylesheet");
	  link.setAttribute("href", url);
	  document.head.insertBefore(link, null);
	});

	const loadMathjax = () => {
	  window.MathJax = {
	    loader: {
	      load: ['input/tex', 'output/svg']
	    },
	    tex: {},
	    svg: {}
	  };
	  loadScript('https://polyfill.io/v3/polyfill.min.js?features=es6').then(() => loadScript('https://cdn.jsdelivr.net/npm/mathjax@3.0.0/es5/startup.js'));
	};

	const loadPrism = () => {
	  console.log('Load Prism.js');
	  loadCSS('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css');
	  loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/components/prism-core.min.js').then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js')).then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/plugins/autoloader/prism-autoloader.min.js')).then(() => {
	    Prism.highlightAll();
	  });
	};

	window.addEventListener("DOMContentLoaded", event => {
	  console.log("DOM Loaded and Parsed");
	  const documentJs = document.querySelector('script[src$="document.js"]').getAttribute("src");
	  const documentJsRoot = documentJs.substring(0, documentJs.length - "document.js".length);
	  console.log(documentJsRoot);
	  loadCSS(documentJsRoot + 'document.css');
	  if (document.querySelectorAll('[class*=lang]').length > 0) loadPrism();
	  loadMathjax();
	});

}());

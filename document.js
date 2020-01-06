(function () {
	'use strict';

	const loadScript = url => new Promise((resolve, reject) => {
	  const script = document.createElement('script');
	  script.async = true;

	  script.onload = () => {
	    resolve();
	  };

	  script.onerror = () => {
	    reject();
	  };

	  script.setAttribute("src", url);
	  document.head.insertBefore(script, null);
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

	const getLanguage = element => {
	  let language = null;
	  element.classList.forEach(className => {
	    const re = /(lang-|language-)(\w+)/;
	    language = className.replace(re, '$2');
	  });
	  return language;
	};
	const findCode = document => {
	  return document.querySelectorAll('code[class*=lang]');
	};
	const findLanguages = document => {
	  const languages = [];
	  findCode(document).forEach(element => {
	    const language = getLanguage(element);

	    if (language) {
	      languages.push(language);
	    }
	  });
	  return [...new Set(languages)];
	};

	loadCSS('document.css');

	const loadPrism = () => {
	  const prismCdnUrl = language => `https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-${language}.js`;

	  loadCSS('https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/themes/prism.min.css');
	  loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/prism.min.js').then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/plugins/normalize-whitespace/prism-normalize-whitespace.min.js')).then(() => {
	    const languages = findLanguages(document);
	    console.log('languages:', languages);
	    Promise.all(languages.map(language => loadScript(prismCdnUrl(language)).catch(() => {
	      console.log(`${language} not found`);
	    }))).then(() => {
	      console.log("languages loaded");
	      Prism.highlightAll();
	    });
	  });
	};

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

	window.addEventListener("DOMContentLoaded", event => {
	  console.log("DOM Loaded and Parsed");
	  if (document.querySelectorAll('[class*=lang]').length > 0) loadPrism();
	  loadMathjax();
	});

	window.build = () => {
	  console.log('build');
	  const html = document.getElementsByTagName('html')[0].cloneNode(true);
	  const head = html.querySelector('head');
	  const title = head.querySelector('title').innerHTML;
	  const scripts = [];
	  head.childNodes.forEach(element => {
	    if (element.tagName == "SCRIPT") scripts.push(element);
	  });
	  scripts.forEach(element => {
	    head.removeChild(element);
	  });
	  const styles = [];
	  head.childNodes.forEach(element => {
	    if (element.tagName == "LINK" && element.rel == 'stylesheet') styles.push(element);
	  });
	  styles.forEach(element => {
	    fetch(element.attributes.href.value, {
	      mode: 'no-cors'
	    }).then(res => res.text()).then(css => {
	      head.removeChild(element);
	      const style = document.createElement('style');
	      style.appendChild(document.createTextNode(css));
	      head.appendChild(style);
	    });
	  });
	  const blob = new Blob([html.outerHTML], {
	    type: "text/html"
	  });
	  const url = URL.createObjectURL(blob);
	  const a = document.createElement('a');
	  a.href = url;
	  a.download = title + '.html';
	  a.click();
	};

}());

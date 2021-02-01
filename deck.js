(function () {
  'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "@import url('https://fonts.googleapis.com/css?family=Lora|Source+Code+Pro&display=swap');\r\n\r\n@page {\r\n\tmargin: 1cm;\r\n}\r\n\r\n* {\r\n\tbox-sizing: border-box;\r\n}\r\n\r\nbody {\r\n\tfont-family: 'Roboto', sans-serif;\r\n\ttext-rendering: optimizeLegibility;\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tbackground-color: white;\r\n}\r\n\r\n.mode-deck .deck-before, .mode-deck .deck-previous, .mode-deck .deck-next, .mode-deck .deck-after {\r\n\tdisplay: none;\r\n}\r\n\r\n.mode-deck .deck-current {\r\n\tdisplay: flex;\r\n\tfont-size: 3.5vh;\r\n\twidth: 133vh;\r\n\tmin-height: 100vh;\r\n\tflex-direction: column;\r\n\tjustify-content: center;\r\n\tmargin: 0 auto;\r\n\tpadding: 12vh 4vh 4vh 4vh\r\n}\r\n\r\n.mode-deck .deck-current>* {\r\n\tflex: 0 0 auto;\r\n}\r\n\r\n.mode-deck .deck-current h2 {\r\n\tposition: fixed;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tright: 0;\r\n\tmargin: 0;\r\n\tpadding: 2vh 10vh;\r\n\tfont-family: 'Roboto Slab', serif;\r\n\tfont-size: 1.2em;\r\n\tcolor: white;\r\n\tbackground-color: green;\r\n\ttext-align: right;\r\n\tz-index: 1000;\r\n}\r\n\r\nimg {\r\n\tmax-width: 100%;\r\n}\r\n\r\nimg.half {\r\n\twidth: 50%;\r\n}\r\n\r\nimg.third {\r\n\twidth: 33%;\r\n}\r\n\r\nimg.third2 {\r\n\twidth: 66%;\r\n}\r\n\r\nimg.fourth {\r\n\twidth: 25%;\r\n}\r\n\r\nimg.fourth3 {\r\n\twidth: 75%;\r\n}\r\n\r\nimg.zoom {\r\n\twidth: 75%;\r\n}\r\n\r\nimg.max {\r\n\twidth: 100%;\r\n}\r\n\r\nfigure {\r\n\tmargin: 0 0 1em 0;\r\n\tpadding: 0;\r\n\ttext-align: center;\r\n}\r\n\r\n.mode-deck .deck-current.full {\r\n\twidth: 100vw;\r\n\theight: 100vh;\r\n\tpadding: 0;\r\n}\r\n\r\n.mode-deck .deck-current.full h2 {\r\n\tbackground-color: rgba(0, 0, 0, 0.5);\r\n}\r\n\r\n.mode-deck .deck-current.full img {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tobject-fit: cover;\r\n\tmargin: 0;\r\n}\r\n\r\n.mode-deck .deck-current h1 {\r\n\tfont-family: 'Roboto Slab', serif;\r\n\tfont-size: 2em;\r\n}\r\n\r\n.mode-deck .document-only {\r\n\tdisplay: none;\r\n}\r\n\r\n.mode-document .deck-only {\r\n\tdisplay: none;\r\n}\r\n\r\nbody.mode-document {\r\n\tmax-width: 60ex;\r\n\tmargin: 0 auto;\r\n}\r\n\r\n.mode-document h2 {\r\n\t\tfont-size: 1.1em;\r\n\t\tmargin-top: 1.5em;\r\n}\r\n\r\n.mode-document h1 {\r\n\ttext-align: right;\r\n\tborder-bottom: 1px solid lightgray;\r\n\tpadding: 1em 0;\r\n}\r\n\r\nh3 {\r\n\tfont-size: 1em;\r\n\tfont-variant: small-caps;\r\n\tfont-weight: bolder;\r\n}\r\n\r\nstrong {\r\n\tfont-weight: normal;\r\n\tcolor: red;\r\n}\r\n\r\nli, p {\r\n\tmargin: 0 0 1em 0;\r\n\ttext-align: justify;\r\n}\r\n\r\nli small {\r\n\tdisplay: block;\r\n\tpadding-left: 3ex;\r\n\tmargin-top: 0.5em;\r\n\tfont-size: 1em;\r\n\tcolor: gray;\r\n}\r\n\r\n.indent {\r\n\tpadding-left: 3ex;\r\n}\r\n\r\nh1, h2, h3, h4, h5, h6, pre, table, img {\r\n\tbreak-inside: avoid-page;\r\n}\r\n\r\n/* hack that avoid page break after h2 et h3 */\r\nh2::after, h3::after {\r\n\tcontent: \"\";\r\n\tdisplay: block;\r\n\theight: 100px;\r\n\tmargin-bottom: -100px;\r\n}\r\n\r\n.center {\r\n\ttext-align: center;\r\n}\r\n\r\n.big {\r\n\tfont-size: 1.5em;\r\n}\r\n\r\nfigcaption {\r\n\ttext-align: center;\r\n\tfont-style: italic;\r\n\tfont-size: 0.8em;\r\n}\r\n\r\nh1 > small {\r\n\tdisplay: block;\r\n\tfont-size: 0.6em;\r\n\tfont-weight: normal;\r\n\tcolor: gray;\r\n\tmargin-top: 0.4em;\r\n}\r\n\r\n.katex-html {\r\n\tfont-size: 0.8em;\r\n}\r\n\r\n.columns {\r\n\tdisplay: grid;\r\n\tgrid-template-columns: 1fr 1fr;\r\n\tgrid-template-areas: \"left right\";\r\n\tgrid-column-gap: 10px;\r\n\talign-items: center;\r\n}\r\n\r\n.wide-left {\r\n\tgrid-template-columns: 1.61803398875fr 1fr;\r\n}\r\n\r\n.wide-rigth {\r\n\tgrid-template-columns: 1fr 1.61803398875fr;\r\n}\r\n\r\n.left {\r\n\tgrid-area: left;\r\n}\r\n\r\n.right {\r\n\tgrid-area: right;\r\n}\r\n\r\nli > ul {\r\n\tmargin-top: 1em;\r\n}\r\n\r\ncode:not([class*=\"language-\"]) {\r\n\tfont-family: 'Source Code Pro', monospace;\r\n\tfont-size: 87.5%;\r\n\tcolor: #e83e8c;\r\n}\r\n\r\n.mode-deck .material-icons.off {\r\n\tdisplay: none;\r\n}\r\n\r\n.mode-document .material-icons.on {\r\n\tdisplay: none;\r\n}\r\n\r\n.toggle-button {\r\n\topacity: 50%;\r\n\tbackground-color: transparent;\r\n\tborder: none;\r\n\tposition: fixed;\r\n\ttop: 5px;\r\n\tleft: 5px;\r\n\tz-index: 2000;\r\n\tfont-size: 1.2em;\r\n\tpadding: 2vh;\r\n}\r\n\r\n.toggle-button:focus {\r\n\tborder: none;\r\n\toutline: transparent;\r\n}\r\n\r\n@media print {\r\n\t.toggle-button {\r\n\t\tdisplay: none;\r\n\t}\r\n}";
  styleInject(css_248z);

  const loadScript = url => new Promise(resolve => {
    const script = document.createElement('script');

    const callback = () => {
      resolve();
    };

    script.onload = callback;
    script.onreadystatechange = callback;
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

  const loadPrism = () => {
    console.log('Load Prism.js');
    loadCSS('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css');
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/components/prism-core.min.js').then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js')).then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/plugins/autoloader/prism-autoloader.min.js')).then(() => {
      Prism.highlightAll();
    });
  };

  loadCSS("https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css");
  loadCSS("https://fonts.googleapis.com/css?family=Roboto|Roboto+Condensed|Roboto+Mono|Roboto+Slab");
  loadCSS("https://fonts.googleapis.com/icon?family=Material+Icons");
  loadCSS("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css");
  const scripts = [];
  scripts.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"));
  scripts.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"));
  scripts.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"));
  scripts.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/contrib/auto-render.min.js"));
  const deckOk = Promise.all(scripts).then(() => loadScript("https://cdnjs.cloudflare.com/ajax/libs/deck.js/1.1.0/core/deck.core.js"));
  window.addEventListener("DOMContentLoaded", event => {
    console.log("DOM Loaded and Parsed");
    document.body.classList.add('mode-document'); //Prism.highlightAll()

    if (document.querySelectorAll('[class*=lang]').length > 0) loadPrism();

    function toggleView() {
      $('body').toggleClass('mode-deck');
      $('body').toggleClass('mode-document');
    }

    deckOk.then(() => {
      renderMathInElement(document.body);
      $.deck('section');
      $(document).bind('deck.change', function (event, from, to) {
        $('body').scrollTop(0);
      });
      $(document).keypress(function (event) {
        if (event.key === 'm') {
          toggleView();
        }
      }); // const button = document.createElement("button")
      // button.innerHTML = '<i class="material-icons off">toggle_off</i><i class="material-icons on">toggle_on</i>'
      // button.classList.add("toggle-button")
      // document.body.appendChild(button)
      // button.addEventListener('click', () => {
      // 	toggleView()
      // 	button.blur()
      // })
    });
  });

}());

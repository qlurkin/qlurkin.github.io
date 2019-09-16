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

  var css = "* {\n\tbox-sizing: border-box;\n}\n\nbody {\n\tfont-family: 'Roboto', sans-serif;\n\ttext-rendering: optimizeLegibility;\n\tmargin: 0;\n\tpadding: 0;\n}\n\n.mode-deck .deck-before, .mode-deck .deck-previous, .mode-deck .deck-next, .mode-deck .deck-after {\n\tdisplay: none;\n}\n\n.mode-deck .deck-current {\n\tdisplay: flex;\n\tfont-size: 3.5vh;\n\twidth: 133vh;\n\tmin-height: 100vh;\n\tflex-direction: column;\n\tjustify-content: center;\n\tmargin: 0 auto;\n\tpadding: 12vh 4vh 4vh 4vh\n}\n\n.mode-deck .deck-current>* {\n\tflex: 0 0 auto;\n}\n\n.mode-deck .deck-current h2 {\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tmargin: 0;\n\tpadding: 2vh 10vh;\n\tfont-family: 'Roboto Slab', serif;\n\tfont-size: 1.2em;\n\tcolor: white;\n\tbackground-color: green;\n\ttext-align: right;\n\tz-index: 1000;\n}\n\nimg {\n\tmax-width: 100%;\n}\n\nimg.half {\n\twidth: 50%;\n}\n\nimg.third {\n\twidth: 33%;\n}\n\nimg.third2 {\n\twidth: 66%;\n}\n\nimg.fourth {\n\twidth: 25%;\n}\n\nimg.fourth3 {\n\twidth: 75%;\n}\n\nimg.zoom {\n\twidth: 75%;\n}\n\nimg.max {\n\twidth: 100%;\n}\n\nfigure {\n\tmargin: 0 0 1em 0;\n\tpadding: 0;\n\ttext-align: center;\n}\n\n.mode-deck .deck-current.full {\n\twidth: 100vw;\n\theight: 100vh;\n\tpadding: 0;\n}\n\n.mode-deck .deck-current.full h2 {\n\tbackground-color: rgba(0, 0, 0, 0.5);\n}\n\n.mode-deck .deck-current.full img {\n\twidth: 100%;\n\theight: 100%;\n\tobject-fit: cover;\n\tmargin: 0;\n}\n\n.mode-deck .deck-current h1 {\n\tfont-family: 'Roboto Slab', serif;\n\tfont-size: 2em;\n}\n\n.mode-deck .document-only {\n\tdisplay: none;\n}\n\n.mode-document .deck-only {\n\tdisplay: none;\n}\n\nbody.mode-document {\n\tmax-width: 60ex;\n\tmargin: 0 auto;\n}\n\n.mode-document h2 {\n\t\tfont-size: 1.1em;\n\t\tmargin-top: 1.5em;\n}\n\n.mode-document h1 {\n\ttext-align: right;\n\tborder-bottom: 1px solid lightgray;\n\tpadding: 1em 0;\n}\n\nstrong {\n\tfont-weight: normal;\n\tcolor: red;\n}\n\nli, p {\n\tmargin: 0 0 1em 0;\n\ttext-align: justify;\n}\n\nli small {\n\tdisplay: block;\n\tpadding-left: 3ex;\n\tmargin-top: 0.5em;\n\tfont-size: 1em;\n\tcolor: gray;\n}\n\n.indent {\n\tpadding-left: 3ex;\n}\n\nh1, h2, h3, h4, h5, h6, pre, table, img {\n\tpage-break-after: avoid;\n}\n\n.center {\n\ttext-align: center;\n}\n\n.big {\n\tfont-size: 1.5em;\n}\n\nfigcaption {\n\ttext-align: center;\n\tfont-style: italic;\n\tfont-size: 0.8em;\n}\n\nh1 > small {\n\tdisplay: block;\n\tfont-size: 0.6em;\n\tfont-weight: normal;\n\tcolor: gray;\n\tmargin-top: 0.4em;\n}\n\n.katex-html {\n\tfont-size: 0.8em;\n}\n\n.columns {\n\tdisplay: grid;\n\tgrid-template-columns: 1fr 1fr;\n\tgrid-template-areas: \"left right\";\n\tgrid-column-gap: 10px;\n\talign-items: center;\n}\n\n.wide-left {\n\tgrid-template-columns: 1.61803398875fr 1fr;\n}\n\n.wide-rigth {\n\tgrid-template-columns: 1fr 1.61803398875fr;\n}\n\n.left {\n\tgrid-area: left;\n}\n\n.right {\n\tgrid-area: right;\n}\n\nli > ul {\n\tmargin-top: 1em;\n}\n";
  styleInject(css);

  var css$1 = "/* PrismJS 1.15.0\nhttps://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+python&plugins=line-numbers+normalize-whitespace */\n/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tcolor: black;\n\tbackground: none;\n\ttext-shadow: 0 1px white;\n\tfont-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\npre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\npre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\n@media print {\n\tcode[class*=\"language-\"],\n\tpre[class*=\"language-\"] {\n\t\ttext-shadow: none;\n\t}\n}\n\n/* Code blocks */\npre[class*=\"language-\"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tbackground: #f5f2f0;\n}\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n\tpadding: .1em;\n\tborder-radius: .3em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: slategray;\n}\n\n.token.punctuation {\n\tcolor: #999;\n}\n\n.namespace {\n\topacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n\tcolor: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n\tcolor: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n\tcolor: #9a6e3a;\n\tbackground: hsla(0, 0%, 100%, .5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n\tcolor: #07a;\n}\n\n.token.function,\n.token.class-name {\n\tcolor: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n\tcolor: #e90;\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n\npre[class*=\"language-\"].line-numbers {\n\tposition: relative;\n\tpadding-left: 3.8em;\n\tcounter-reset: linenumber;\n}\n\npre[class*=\"language-\"].line-numbers > code {\n\tposition: relative;\n\twhite-space: inherit;\n}\n\n.line-numbers .line-numbers-rows {\n\tposition: absolute;\n\tpointer-events: none;\n\ttop: 0;\n\tfont-size: 100%;\n\tleft: -3.8em;\n\twidth: 3em; /* works for line-numbers below 1000 lines */\n\tletter-spacing: -1px;\n\tborder-right: 1px solid #999;\n\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\n}\n\n\t.line-numbers-rows > span {\n\t\tpointer-events: none;\n\t\tdisplay: block;\n\t\tcounter-increment: linenumber;\n\t}\n\n\t\t.line-numbers-rows > span:before {\n\t\t\tcontent: counter(linenumber);\n\t\t\tcolor: #999;\n\t\t\tdisplay: block;\n\t\t\tpadding-right: 0.8em;\n\t\t\ttext-align: right;\n\t\t}\n\n";
  styleInject(css$1);

  /* PrismJS 1.15.0
  https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+python&plugins=line-numbers+normalize-whitespace */
  var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
      Prism = function () {
    var e = /\blang(?:uage)?-([\w-]+)\b/i,
        t = 0,
        n = _self.Prism = {
      manual: _self.Prism && _self.Prism.manual,
      disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
      util: {
        encode: function (e) {
          return e instanceof r ? new r(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
        },
        type: function (e) {
          return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
        },
        objId: function (e) {
          return e.__id || Object.defineProperty(e, "__id", {
            value: ++t
          }), e.__id;
        },
        clone: function (e, t) {
          var r = n.util.type(e);

          switch (t = t || {}, r) {
            case "Object":
              if (t[n.util.objId(e)]) return t[n.util.objId(e)];
              var a = {};
              t[n.util.objId(e)] = a;

              for (var l in e) e.hasOwnProperty(l) && (a[l] = n.util.clone(e[l], t));

              return a;

            case "Array":
              if (t[n.util.objId(e)]) return t[n.util.objId(e)];
              var a = [];
              return t[n.util.objId(e)] = a, e.forEach(function (e, r) {
                a[r] = n.util.clone(e, t);
              }), a;
          }

          return e;
        }
      },
      languages: {
        extend: function (e, t) {
          var r = n.util.clone(n.languages[e]);

          for (var a in t) r[a] = t[a];

          return r;
        },
        insertBefore: function (e, t, r, a) {
          a = a || n.languages;
          var l = a[e];

          if (2 == arguments.length) {
            r = arguments[1];

            for (var i in r) r.hasOwnProperty(i) && (l[i] = r[i]);

            return l;
          }

          var o = {};

          for (var s in l) if (l.hasOwnProperty(s)) {
            if (s == t) for (var i in r) r.hasOwnProperty(i) && (o[i] = r[i]);
            o[s] = l[s];
          }

          var u = a[e];
          return a[e] = o, n.languages.DFS(n.languages, function (t, n) {
            n === u && t != e && (this[t] = o);
          }), o;
        },
        DFS: function (e, t, r, a) {
          a = a || {};

          for (var l in e) e.hasOwnProperty(l) && (t.call(e, l, e[l], r || l), "Object" !== n.util.type(e[l]) || a[n.util.objId(e[l])] ? "Array" !== n.util.type(e[l]) || a[n.util.objId(e[l])] || (a[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, l, a)) : (a[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, null, a)));
        }
      },
      plugins: {},
      highlightAll: function (e, t) {
        n.highlightAllUnder(document, e, t);
      },
      highlightAllUnder: function (e, t, r) {
        var a = {
          callback: r,
          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        };
        n.hooks.run("before-highlightall", a);

        for (var l, i = a.elements || e.querySelectorAll(a.selector), o = 0; l = i[o++];) n.highlightElement(l, t === !0, a.callback);
      },
      highlightElement: function (t, r, a) {
        for (var l, i, o = t; o && !e.test(o.className);) o = o.parentNode;

        o && (l = (o.className.match(e) || [, ""])[1].toLowerCase(), i = n.languages[l]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, t.parentNode && (o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l));
        var s = t.textContent,
            u = {
          element: t,
          language: l,
          grammar: i,
          code: s
        };
        if (n.hooks.run("before-sanity-check", u), !u.code || !u.grammar) return u.code && (n.hooks.run("before-highlight", u), u.element.textContent = u.code, n.hooks.run("after-highlight", u)), n.hooks.run("complete", u), void 0;

        if (n.hooks.run("before-highlight", u), r && _self.Worker) {
          var g = new Worker(n.filename);
          g.onmessage = function (e) {
            u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, a && a.call(u.element), n.hooks.run("after-highlight", u), n.hooks.run("complete", u);
          }, g.postMessage(JSON.stringify({
            language: u.language,
            code: u.code,
            immediateClose: !0
          }));
        } else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, a && a.call(t), n.hooks.run("after-highlight", u), n.hooks.run("complete", u);
      },
      highlight: function (e, t, a) {
        var l = {
          code: e,
          grammar: t,
          language: a
        };
        return n.hooks.run("before-tokenize", l), l.tokens = n.tokenize(l.code, l.grammar), n.hooks.run("after-tokenize", l), r.stringify(n.util.encode(l.tokens), l.language);
      },
      matchGrammar: function (e, t, r, a, l, i, o) {
        var s = n.Token;

        for (var u in r) if (r.hasOwnProperty(u) && r[u]) {
          if (u == o) return;
          var g = r[u];
          g = "Array" === n.util.type(g) ? g : [g];

          for (var c = 0; c < g.length; ++c) {
            var h = g[c],
                f = h.inside,
                d = !!h.lookbehind,
                m = !!h.greedy,
                p = 0,
                y = h.alias;

            if (m && !h.pattern.global) {
              var v = h.pattern.toString().match(/[imuy]*$/)[0];
              h.pattern = RegExp(h.pattern.source, v + "g");
            }

            h = h.pattern || h;

            for (var b = a, k = l; b < t.length; k += t[b].length, ++b) {
              var w = t[b];
              if (t.length > e.length) return;

              if (!(w instanceof s)) {
                if (m && b != t.length - 1) {
                  h.lastIndex = k;

                  var _ = h.exec(e);

                  if (!_) break;

                  for (var j = _.index + (d ? _[1].length : 0), P = _.index + _[0].length, A = b, x = k, O = t.length; O > A && (P > x || !t[A].type && !t[A - 1].greedy); ++A) x += t[A].length, j >= x && (++b, k = x);

                  if (t[b] instanceof s) continue;
                  I = A - b, w = e.slice(k, x), _.index -= k;
                } else {
                  h.lastIndex = 0;

                  var _ = h.exec(w),
                      I = 1;
                }

                if (_) {
                  d && (p = _[1] ? _[1].length : 0);

                  var j = _.index + p,
                      _ = _[0].slice(p),
                      P = j + _.length,
                      N = w.slice(0, j),
                      S = w.slice(P),
                      C = [b, I];

                  N && (++b, k += N.length, C.push(N));
                  var E = new s(u, f ? n.tokenize(_, f) : _, y, _, m);
                  if (C.push(E), S && C.push(S), Array.prototype.splice.apply(t, C), 1 != I && n.matchGrammar(e, t, r, b, k, !0, u), i) break;
                } else if (i) break;
              }
            }
          }
        }
      },
      tokenize: function (e, t) {
        var r = [e],
            a = t.rest;

        if (a) {
          for (var l in a) t[l] = a[l];

          delete t.rest;
        }

        return n.matchGrammar(e, r, t, 0, 0, !1), r;
      },
      hooks: {
        all: {},
        add: function (e, t) {
          var r = n.hooks.all;
          r[e] = r[e] || [], r[e].push(t);
        },
        run: function (e, t) {
          var r = n.hooks.all[e];
          if (r && r.length) for (var a, l = 0; a = r[l++];) a(t);
        }
      }
    },
        r = n.Token = function (e, t, n, r, a) {
      this.type = e, this.content = t, this.alias = n, this.length = 0 | (r || "").length, this.greedy = !!a;
    };

    if (r.stringify = function (e, t, a) {
      if ("string" == typeof e) return e;
      if ("Array" === n.util.type(e)) return e.map(function (n) {
        return r.stringify(n, t, e);
      }).join("");
      var l = {
        type: e.type,
        content: r.stringify(e.content, t, a),
        tag: "span",
        classes: ["token", e.type],
        attributes: {},
        language: t,
        parent: a
      };

      if (e.alias) {
        var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
        Array.prototype.push.apply(l.classes, i);
      }

      n.hooks.run("wrap", l);
      var o = Object.keys(l.attributes).map(function (e) {
        return e + '="' + (l.attributes[e] || "").replace(/"/g, "&quot;") + '"';
      }).join(" ");
      return "<" + l.tag + ' class="' + l.classes.join(" ") + '"' + (o ? " " + o : "") + ">" + l.content + "</" + l.tag + ">";
    }, !_self.document) return _self.addEventListener ? (n.disableWorkerMessageHandler || _self.addEventListener("message", function (e) {
      var t = JSON.parse(e.data),
          r = t.language,
          a = t.code,
          l = t.immediateClose;
      _self.postMessage(n.highlight(a, n.languages[r], r)), l && _self.close();
    }, !1), _self.Prism) : _self.Prism;
    var a = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
    return a && (n.filename = a.src, n.manual || a.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener("DOMContentLoaded", n.highlightAll))), _self.Prism;
  }();

  "undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
  Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: /<!DOCTYPE[\s\S]+?>/i,
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
      greedy: !0,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/i,
          inside: {
            punctuation: /^<\/?/,
            namespace: /^[^\s>\/:]+:/
          }
        },
        "attr-value": {
          pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
          inside: {
            punctuation: [/^=/, {
              pattern: /(^|[^\\])["']/,
              lookbehind: !0
            }]
          }
        },
        punctuation: /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: {
            namespace: /^[^\s>\/:]+:/
          }
        }
      }
    },
    entity: /&#?[\da-z]{1,8};/i
  }, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.hooks.add("wrap", function (a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"));
  }), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
  Prism.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
      inside: {
        rule: /@[\w-]+/
      }
    },
    url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: /[^{}\s][^{};]*?(?=\s*\{)/,
    string: {
      pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0
    },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /\B!important\b/i,
    "function": /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:]/
  }, Prism.languages.css.atrule.inside.rest = Prism.languages.css, Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
    style: {
      pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
      lookbehind: !0,
      inside: Prism.languages.css,
      alias: "language-css",
      greedy: !0
    }
  }), Prism.languages.insertBefore("inside", "attr-value", {
    "style-attr": {
      pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
      inside: {
        "attr-name": {
          pattern: /^\s*style/i,
          inside: Prism.languages.markup.tag.inside
        },
        punctuation: /^\s*=\s*['"]|['"]\s*$/,
        "attr-value": {
          pattern: /.+/i,
          inside: Prism.languages.css
        }
      },
      alias: "language-css"
    }
  }, Prism.languages.markup.tag));
  Prism.languages.clike = {
    comment: [{
      pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
      lookbehind: !0
    }, {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: !0,
      greedy: !0
    }],
    string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0
    },
    "class-name": {
      pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
      lookbehind: !0,
      inside: {
        punctuation: /[.\\]/
      }
    },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    "boolean": /\b(?:true|false)\b/,
    "function": /[a-z0-9_]+(?=\()/i,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/
  };
  Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [Prism.languages.clike["class-name"], /[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/],
    keyword: [{
      pattern: /((?:^|})\s*)(?:catch|finally)\b/,
      lookbehind: !0
    }, /\b(?:as|async|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/],
    number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    "function": /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\(|\.(?:apply|bind|call)\()/,
    operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
  }), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
      lookbehind: !0,
      greedy: !0
    },
    "function-variable": {
      pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
      alias: "function"
    },
    constant: /\b[A-Z][A-Z\d_]*\b/
  }), Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
      pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
      greedy: !0,
      inside: {
        interpolation: {
          pattern: /\${[^}]+}/,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\${|}$/,
              alias: "punctuation"
            },
            rest: Prism.languages.javascript
          }
        },
        string: /[\s\S]+/
      }
    }
  }), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
      pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
      lookbehind: !0,
      inside: Prism.languages.javascript,
      alias: "language-javascript",
      greedy: !0
    }
  }), Prism.languages.js = Prism.languages.javascript;
  Prism.languages.python = {
    comment: {
      pattern: /(^|[^\\])#.*/,
      lookbehind: !0
    },
    "triple-quoted-string": {
      pattern: /("""|''')[\s\S]+?\1/,
      greedy: !0,
      alias: "string"
    },
    string: {
      pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
      greedy: !0
    },
    "function": {
      pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
      lookbehind: !0
    },
    "class-name": {
      pattern: /(\bclass\s+)\w+/i,
      lookbehind: !0
    },
    keyword: /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|pass|print|raise|return|try|while|with|yield)\b/,
    builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    "boolean": /\b(?:True|False|None)\b/,
    number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
    punctuation: /[{}[\];(),.:]/
  };
  !function () {
    if ("undefined" != typeof self && self.Prism && self.document) {
      var e = "line-numbers",
          t = /\n(?!$)/g,
          n = function (e) {
        var n = r(e),
            s = n["white-space"];

        if ("pre-wrap" === s || "pre-line" === s) {
          var l = e.querySelector("code"),
              i = e.querySelector(".line-numbers-rows"),
              a = e.querySelector(".line-numbers-sizer"),
              o = l.textContent.split(t);
          a || (a = document.createElement("span"), a.className = "line-numbers-sizer", l.appendChild(a)), a.style.display = "block", o.forEach(function (e, t) {
            a.textContent = e || "\n";
            var n = a.getBoundingClientRect().height;
            i.children[t].style.height = n + "px";
          }), a.textContent = "", a.style.display = "none";
        }
      },
          r = function (e) {
        return e ? window.getComputedStyle ? getComputedStyle(e) : e.currentStyle || null : null;
      };

      window.addEventListener("resize", function () {
        Array.prototype.forEach.call(document.querySelectorAll("pre." + e), n);
      }), Prism.hooks.add("complete", function (e) {
        if (e.code) {
          var r = e.element.parentNode,
              s = /\s*\bline-numbers\b\s*/;

          if (r && /pre/i.test(r.nodeName) && (s.test(r.className) || s.test(e.element.className)) && !e.element.querySelector(".line-numbers-rows")) {
            s.test(e.element.className) && (e.element.className = e.element.className.replace(s, " ")), s.test(r.className) || (r.className += " line-numbers");
            var l,
                i = e.code.match(t),
                a = i ? i.length + 1 : 1,
                o = new Array(a + 1);
            o = o.join("<span></span>"), l = document.createElement("span"), l.setAttribute("aria-hidden", "true"), l.className = "line-numbers-rows", l.innerHTML = o, r.hasAttribute("data-start") && (r.style.counterReset = "linenumber " + (parseInt(r.getAttribute("data-start"), 10) - 1)), e.element.appendChild(l), n(r), Prism.hooks.run("line-numbers", e);
          }
        }
      }), Prism.hooks.add("line-numbers", function (e) {
        e.plugins = e.plugins || {}, e.plugins.lineNumbers = !0;
      }), Prism.plugins.lineNumbers = {
        getLine: function (t, n) {
          if ("PRE" === t.tagName && t.classList.contains(e)) {
            var r = t.querySelector(".line-numbers-rows"),
                s = parseInt(t.getAttribute("data-start"), 10) || 1,
                l = s + (r.children.length - 1);
            s > n && (n = s), n > l && (n = l);
            var i = n - s;
            return r.children[i];
          }
        }
      };
    }
  }();
  !function () {
    function e(e) {
      this.defaults = r({}, e);
    }

    function n(e) {
      return e.replace(/-(\w)/g, function (e, n) {
        return n.toUpperCase();
      });
    }

    function t(e) {
      for (var n = 0, t = 0; t < e.length; ++t) e.charCodeAt(t) == "	".charCodeAt(0) && (n += 3);

      return e.length + n;
    }

    var r = Object.assign || function (e, n) {
      for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);

      return e;
    };

    e.prototype = {
      setDefaults: function (e) {
        this.defaults = r(this.defaults, e);
      },
      normalize: function (e, t) {
        t = r(this.defaults, t);

        for (var i in t) {
          var o = n(i);
          "normalize" !== i && "setDefaults" !== o && t[i] && this[o] && (e = this[o].call(this, e, t[i]));
        }

        return e;
      },
      leftTrim: function (e) {
        return e.replace(/^\s+/, "");
      },
      rightTrim: function (e) {
        return e.replace(/\s+$/, "");
      },
      tabsToSpaces: function (e, n) {
        return n = 0 | n || 4, e.replace(/\t/g, new Array(++n).join(" "));
      },
      spacesToTabs: function (e, n) {
        return n = 0 | n || 4, e.replace(RegExp(" {" + n + "}", "g"), "	");
      },
      removeTrailing: function (e) {
        return e.replace(/\s*?$/gm, "");
      },
      removeInitialLineFeed: function (e) {
        return e.replace(/^(?:\r?\n|\r)/, "");
      },
      removeIndent: function (e) {
        var n = e.match(/^[^\S\n\r]*(?=\S)/gm);
        return n && n[0].length ? (n.sort(function (e, n) {
          return e.length - n.length;
        }), n[0].length ? e.replace(RegExp("^" + n[0], "gm"), "") : e) : e;
      },
      indent: function (e, n) {
        return e.replace(/^[^\S\n\r]*(?=\S)/gm, new Array(++n).join("	") + "$&");
      },
      breakLines: function (e, n) {
        n = n === !0 ? 80 : 0 | n || 80;

        for (var r = e.split("\n"), i = 0; i < r.length; ++i) if (!(t(r[i]) <= n)) {
          for (var o = r[i].split(/(\s+)/g), a = 0, s = 0; s < o.length; ++s) {
            var l = t(o[s]);
            a += l, a > n && (o[s] = "\n" + o[s], a = l);
          }

          r[i] = o.join("");
        }

        return r.join("\n");
      }
    }, "undefined" != typeof module && module.exports && (module.exports = e), "undefined" != typeof Prism && (Prism.plugins.NormalizeWhitespace = new e({
      "remove-trailing": !0,
      "remove-indent": !0,
      "left-trim": !0,
      "right-trim": !0
    }), Prism.hooks.add("before-sanity-check", function (e) {
      var n = Prism.plugins.NormalizeWhitespace;

      if (!e.settings || e.settings["whitespace-normalization"] !== !1) {
        if ((!e.element || !e.element.parentNode) && e.code) return e.code = n.normalize(e.code, e.settings), void 0;
        var t = e.element.parentNode,
            r = /\bno-whitespace-normalization\b/;

        if (e.code && t && "pre" === t.nodeName.toLowerCase() && !r.test(t.className) && !r.test(e.element.className)) {
          for (var i = t.childNodes, o = "", a = "", s = !1, l = 0; l < i.length; ++l) {
            var c = i[l];
            c == e.element ? s = !0 : "#text" === c.nodeName && (s ? a += c.nodeValue : o += c.nodeValue, t.removeChild(c), --l);
          }

          if (e.element.children.length && Prism.plugins.KeepMarkup) {
            var u = o + e.element.innerHTML + a;
            e.element.innerHTML = n.normalize(u, e.settings), e.code = e.element.textContent;
          } else e.code = o + e.code + a, e.code = n.normalize(e.code, e.settings);
        }
      }
    }));
  }();

  const loadScript = url => new Promise(resolve => {
    const script = document.createElement('script');

    script.onload = () => {
      resolve();
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

  loadCSS("https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css");
  loadCSS("https://fonts.googleapis.com/css?family=Roboto|Roboto+Condensed|Roboto+Mono|Roboto+Slab");
  loadCSS("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css");
  const scripts = [];
  scripts.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"));
  scripts.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"));
  scripts.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"));
  scripts.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/contrib/auto-render.min.js"));
  const deckOk = Promise.all(scripts).then(() => loadScript("https://cdnjs.cloudflare.com/ajax/libs/deck.js/1.1.0/core/deck.core.js"));
  window.addEventListener("DOMContentLoaded", event => {
    console.log("DOM Loaded and Parsed");
    document.body.classList.add('mode-document');
    Prism.highlightAll();
    deckOk.then(() => {
      renderMathInElement(document.body);
      $.deck('section');
      $(document).bind('deck.change', function (event, from, to) {
        $('body').scrollTop(0);
      });
      $(document).keypress(function (event) {
        if (event.key === 'm') {
          $('body').toggleClass('mode-deck');
          $('body').toggleClass('mode-document');
        }
      });
    });
  });

}());

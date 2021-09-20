var Deck = (function (exports) {
	'use strict';

	

	function ___$insertStyle(css) {
	  if (!css) {
	    return;
	  }
	  if (typeof window === 'undefined') {
	    return;
	  }

	  var style = document.createElement('style');

	  style.setAttribute('type', 'text/css');
	  style.innerHTML = css;
	  document.head.appendChild(style);
	  return css;
	}

	const loadScript = url => new Promise(resolve => {
		const script = document.createElement('script');
		const callback = () => {
			resolve();
		};
		script.onload = callback;
		script.onreadystatechange = callback;
		
		script.setAttribute("src", url);
		document.head.insertBefore(script , null);
	});

	const ready = new Promise((resolve) => {
		if (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive") {
			setTimeout(resolve, 1);
		}
		else {
			document.addEventListener('DOMContentLoaded', () => {
				resolve();
			});
		}
	});

	ready.then(() => {
		console.log('DOM Ready');
	});

	function DOMReady() {
		return ready
	}

	___$insertStyle("@import url(\"https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Slab&family=Source+Code+Pro&display=swap\");\n@import url(\"https://fonts.googleapis.com/icon?family=Material+Icons\");\n@page {\n  margin: 1cm;\n}\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: \"Roboto\", sans-serif;\n  text-rendering: optimizeLegibility;\n  margin: 0;\n  padding: 0;\n  background-color: white;\n}\n\ncode {\n  font-size: 0.875em;\n  color: #d63384;\n  word-wrap: break-word;\n  font-family: \"Source Code Pro\", monospace;\n}\n\nh3 {\n  font-size: 1em;\n  font-variant: small-caps;\n  font-weight: bolder;\n}\n\nstrong {\n  font-weight: normal;\n  color: red;\n}\n\nli, p {\n  margin: 0 0 1em 0;\n  text-align: justify;\n}\n\nli small {\n  display: block;\n  padding-left: 3ex;\n  margin-top: 0.5em;\n  font-size: 1em;\n  color: gray;\n}\n\nli > ul {\n  margin-top: 0.5em;\n}\n\n.indent {\n  padding-left: 3ex;\n}\n\nh1 {\n  cursor: pointer;\n}\n\nh1, h2, h3, h4, h5, h6, pre, table, img {\n  break-inside: avoid-page;\n}\n\n/* hack that avoid page break after h2 et h3 */\nh2::after, h3::after, h4::after {\n  content: \"\";\n  display: block;\n  height: 100px;\n  margin-bottom: -100px;\n}\n\n.center {\n  text-align: center;\n}\n\n.big {\n  font-size: 1.5em;\n}\n\nh1 > small {\n  display: block;\n  font-size: 0.6em;\n  font-weight: normal;\n  color: gray;\n  margin-top: 0.4em;\n}\n\n.row {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  column-gap: 10px;\n  justify-items: stretch;\n  align-items: stretch;\n  justify-content: stretch;\n  align-content: stretch;\n}\n.row .span2 {\n  grid-column-end: span 2;\n}\n.row .span3 {\n  grid-column-end: span 3;\n}\n.row .span4 {\n  grid-column-end: span 4;\n}\n.row .span5 {\n  grid-column-end: span 5;\n}\n.row .span6 {\n  grid-column-end: span 6;\n}\n.row .span7 {\n  grid-column-end: span 7;\n}\n.row .span8 {\n  grid-column-end: span 8;\n}\n.row .span9 {\n  grid-column-end: span 9;\n}\n.row .span10 {\n  grid-column-end: span 10;\n}\n.row .span11 {\n  grid-column-end: span 11;\n}\n\nfigure {\n  margin: 0 0 1em 0;\n  padding: 0;\n  text-align: center;\n}\nfigure figcaption {\n  text-align: center;\n  font-style: italic;\n  font-size: 0.8em;\n}\nfigure img {\n  max-width: 100%;\n}\nfigure img.half {\n  width: 50%;\n}\nfigure img.third {\n  width: 33%;\n}\nfigure img.third2 {\n  width: 66%;\n}\nfigure img.fourth {\n  width: 25%;\n}\nfigure img.fourth3 {\n  width: 75%;\n}\nfigure img.zoom {\n  width: 75%;\n}\nfigure img.max {\n  width: 100%;\n}\n\n.terminal {\n  background-color: darkslategray;\n  color: white;\n  font-family: consolas, monospace;\n  white-space: pre;\n  padding: 1rem;\n  font-size: 0.9em;\n  margin-bottom: 1em;\n}\n.terminal::before {\n  content: \"Terminal\";\n  display: block;\n  background-color: black;\n  text-align: center;\n  margin: -1rem;\n  padding: 0.5rem;\n  margin-bottom: 1rem;\n}\n\n.file-title {\n  margin-bottom: -1.2em;\n  font-family: consolas, monospace;\n  font-size: 0.9em;\n  color: white;\n  padding: 0.5rem;\n  text-align: center;\n  background-color: #686868;\n}\n\n.middle {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\ntable {\n  border: 2px solid black;\n  border-collapse: collapse;\n  margin-left: auto;\n  margin-right: auto;\n}\n\ntd, th {\n  border: 1px solid #666;\n  text-align: center;\n  padding: 0.2em 1em;\n}\n\nth {\n  border-bottom: 2px solid black;\n}\n\n.mode-deck .document-only {\n  display: none;\n}\n.mode-deck .deck-before, .mode-deck .deck-previous, .mode-deck .deck-next, .mode-deck .deck-after {\n  display: none;\n}\n.mode-deck .deck-current {\n  display: flex;\n  font-size: 3.5vh;\n  width: 133vh;\n  min-height: 100vh;\n  flex-direction: column;\n  justify-content: center;\n  margin: 0 auto;\n  padding: 12vh 4vh 4vh 4vh;\n}\n.mode-deck .deck-current h2 {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  margin: 0;\n  padding: 2vh 10vh;\n  font-family: \"Roboto Slab\", serif;\n  font-size: 1.2em;\n  color: white;\n  background-color: green;\n  text-align: right;\n  z-index: 1000;\n}\n.mode-deck .deck-current h1 {\n  font-family: \"Roboto Slab\", serif;\n  font-size: 2em;\n}\n.mode-deck .deck-current > * {\n  flex: 0 0 auto;\n}\n.mode-deck .deck-current.full {\n  width: 100vw;\n  height: 100vh;\n  padding: 0;\n}\n.mode-deck .deck-current.full h2 {\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.mode-deck .deck-current.full img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  margin: 0;\n}\n.mode-deck .deck-current.code {\n  width: 95%;\n}\n.mode-deck .deck-current.code::before {\n  position: fixed;\n  background-color: #f0f0f0;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  content: \"\";\n  z-index: 10;\n  display: block;\n}\n.mode-deck .deck-current.code::after {\n  content: \"\";\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 3%;\n  background-color: #bbb;\n  z-index: 20;\n}\n.mode-deck .deck-current.code > * {\n  z-index: 100;\n}\n.mode-deck .deck-current.code h2 {\n  z-index: 1000;\n  background-color: #555;\n}\n\n.mode-document {\n  max-width: 60ex;\n  margin: 0 auto;\n}\n.mode-document .deck-only {\n  display: none;\n}\n.mode-document h2 {\n  font-size: 1.1em;\n  margin-top: 1.5em;\n}\n.mode-document h1 {\n  text-align: right;\n  border-bottom: 1px solid lightgray;\n  padding: 1em 0;\n}\n.mode-document .full img {\n  max-width: 100%;\n}\n\nbody.mode-document {\n  padding: 1rem;\n}\n\n@media (print) {\n  body.mode-document {\n    padding: 0;\n  }\n}");

	___$insertStyle("/*\n\nOriginal highlight.js style (c) Ivan Sagalaev <maniac@softwaremaniacs.org>\n\n*/\npre {\n  tab-size: 3;\n}\n\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 1em 0.8em;\n  background: #F0F0F0;\n  border-radius: 4px;\n}\n\n/* Base color: saturation 0; */\n.hljs,\n.hljs-subst {\n  color: #444;\n}\n\n.hljs-comment {\n  color: #888888;\n}\n\n.hljs-keyword,\n.hljs-attribute,\n.hljs-selector-tag,\n.hljs-meta-keyword,\n.hljs-doctag,\n.hljs-name {\n  font-weight: bold;\n}\n\n/* User color: hue: 0 */\n.hljs-type,\n.hljs-string,\n.hljs-number,\n.hljs-selector-id,\n.hljs-selector-class,\n.hljs-quote,\n.hljs-template-tag,\n.hljs-deletion {\n  color: #880000;\n}\n\n.hljs-title,\n.hljs-section {\n  color: #880000;\n  font-weight: bold;\n}\n\n.hljs-regexp,\n.hljs-symbol,\n.hljs-variable,\n.hljs-template-variable,\n.hljs-link,\n.hljs-selector-attr,\n.hljs-selector-pseudo {\n  color: #BC6060;\n}\n\n/* Language color: hue: 90; */\n.hljs-literal {\n  color: #78A960;\n}\n\n.hljs-built_in,\n.hljs-bullet,\n.hljs-code,\n.hljs-addition {\n  color: #397300;\n}\n\n/* Meta color: hue: 200 */\n.hljs-meta {\n  color: #1f7199;\n}\n\n.hljs-meta-string {\n  color: #4d99bf;\n}\n\n/* Misc effects */\n.hljs-emphasis {\n  font-style: italic;\n}\n\n.hljs-strong {\n  font-weight: bold;\n}");

	function deepFreeze(obj) {
	    if (obj instanceof Map) {
	        obj.clear = obj.delete = obj.set = function () {
	            throw new Error('map is read-only');
	        };
	    } else if (obj instanceof Set) {
	        obj.add = obj.clear = obj.delete = function () {
	            throw new Error('set is read-only');
	        };
	    }

	    // Freeze self
	    Object.freeze(obj);

	    Object.getOwnPropertyNames(obj).forEach(function (name) {
	        var prop = obj[name];

	        // Freeze prop if it is an object
	        if (typeof prop == 'object' && !Object.isFrozen(prop)) {
	            deepFreeze(prop);
	        }
	    });

	    return obj;
	}

	var deepFreezeEs6 = deepFreeze;
	var _default = deepFreeze;
	deepFreezeEs6.default = _default;

	class Response {
	  /**
	   * @param {CompiledMode} mode
	   */
	  constructor(mode) {
	    // eslint-disable-next-line no-undefined
	    if (mode.data === undefined) mode.data = {};

	    this.data = mode.data;
	  }

	  ignoreMatch() {
	    this.ignore = true;
	  }
	}

	/**
	 * @param {string} value
	 * @returns {string}
	 */
	function escapeHTML(value) {
	  return value
	    .replace(/&/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;')
	    .replace(/'/g, '&#x27;');
	}

	/**
	 * performs a shallow merge of multiple objects into one
	 *
	 * @template T
	 * @param {T} original
	 * @param {Record<string,any>[]} objects
	 * @returns {T} a single new object
	 */
	function inherit(original, ...objects) {
	  /** @type Record<string,any> */
	  const result = Object.create(null);

	  for (const key in original) {
	    result[key] = original[key];
	  }
	  objects.forEach(function(obj) {
	    for (const key in obj) {
	      result[key] = obj[key];
	    }
	  });
	  return /** @type {T} */ (result);
	}

	/**
	 * @typedef {object} Renderer
	 * @property {(text: string) => void} addText
	 * @property {(node: Node) => void} openNode
	 * @property {(node: Node) => void} closeNode
	 * @property {() => string} value
	 */

	/** @typedef {{kind?: string, sublanguage?: boolean}} Node */
	/** @typedef {{walk: (r: Renderer) => void}} Tree */
	/** */

	const SPAN_CLOSE = '</span>';

	/**
	 * Determines if a node needs to be wrapped in <span>
	 *
	 * @param {Node} node */
	const emitsWrappingTags = (node) => {
	  return !!node.kind;
	};

	/** @type {Renderer} */
	class HTMLRenderer {
	  /**
	   * Creates a new HTMLRenderer
	   *
	   * @param {Tree} parseTree - the parse tree (must support `walk` API)
	   * @param {{classPrefix: string}} options
	   */
	  constructor(parseTree, options) {
	    this.buffer = "";
	    this.classPrefix = options.classPrefix;
	    parseTree.walk(this);
	  }

	  /**
	   * Adds texts to the output stream
	   *
	   * @param {string} text */
	  addText(text) {
	    this.buffer += escapeHTML(text);
	  }

	  /**
	   * Adds a node open to the output stream (if needed)
	   *
	   * @param {Node} node */
	  openNode(node) {
	    if (!emitsWrappingTags(node)) return;

	    let className = node.kind;
	    if (!node.sublanguage) {
	      className = `${this.classPrefix}${className}`;
	    }
	    this.span(className);
	  }

	  /**
	   * Adds a node close to the output stream (if needed)
	   *
	   * @param {Node} node */
	  closeNode(node) {
	    if (!emitsWrappingTags(node)) return;

	    this.buffer += SPAN_CLOSE;
	  }

	  /**
	   * returns the accumulated buffer
	  */
	  value() {
	    return this.buffer;
	  }

	  // helpers

	  /**
	   * Builds a span element
	   *
	   * @param {string} className */
	  span(className) {
	    this.buffer += `<span class="${className}">`;
	  }
	}

	/** @typedef {{kind?: string, sublanguage?: boolean, children: Node[]} | string} Node */
	/** @typedef {{kind?: string, sublanguage?: boolean, children: Node[]} } DataNode */
	/**  */

	class TokenTree {
	  constructor() {
	    /** @type DataNode */
	    this.rootNode = { children: [] };
	    this.stack = [this.rootNode];
	  }

	  get top() {
	    return this.stack[this.stack.length - 1];
	  }

	  get root() { return this.rootNode; }

	  /** @param {Node} node */
	  add(node) {
	    this.top.children.push(node);
	  }

	  /** @param {string} kind */
	  openNode(kind) {
	    /** @type Node */
	    const node = { kind, children: [] };
	    this.add(node);
	    this.stack.push(node);
	  }

	  closeNode() {
	    if (this.stack.length > 1) {
	      return this.stack.pop();
	    }
	    // eslint-disable-next-line no-undefined
	    return undefined;
	  }

	  closeAllNodes() {
	    while (this.closeNode());
	  }

	  toJSON() {
	    return JSON.stringify(this.rootNode, null, 4);
	  }

	  /**
	   * @typedef { import("./html_renderer").Renderer } Renderer
	   * @param {Renderer} builder
	   */
	  walk(builder) {
	    // this does not
	    return this.constructor._walk(builder, this.rootNode);
	    // this works
	    // return TokenTree._walk(builder, this.rootNode);
	  }

	  /**
	   * @param {Renderer} builder
	   * @param {Node} node
	   */
	  static _walk(builder, node) {
	    if (typeof node === "string") {
	      builder.addText(node);
	    } else if (node.children) {
	      builder.openNode(node);
	      node.children.forEach((child) => this._walk(builder, child));
	      builder.closeNode(node);
	    }
	    return builder;
	  }

	  /**
	   * @param {Node} node
	   */
	  static _collapse(node) {
	    if (typeof node === "string") return;
	    if (!node.children) return;

	    if (node.children.every(el => typeof el === "string")) {
	      // node.text = node.children.join("");
	      // delete node.children;
	      node.children = [node.children.join("")];
	    } else {
	      node.children.forEach((child) => {
	        TokenTree._collapse(child);
	      });
	    }
	  }
	}

	/**
	  Currently this is all private API, but this is the minimal API necessary
	  that an Emitter must implement to fully support the parser.

	  Minimal interface:

	  - addKeyword(text, kind)
	  - addText(text)
	  - addSublanguage(emitter, subLanguageName)
	  - finalize()
	  - openNode(kind)
	  - closeNode()
	  - closeAllNodes()
	  - toHTML()

	*/

	/**
	 * @implements {Emitter}
	 */
	class TokenTreeEmitter extends TokenTree {
	  /**
	   * @param {*} options
	   */
	  constructor(options) {
	    super();
	    this.options = options;
	  }

	  /**
	   * @param {string} text
	   * @param {string} kind
	   */
	  addKeyword(text, kind) {
	    if (text === "") { return; }

	    this.openNode(kind);
	    this.addText(text);
	    this.closeNode();
	  }

	  /**
	   * @param {string} text
	   */
	  addText(text) {
	    if (text === "") { return; }

	    this.add(text);
	  }

	  /**
	   * @param {Emitter & {root: DataNode}} emitter
	   * @param {string} name
	   */
	  addSublanguage(emitter, name) {
	    /** @type DataNode */
	    const node = emitter.root;
	    node.kind = name;
	    node.sublanguage = true;
	    this.add(node);
	  }

	  toHTML() {
	    const renderer = new HTMLRenderer(this, this.options);
	    return renderer.value();
	  }

	  finalize() {
	    return true;
	  }
	}

	/**
	 * @param {string} value
	 * @returns {RegExp}
	 * */
	function escape(value) {
	  return new RegExp(value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'm');
	}

	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function source$b(re) {
	  if (!re) return null;
	  if (typeof re === "string") return re;

	  return re.source;
	}

	/**
	 * @param {...(RegExp | string) } args
	 * @returns {string}
	 */
	function concat$a(...args) {
	  const joined = args.map((x) => source$b(x)).join("");
	  return joined;
	}

	/**
	 * Any of the passed expresssions may match
	 *
	 * Creates a huge this | this | that | that match
	 * @param {(RegExp | string)[] } args
	 * @returns {string}
	 */
	function either$3(...args) {
	  const joined = '(' + args.map((x) => source$b(x)).join("|") + ")";
	  return joined;
	}

	/**
	 * @param {RegExp} re
	 * @returns {number}
	 */
	function countMatchGroups(re) {
	  return (new RegExp(re.toString() + '|')).exec('').length - 1;
	}

	/**
	 * Does lexeme start with a regular expression match at the beginning
	 * @param {RegExp} re
	 * @param {string} lexeme
	 */
	function startsWith(re, lexeme) {
	  const match = re && re.exec(lexeme);
	  return match && match.index === 0;
	}

	// join logically computes regexps.join(separator), but fixes the
	// backreferences so they continue to match.
	// it also places each individual regular expression into it's own
	// match group, keeping track of the sequencing of those match groups
	// is currently an exercise for the caller. :-)
	/**
	 * @param {(string | RegExp)[]} regexps
	 * @param {string} separator
	 * @returns {string}
	 */
	function join(regexps, separator = "|") {
	  // backreferenceRe matches an open parenthesis or backreference. To avoid
	  // an incorrect parse, it additionally matches the following:
	  // - [...] elements, where the meaning of parentheses and escapes change
	  // - other escape sequences, so we do not misparse escape sequences as
	  //   interesting elements
	  // - non-matching or lookahead parentheses, which do not capture. These
	  //   follow the '(' with a '?'.
	  const backreferenceRe = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
	  let numCaptures = 0;
	  let ret = '';
	  for (let i = 0; i < regexps.length; i++) {
	    numCaptures += 1;
	    const offset = numCaptures;
	    let re = source$b(regexps[i]);
	    if (i > 0) {
	      ret += separator;
	    }
	    ret += "(";
	    while (re.length > 0) {
	      const match = backreferenceRe.exec(re);
	      if (match == null) {
	        ret += re;
	        break;
	      }
	      ret += re.substring(0, match.index);
	      re = re.substring(match.index + match[0].length);
	      if (match[0][0] === '\\' && match[1]) {
	        // Adjust the backreference.
	        ret += '\\' + String(Number(match[1]) + offset);
	      } else {
	        ret += match[0];
	        if (match[0] === '(') {
	          numCaptures++;
	        }
	      }
	    }
	    ret += ")";
	  }
	  return ret;
	}

	// Common regexps
	const MATCH_NOTHING_RE = /\b\B/;
	const IDENT_RE$2 = '[a-zA-Z]\\w*';
	const UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
	const NUMBER_RE = '\\b\\d+(\\.\\d+)?';
	const C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
	const BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
	const RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

	/**
	* @param { Partial<Mode> & {binary?: string | RegExp} } opts
	*/
	const SHEBANG = (opts = {}) => {
	  const beginShebang = /^#![ ]*\//;
	  if (opts.binary) {
	    opts.begin = concat$a(
	      beginShebang,
	      /.*\b/,
	      opts.binary,
	      /\b.*/);
	  }
	  return inherit({
	    className: 'meta',
	    begin: beginShebang,
	    end: /$/,
	    relevance: 0,
	    /** @type {ModeCallback} */
	    "on:begin": (m, resp) => {
	      if (m.index !== 0) resp.ignoreMatch();
	    }
	  }, opts);
	};

	// Common modes
	const BACKSLASH_ESCAPE = {
	  begin: '\\\\[\\s\\S]', relevance: 0
	};
	const APOS_STRING_MODE = {
	  className: 'string',
	  begin: '\'',
	  end: '\'',
	  illegal: '\\n',
	  contains: [BACKSLASH_ESCAPE]
	};
	const QUOTE_STRING_MODE = {
	  className: 'string',
	  begin: '"',
	  end: '"',
	  illegal: '\\n',
	  contains: [BACKSLASH_ESCAPE]
	};
	const PHRASAL_WORDS_MODE = {
	  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
	};
	/**
	 * Creates a comment mode
	 *
	 * @param {string | RegExp} begin
	 * @param {string | RegExp} end
	 * @param {Mode | {}} [modeOptions]
	 * @returns {Partial<Mode>}
	 */
	const COMMENT = function(begin, end, modeOptions = {}) {
	  const mode = inherit(
	    {
	      className: 'comment',
	      begin,
	      end,
	      contains: []
	    },
	    modeOptions
	  );
	  mode.contains.push(PHRASAL_WORDS_MODE);
	  mode.contains.push({
	    className: 'doctag',
	    begin: '(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):',
	    relevance: 0
	  });
	  return mode;
	};
	const C_LINE_COMMENT_MODE = COMMENT('//', '$');
	const C_BLOCK_COMMENT_MODE = COMMENT('/\\*', '\\*/');
	const HASH_COMMENT_MODE = COMMENT('#', '$');
	const NUMBER_MODE = {
	  className: 'number',
	  begin: NUMBER_RE,
	  relevance: 0
	};
	const C_NUMBER_MODE = {
	  className: 'number',
	  begin: C_NUMBER_RE,
	  relevance: 0
	};
	const BINARY_NUMBER_MODE = {
	  className: 'number',
	  begin: BINARY_NUMBER_RE,
	  relevance: 0
	};
	const CSS_NUMBER_MODE = {
	  className: 'number',
	  begin: NUMBER_RE + '(' +
	    '%|em|ex|ch|rem' +
	    '|vw|vh|vmin|vmax' +
	    '|cm|mm|in|pt|pc|px' +
	    '|deg|grad|rad|turn' +
	    '|s|ms' +
	    '|Hz|kHz' +
	    '|dpi|dpcm|dppx' +
	    ')?',
	  relevance: 0
	};
	const REGEXP_MODE = {
	  // this outer rule makes sure we actually have a WHOLE regex and not simply
	  // an expression such as:
	  //
	  //     3 / something
	  //
	  // (which will then blow up when regex's `illegal` sees the newline)
	  begin: /(?=\/[^/\n]*\/)/,
	  contains: [{
	    className: 'regexp',
	    begin: /\//,
	    end: /\/[gimuy]*/,
	    illegal: /\n/,
	    contains: [
	      BACKSLASH_ESCAPE,
	      {
	        begin: /\[/,
	        end: /\]/,
	        relevance: 0,
	        contains: [BACKSLASH_ESCAPE]
	      }
	    ]
	  }]
	};
	const TITLE_MODE = {
	  className: 'title',
	  begin: IDENT_RE$2,
	  relevance: 0
	};
	const UNDERSCORE_TITLE_MODE = {
	  className: 'title',
	  begin: UNDERSCORE_IDENT_RE,
	  relevance: 0
	};
	const METHOD_GUARD = {
	  // excludes method names from keyword processing
	  begin: '\\.\\s*' + UNDERSCORE_IDENT_RE,
	  relevance: 0
	};

	/**
	 * Adds end same as begin mechanics to a mode
	 *
	 * Your mode must include at least a single () match group as that first match
	 * group is what is used for comparison
	 * @param {Partial<Mode>} mode
	 */
	const END_SAME_AS_BEGIN = function(mode) {
	  return Object.assign(mode,
	    {
	      /** @type {ModeCallback} */
	      'on:begin': (m, resp) => { resp.data._beginMatch = m[1]; },
	      /** @type {ModeCallback} */
	      'on:end': (m, resp) => { if (resp.data._beginMatch !== m[1]) resp.ignoreMatch(); }
	    });
	};

	var MODES = /*#__PURE__*/Object.freeze({
	    __proto__: null,
	    MATCH_NOTHING_RE: MATCH_NOTHING_RE,
	    IDENT_RE: IDENT_RE$2,
	    UNDERSCORE_IDENT_RE: UNDERSCORE_IDENT_RE,
	    NUMBER_RE: NUMBER_RE,
	    C_NUMBER_RE: C_NUMBER_RE,
	    BINARY_NUMBER_RE: BINARY_NUMBER_RE,
	    RE_STARTERS_RE: RE_STARTERS_RE,
	    SHEBANG: SHEBANG,
	    BACKSLASH_ESCAPE: BACKSLASH_ESCAPE,
	    APOS_STRING_MODE: APOS_STRING_MODE,
	    QUOTE_STRING_MODE: QUOTE_STRING_MODE,
	    PHRASAL_WORDS_MODE: PHRASAL_WORDS_MODE,
	    COMMENT: COMMENT,
	    C_LINE_COMMENT_MODE: C_LINE_COMMENT_MODE,
	    C_BLOCK_COMMENT_MODE: C_BLOCK_COMMENT_MODE,
	    HASH_COMMENT_MODE: HASH_COMMENT_MODE,
	    NUMBER_MODE: NUMBER_MODE,
	    C_NUMBER_MODE: C_NUMBER_MODE,
	    BINARY_NUMBER_MODE: BINARY_NUMBER_MODE,
	    CSS_NUMBER_MODE: CSS_NUMBER_MODE,
	    REGEXP_MODE: REGEXP_MODE,
	    TITLE_MODE: TITLE_MODE,
	    UNDERSCORE_TITLE_MODE: UNDERSCORE_TITLE_MODE,
	    METHOD_GUARD: METHOD_GUARD,
	    END_SAME_AS_BEGIN: END_SAME_AS_BEGIN
	});

	// Grammar extensions / plugins
	// See: https://github.com/highlightjs/highlight.js/issues/2833

	// Grammar extensions allow "syntactic sugar" to be added to the grammar modes
	// without requiring any underlying changes to the compiler internals.

	// `compileMatch` being the perfect small example of now allowing a grammar
	// author to write `match` when they desire to match a single expression rather
	// than being forced to use `begin`.  The extension then just moves `match` into
	// `begin` when it runs.  Ie, no features have been added, but we've just made
	// the experience of writing (and reading grammars) a little bit nicer.

	// ------

	// TODO: We need negative look-behind support to do this properly
	/**
	 * Skip a match if it has a preceding dot
	 *
	 * This is used for `beginKeywords` to prevent matching expressions such as
	 * `bob.keyword.do()`. The mode compiler automatically wires this up as a
	 * special _internal_ 'on:begin' callback for modes with `beginKeywords`
	 * @param {RegExpMatchArray} match
	 * @param {CallbackResponse} response
	 */
	function skipIfhasPrecedingDot(match, response) {
	  const before = match.input[match.index - 1];
	  if (before === ".") {
	    response.ignoreMatch();
	  }
	}


	/**
	 * `beginKeywords` syntactic sugar
	 * @type {CompilerExt}
	 */
	function beginKeywords(mode, parent) {
	  if (!parent) return;
	  if (!mode.beginKeywords) return;

	  // for languages with keywords that include non-word characters checking for
	  // a word boundary is not sufficient, so instead we check for a word boundary
	  // or whitespace - this does no harm in any case since our keyword engine
	  // doesn't allow spaces in keywords anyways and we still check for the boundary
	  // first
	  mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')(?!\\.)(?=\\b|\\s)';
	  mode.__beforeBegin = skipIfhasPrecedingDot;
	  mode.keywords = mode.keywords || mode.beginKeywords;
	  delete mode.beginKeywords;

	  // prevents double relevance, the keywords themselves provide
	  // relevance, the mode doesn't need to double it
	  // eslint-disable-next-line no-undefined
	  if (mode.relevance === undefined) mode.relevance = 0;
	}

	/**
	 * Allow `illegal` to contain an array of illegal values
	 * @type {CompilerExt}
	 */
	function compileIllegal(mode, _parent) {
	  if (!Array.isArray(mode.illegal)) return;

	  mode.illegal = either$3(...mode.illegal);
	}

	/**
	 * `match` to match a single expression for readability
	 * @type {CompilerExt}
	 */
	function compileMatch(mode, _parent) {
	  if (!mode.match) return;
	  if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");

	  mode.begin = mode.match;
	  delete mode.match;
	}

	/**
	 * provides the default 1 relevance to all modes
	 * @type {CompilerExt}
	 */
	function compileRelevance(mode, _parent) {
	  // eslint-disable-next-line no-undefined
	  if (mode.relevance === undefined) mode.relevance = 1;
	}

	// keywords that should have no default relevance value
	const COMMON_KEYWORDS = [
	  'of',
	  'and',
	  'for',
	  'in',
	  'not',
	  'or',
	  'if',
	  'then',
	  'parent', // common variable name
	  'list', // common variable name
	  'value' // common variable name
	];

	const DEFAULT_KEYWORD_CLASSNAME = "keyword";

	/**
	 * Given raw keywords from a language definition, compile them.
	 *
	 * @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
	 * @param {boolean} caseInsensitive
	 */
	function compileKeywords(rawKeywords, caseInsensitive, className = DEFAULT_KEYWORD_CLASSNAME) {
	  /** @type KeywordDict */
	  const compiledKeywords = {};

	  // input can be a string of keywords, an array of keywords, or a object with
	  // named keys representing className (which can then point to a string or array)
	  if (typeof rawKeywords === 'string') {
	    compileList(className, rawKeywords.split(" "));
	  } else if (Array.isArray(rawKeywords)) {
	    compileList(className, rawKeywords);
	  } else {
	    Object.keys(rawKeywords).forEach(function(className) {
	      // collapse all our objects back into the parent object
	      Object.assign(
	        compiledKeywords,
	        compileKeywords(rawKeywords[className], caseInsensitive, className)
	      );
	    });
	  }
	  return compiledKeywords;

	  // ---

	  /**
	   * Compiles an individual list of keywords
	   *
	   * Ex: "for if when while|5"
	   *
	   * @param {string} className
	   * @param {Array<string>} keywordList
	   */
	  function compileList(className, keywordList) {
	    if (caseInsensitive) {
	      keywordList = keywordList.map(x => x.toLowerCase());
	    }
	    keywordList.forEach(function(keyword) {
	      const pair = keyword.split('|');
	      compiledKeywords[pair[0]] = [className, scoreForKeyword(pair[0], pair[1])];
	    });
	  }
	}

	/**
	 * Returns the proper score for a given keyword
	 *
	 * Also takes into account comment keywords, which will be scored 0 UNLESS
	 * another score has been manually assigned.
	 * @param {string} keyword
	 * @param {string} [providedScore]
	 */
	function scoreForKeyword(keyword, providedScore) {
	  // manual scores always win over common keywords
	  // so you can force a score of 1 if you really insist
	  if (providedScore) {
	    return Number(providedScore);
	  }

	  return commonKeyword(keyword) ? 0 : 1;
	}

	/**
	 * Determines if a given keyword is common or not
	 *
	 * @param {string} keyword */
	function commonKeyword(keyword) {
	  return COMMON_KEYWORDS.includes(keyword.toLowerCase());
	}

	// compilation

	/**
	 * Compiles a language definition result
	 *
	 * Given the raw result of a language definition (Language), compiles this so
	 * that it is ready for highlighting code.
	 * @param {Language} language
	 * @param {{plugins: HLJSPlugin[]}} opts
	 * @returns {CompiledLanguage}
	 */
	function compileLanguage(language, { plugins }) {
	  /**
	   * Builds a regex with the case sensativility of the current language
	   *
	   * @param {RegExp | string} value
	   * @param {boolean} [global]
	   */
	  function langRe(value, global) {
	    return new RegExp(
	      source$b(value),
	      'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : '')
	    );
	  }

	  /**
	    Stores multiple regular expressions and allows you to quickly search for
	    them all in a string simultaneously - returning the first match.  It does
	    this by creating a huge (a|b|c) regex - each individual item wrapped with ()
	    and joined by `|` - using match groups to track position.  When a match is
	    found checking which position in the array has content allows us to figure
	    out which of the original regexes / match groups triggered the match.

	    The match object itself (the result of `Regex.exec`) is returned but also
	    enhanced by merging in any meta-data that was registered with the regex.
	    This is how we keep track of which mode matched, and what type of rule
	    (`illegal`, `begin`, end, etc).
	  */
	  class MultiRegex {
	    constructor() {
	      this.matchIndexes = {};
	      // @ts-ignore
	      this.regexes = [];
	      this.matchAt = 1;
	      this.position = 0;
	    }

	    // @ts-ignore
	    addRule(re, opts) {
	      opts.position = this.position++;
	      // @ts-ignore
	      this.matchIndexes[this.matchAt] = opts;
	      this.regexes.push([opts, re]);
	      this.matchAt += countMatchGroups(re) + 1;
	    }

	    compile() {
	      if (this.regexes.length === 0) {
	        // avoids the need to check length every time exec is called
	        // @ts-ignore
	        this.exec = () => null;
	      }
	      const terminators = this.regexes.map(el => el[1]);
	      this.matcherRe = langRe(join(terminators), true);
	      this.lastIndex = 0;
	    }

	    /** @param {string} s */
	    exec(s) {
	      this.matcherRe.lastIndex = this.lastIndex;
	      const match = this.matcherRe.exec(s);
	      if (!match) { return null; }

	      // eslint-disable-next-line no-undefined
	      const i = match.findIndex((el, i) => i > 0 && el !== undefined);
	      // @ts-ignore
	      const matchData = this.matchIndexes[i];
	      // trim off any earlier non-relevant match groups (ie, the other regex
	      // match groups that make up the multi-matcher)
	      match.splice(0, i);

	      return Object.assign(match, matchData);
	    }
	  }

	  /*
	    Created to solve the key deficiently with MultiRegex - there is no way to
	    test for multiple matches at a single location.  Why would we need to do
	    that?  In the future a more dynamic engine will allow certain matches to be
	    ignored.  An example: if we matched say the 3rd regex in a large group but
	    decided to ignore it - we'd need to started testing again at the 4th
	    regex... but MultiRegex itself gives us no real way to do that.

	    So what this class creates MultiRegexs on the fly for whatever search
	    position they are needed.

	    NOTE: These additional MultiRegex objects are created dynamically.  For most
	    grammars most of the time we will never actually need anything more than the
	    first MultiRegex - so this shouldn't have too much overhead.

	    Say this is our search group, and we match regex3, but wish to ignore it.

	      regex1 | regex2 | regex3 | regex4 | regex5    ' ie, startAt = 0

	    What we need is a new MultiRegex that only includes the remaining
	    possibilities:

	      regex4 | regex5                               ' ie, startAt = 3

	    This class wraps all that complexity up in a simple API... `startAt` decides
	    where in the array of expressions to start doing the matching. It
	    auto-increments, so if a match is found at position 2, then startAt will be
	    set to 3.  If the end is reached startAt will return to 0.

	    MOST of the time the parser will be setting startAt manually to 0.
	  */
	  class ResumableMultiRegex {
	    constructor() {
	      // @ts-ignore
	      this.rules = [];
	      // @ts-ignore
	      this.multiRegexes = [];
	      this.count = 0;

	      this.lastIndex = 0;
	      this.regexIndex = 0;
	    }

	    // @ts-ignore
	    getMatcher(index) {
	      if (this.multiRegexes[index]) return this.multiRegexes[index];

	      const matcher = new MultiRegex();
	      this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
	      matcher.compile();
	      this.multiRegexes[index] = matcher;
	      return matcher;
	    }

	    resumingScanAtSamePosition() {
	      return this.regexIndex !== 0;
	    }

	    considerAll() {
	      this.regexIndex = 0;
	    }

	    // @ts-ignore
	    addRule(re, opts) {
	      this.rules.push([re, opts]);
	      if (opts.type === "begin") this.count++;
	    }

	    /** @param {string} s */
	    exec(s) {
	      const m = this.getMatcher(this.regexIndex);
	      m.lastIndex = this.lastIndex;
	      let result = m.exec(s);

	      // The following is because we have no easy way to say "resume scanning at the
	      // existing position but also skip the current rule ONLY". What happens is
	      // all prior rules are also skipped which can result in matching the wrong
	      // thing. Example of matching "booger":

	      // our matcher is [string, "booger", number]
	      //
	      // ....booger....

	      // if "booger" is ignored then we'd really need a regex to scan from the
	      // SAME position for only: [string, number] but ignoring "booger" (if it
	      // was the first match), a simple resume would scan ahead who knows how
	      // far looking only for "number", ignoring potential string matches (or
	      // future "booger" matches that might be valid.)

	      // So what we do: We execute two matchers, one resuming at the same
	      // position, but the second full matcher starting at the position after:

	      //     /--- resume first regex match here (for [number])
	      //     |/---- full match here for [string, "booger", number]
	      //     vv
	      // ....booger....

	      // Which ever results in a match first is then used. So this 3-4 step
	      // process essentially allows us to say "match at this position, excluding
	      // a prior rule that was ignored".
	      //
	      // 1. Match "booger" first, ignore. Also proves that [string] does non match.
	      // 2. Resume matching for [number]
	      // 3. Match at index + 1 for [string, "booger", number]
	      // 4. If #2 and #3 result in matches, which came first?
	      if (this.resumingScanAtSamePosition()) {
	        if (result && result.index === this.lastIndex) ; else { // use the second matcher result
	          const m2 = this.getMatcher(0);
	          m2.lastIndex = this.lastIndex + 1;
	          result = m2.exec(s);
	        }
	      }

	      if (result) {
	        this.regexIndex += result.position + 1;
	        if (this.regexIndex === this.count) {
	          // wrap-around to considering all matches again
	          this.considerAll();
	        }
	      }

	      return result;
	    }
	  }

	  /**
	   * Given a mode, builds a huge ResumableMultiRegex that can be used to walk
	   * the content and find matches.
	   *
	   * @param {CompiledMode} mode
	   * @returns {ResumableMultiRegex}
	   */
	  function buildModeRegex(mode) {
	    const mm = new ResumableMultiRegex();

	    mode.contains.forEach(term => mm.addRule(term.begin, { rule: term, type: "begin" }));

	    if (mode.terminatorEnd) {
	      mm.addRule(mode.terminatorEnd, { type: "end" });
	    }
	    if (mode.illegal) {
	      mm.addRule(mode.illegal, { type: "illegal" });
	    }

	    return mm;
	  }

	  /** skip vs abort vs ignore
	   *
	   * @skip   - The mode is still entered and exited normally (and contains rules apply),
	   *           but all content is held and added to the parent buffer rather than being
	   *           output when the mode ends.  Mostly used with `sublanguage` to build up
	   *           a single large buffer than can be parsed by sublanguage.
	   *
	   *             - The mode begin ands ends normally.
	   *             - Content matched is added to the parent mode buffer.
	   *             - The parser cursor is moved forward normally.
	   *
	   * @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
	   *           never matched) but DOES NOT continue to match subsequent `contains`
	   *           modes.  Abort is bad/suboptimal because it can result in modes
	   *           farther down not getting applied because an earlier rule eats the
	   *           content but then aborts.
	   *
	   *             - The mode does not begin.
	   *             - Content matched by `begin` is added to the mode buffer.
	   *             - The parser cursor is moved forward accordingly.
	   *
	   * @ignore - Ignores the mode (as if it never matched) and continues to match any
	   *           subsequent `contains` modes.  Ignore isn't technically possible with
	   *           the current parser implementation.
	   *
	   *             - The mode does not begin.
	   *             - Content matched by `begin` is ignored.
	   *             - The parser cursor is not moved forward.
	   */

	  /**
	   * Compiles an individual mode
	   *
	   * This can raise an error if the mode contains certain detectable known logic
	   * issues.
	   * @param {Mode} mode
	   * @param {CompiledMode | null} [parent]
	   * @returns {CompiledMode | never}
	   */
	  function compileMode(mode, parent) {
	    const cmode = /** @type CompiledMode */ (mode);
	    if (mode.compiled) return cmode;

	    [
	      // do this early so compiler extensions generally don't have to worry about
	      // the distinction between match/begin
	      compileMatch
	    ].forEach(ext => ext(mode, parent));

	    language.compilerExtensions.forEach(ext => ext(mode, parent));

	    // __beforeBegin is considered private API, internal use only
	    mode.__beforeBegin = null;

	    [
	      beginKeywords,
	      // do this later so compiler extensions that come earlier have access to the
	      // raw array if they wanted to perhaps manipulate it, etc.
	      compileIllegal,
	      // default to 1 relevance if not specified
	      compileRelevance
	    ].forEach(ext => ext(mode, parent));

	    mode.compiled = true;

	    let keywordPattern = null;
	    if (typeof mode.keywords === "object") {
	      keywordPattern = mode.keywords.$pattern;
	      delete mode.keywords.$pattern;
	    }

	    if (mode.keywords) {
	      mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
	    }

	    // both are not allowed
	    if (mode.lexemes && keywordPattern) {
	      throw new Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");
	    }

	    // `mode.lexemes` was the old standard before we added and now recommend
	    // using `keywords.$pattern` to pass the keyword pattern
	    keywordPattern = keywordPattern || mode.lexemes || /\w+/;
	    cmode.keywordPatternRe = langRe(keywordPattern, true);

	    if (parent) {
	      if (!mode.begin) mode.begin = /\B|\b/;
	      cmode.beginRe = langRe(mode.begin);
	      if (mode.endSameAsBegin) mode.end = mode.begin;
	      if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
	      if (mode.end) cmode.endRe = langRe(mode.end);
	      cmode.terminatorEnd = source$b(mode.end) || '';
	      if (mode.endsWithParent && parent.terminatorEnd) {
	        cmode.terminatorEnd += (mode.end ? '|' : '') + parent.terminatorEnd;
	      }
	    }
	    if (mode.illegal) cmode.illegalRe = langRe(/** @type {RegExp | string} */ (mode.illegal));
	    if (!mode.contains) mode.contains = [];

	    mode.contains = [].concat(...mode.contains.map(function(c) {
	      return expandOrCloneMode(c === 'self' ? mode : c);
	    }));
	    mode.contains.forEach(function(c) { compileMode(/** @type Mode */ (c), cmode); });

	    if (mode.starts) {
	      compileMode(mode.starts, parent);
	    }

	    cmode.matcher = buildModeRegex(cmode);
	    return cmode;
	  }

	  if (!language.compilerExtensions) language.compilerExtensions = [];

	  // self is not valid at the top-level
	  if (language.contains && language.contains.includes('self')) {
	    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
	  }

	  // we need a null object, which inherit will guarantee
	  language.classNameAliases = inherit(language.classNameAliases || {});

	  return compileMode(/** @type Mode */ (language));
	}

	/**
	 * Determines if a mode has a dependency on it's parent or not
	 *
	 * If a mode does have a parent dependency then often we need to clone it if
	 * it's used in multiple places so that each copy points to the correct parent,
	 * where-as modes without a parent can often safely be re-used at the bottom of
	 * a mode chain.
	 *
	 * @param {Mode | null} mode
	 * @returns {boolean} - is there a dependency on the parent?
	 * */
	function dependencyOnParent(mode) {
	  if (!mode) return false;

	  return mode.endsWithParent || dependencyOnParent(mode.starts);
	}

	/**
	 * Expands a mode or clones it if necessary
	 *
	 * This is necessary for modes with parental dependenceis (see notes on
	 * `dependencyOnParent`) and for nodes that have `variants` - which must then be
	 * exploded into their own individual modes at compile time.
	 *
	 * @param {Mode} mode
	 * @returns {Mode | Mode[]}
	 * */
	function expandOrCloneMode(mode) {
	  if (mode.variants && !mode.cachedVariants) {
	    mode.cachedVariants = mode.variants.map(function(variant) {
	      return inherit(mode, { variants: null }, variant);
	    });
	  }

	  // EXPAND
	  // if we have variants then essentially "replace" the mode with the variants
	  // this happens in compileMode, where this function is called from
	  if (mode.cachedVariants) {
	    return mode.cachedVariants;
	  }

	  // CLONE
	  // if we have dependencies on parents then we need a unique
	  // instance of ourselves, so we can be reused with many
	  // different parents without issue
	  if (dependencyOnParent(mode)) {
	    return inherit(mode, { starts: mode.starts ? inherit(mode.starts) : null });
	  }

	  if (Object.isFrozen(mode)) {
	    return inherit(mode);
	  }

	  // no special dependency issues, just return ourselves
	  return mode;
	}

	var version = "10.6.0";

	// @ts-nocheck

	function hasValueOrEmptyAttribute(value) {
	  return Boolean(value || value === "");
	}

	function BuildVuePlugin(hljs) {
	  const Component = {
	    props: ["language", "code", "autodetect"],
	    data: function() {
	      return {
	        detectedLanguage: "",
	        unknownLanguage: false
	      };
	    },
	    computed: {
	      className() {
	        if (this.unknownLanguage) return "";

	        return "hljs " + this.detectedLanguage;
	      },
	      highlighted() {
	        // no idea what language to use, return raw code
	        if (!this.autoDetect && !hljs.getLanguage(this.language)) {
	          console.warn(`The language "${this.language}" you specified could not be found.`);
	          this.unknownLanguage = true;
	          return escapeHTML(this.code);
	        }

	        let result = {};
	        if (this.autoDetect) {
	          result = hljs.highlightAuto(this.code);
	          this.detectedLanguage = result.language;
	        } else {
	          result = hljs.highlight(this.language, this.code, this.ignoreIllegals);
	          this.detectedLanguage = this.language;
	        }
	        return result.value;
	      },
	      autoDetect() {
	        return !this.language || hasValueOrEmptyAttribute(this.autodetect);
	      },
	      ignoreIllegals() {
	        return true;
	      }
	    },
	    // this avoids needing to use a whole Vue compilation pipeline just
	    // to build Highlight.js
	    render(createElement) {
	      return createElement("pre", {}, [
	        createElement("code", {
	          class: this.className,
	          domProps: { innerHTML: this.highlighted }
	        })
	      ]);
	    }
	    // template: `<pre><code :class="className" v-html="highlighted"></code></pre>`
	  };

	  const VuePlugin = {
	    install(Vue) {
	      Vue.component('highlightjs', Component);
	    }
	  };

	  return { Component, VuePlugin };
	}

	/* plugin itself */

	/** @type {HLJSPlugin} */
	const mergeHTMLPlugin = {
	  "after:highlightBlock": ({ block, result, text }) => {
	    const originalStream = nodeStream(block);
	    if (!originalStream.length) return;

	    const resultNode = document.createElement('div');
	    resultNode.innerHTML = result.value;
	    result.value = mergeStreams(originalStream, nodeStream(resultNode), text);
	  }
	};

	/* Stream merging support functions */

	/**
	 * @typedef Event
	 * @property {'start'|'stop'} event
	 * @property {number} offset
	 * @property {Node} node
	 */

	/**
	 * @param {Node} node
	 */
	function tag(node) {
	  return node.nodeName.toLowerCase();
	}

	/**
	 * @param {Node} node
	 */
	function nodeStream(node) {
	  /** @type Event[] */
	  const result = [];
	  (function _nodeStream(node, offset) {
	    for (let child = node.firstChild; child; child = child.nextSibling) {
	      if (child.nodeType === 3) {
	        offset += child.nodeValue.length;
	      } else if (child.nodeType === 1) {
	        result.push({
	          event: 'start',
	          offset: offset,
	          node: child
	        });
	        offset = _nodeStream(child, offset);
	        // Prevent void elements from having an end tag that would actually
	        // double them in the output. There are more void elements in HTML
	        // but we list only those realistically expected in code display.
	        if (!tag(child).match(/br|hr|img|input/)) {
	          result.push({
	            event: 'stop',
	            offset: offset,
	            node: child
	          });
	        }
	      }
	    }
	    return offset;
	  })(node, 0);
	  return result;
	}

	/**
	 * @param {any} original - the original stream
	 * @param {any} highlighted - stream of the highlighted source
	 * @param {string} value - the original source itself
	 */
	function mergeStreams(original, highlighted, value) {
	  let processed = 0;
	  let result = '';
	  const nodeStack = [];

	  function selectStream() {
	    if (!original.length || !highlighted.length) {
	      return original.length ? original : highlighted;
	    }
	    if (original[0].offset !== highlighted[0].offset) {
	      return (original[0].offset < highlighted[0].offset) ? original : highlighted;
	    }

	    /*
	    To avoid starting the stream just before it should stop the order is
	    ensured that original always starts first and closes last:

	    if (event1 == 'start' && event2 == 'start')
	      return original;
	    if (event1 == 'start' && event2 == 'stop')
	      return highlighted;
	    if (event1 == 'stop' && event2 == 'start')
	      return original;
	    if (event1 == 'stop' && event2 == 'stop')
	      return highlighted;

	    ... which is collapsed to:
	    */
	    return highlighted[0].event === 'start' ? original : highlighted;
	  }

	  /**
	   * @param {Node} node
	   */
	  function open(node) {
	    /** @param {Attr} attr */
	    function attributeString(attr) {
	      return ' ' + attr.nodeName + '="' + escapeHTML(attr.value) + '"';
	    }
	    // @ts-ignore
	    result += '<' + tag(node) + [].map.call(node.attributes, attributeString).join('') + '>';
	  }

	  /**
	   * @param {Node} node
	   */
	  function close(node) {
	    result += '</' + tag(node) + '>';
	  }

	  /**
	   * @param {Event} event
	   */
	  function render(event) {
	    (event.event === 'start' ? open : close)(event.node);
	  }

	  while (original.length || highlighted.length) {
	    let stream = selectStream();
	    result += escapeHTML(value.substring(processed, stream[0].offset));
	    processed = stream[0].offset;
	    if (stream === original) {
	      /*
	      On any opening or closing tag of the original markup we first close
	      the entire highlighted node stack, then render the original tag along
	      with all the following original tags at the same offset and then
	      reopen all the tags on the highlighted stack.
	      */
	      nodeStack.reverse().forEach(close);
	      do {
	        render(stream.splice(0, 1)[0]);
	        stream = selectStream();
	      } while (stream === original && stream.length && stream[0].offset === processed);
	      nodeStack.reverse().forEach(open);
	    } else {
	      if (stream[0].event === 'start') {
	        nodeStack.push(stream[0].node);
	      } else {
	        nodeStack.pop();
	      }
	      render(stream.splice(0, 1)[0]);
	    }
	  }
	  return result + escapeHTML(value.substr(processed));
	}

	/*

	For the reasoning behind this please see:
	https://github.com/highlightjs/highlight.js/issues/2880#issuecomment-747275419

	*/

	/**
	 * @param {string} message
	 */
	const error = (message) => {
	  console.error(message);
	};

	/**
	 * @param {string} message
	 * @param {any} args
	 */
	const warn = (message, ...args) => {
	  console.log(`WARN: ${message}`, ...args);
	};

	/**
	 * @param {string} version
	 * @param {string} message
	 */
	const deprecated = (version, message) => {
	  console.log(`Deprecated as of ${version}. ${message}`);
	};

	/*
	Syntax highlighting with language autodetection.
	https://highlightjs.org/
	*/

	const escape$1 = escapeHTML;
	const inherit$1 = inherit;
	const NO_MATCH = Symbol("nomatch");

	/**
	 * @param {any} hljs - object that is extended (legacy)
	 * @returns {HLJSApi}
	 */
	const HLJS = function(hljs) {
	  // Global internal variables used within the highlight.js library.
	  /** @type {Record<string, Language>} */
	  const languages = Object.create(null);
	  /** @type {Record<string, string>} */
	  const aliases = Object.create(null);
	  /** @type {HLJSPlugin[]} */
	  const plugins = [];

	  // safe/production mode - swallows more errors, tries to keep running
	  // even if a single syntax or parse hits a fatal error
	  let SAFE_MODE = true;
	  const fixMarkupRe = /(^(<[^>]+>|\t|)+|\n)/gm;
	  const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
	  /** @type {Language} */
	  const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: 'Plain text', contains: [] };

	  // Global options used when within external APIs. This is modified when
	  // calling the `hljs.configure` function.
	  /** @type HLJSOptions */
	  let options = {
	    noHighlightRe: /^(no-?highlight)$/i,
	    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
	    classPrefix: 'hljs-',
	    tabReplace: null,
	    useBR: false,
	    languages: null,
	    // beta configuration options, subject to change, welcome to discuss
	    // https://github.com/highlightjs/highlight.js/issues/1086
	    __emitter: TokenTreeEmitter
	  };

	  /* Utility functions */

	  /**
	   * Tests a language name to see if highlighting should be skipped
	   * @param {string} languageName
	   */
	  function shouldNotHighlight(languageName) {
	    return options.noHighlightRe.test(languageName);
	  }

	  /**
	   * @param {HighlightedHTMLElement} block - the HTML element to determine language for
	   */
	  function blockLanguage(block) {
	    let classes = block.className + ' ';

	    classes += block.parentNode ? block.parentNode.className : '';

	    // language-* takes precedence over non-prefixed class names.
	    const match = options.languageDetectRe.exec(classes);
	    if (match) {
	      const language = getLanguage(match[1]);
	      if (!language) {
	        warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
	        warn("Falling back to no-highlight mode for this block.", block);
	      }
	      return language ? match[1] : 'no-highlight';
	    }

	    return classes
	      .split(/\s+/)
	      .find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
	  }

	  /**
	   * Core highlighting function.
	   *
	   * @param {string} languageName - the language to use for highlighting
	   * @param {string} code - the code to highlight
	   * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
	   * @param {CompiledMode} [continuation] - current continuation mode, if any
	   *
	   * @returns {HighlightResult} Result - an object that represents the result
	   * @property {string} language - the language name
	   * @property {number} relevance - the relevance score
	   * @property {string} value - the highlighted HTML code
	   * @property {string} code - the original raw code
	   * @property {CompiledMode} top - top of the current mode stack
	   * @property {boolean} illegal - indicates whether any illegal matches were found
	  */
	  function highlight(languageName, code, ignoreIllegals, continuation) {
	    /** @type {BeforeHighlightContext} */
	    const context = {
	      code,
	      language: languageName
	    };
	    // the plugin can change the desired language or the code to be highlighted
	    // just be changing the object it was passed
	    fire("before:highlight", context);

	    // a before plugin can usurp the result completely by providing it's own
	    // in which case we don't even need to call highlight
	    const result = context.result
	      ? context.result
	      : _highlight(context.language, context.code, ignoreIllegals, continuation);

	    result.code = context.code;
	    // the plugin can change anything in result to suite it
	    fire("after:highlight", result);

	    return result;
	  }

	  /**
	   * private highlight that's used internally and does not fire callbacks
	   *
	   * @param {string} languageName - the language to use for highlighting
	   * @param {string} code - the code to highlight
	   * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
	   * @param {CompiledMode} [continuation] - current continuation mode, if any
	   * @returns {HighlightResult} - result of the highlight operation
	  */
	  function _highlight(languageName, code, ignoreIllegals, continuation) {
	    const codeToHighlight = code;

	    /**
	     * Return keyword data if a match is a keyword
	     * @param {CompiledMode} mode - current mode
	     * @param {RegExpMatchArray} match - regexp match data
	     * @returns {KeywordData | false}
	     */
	    function keywordData(mode, match) {
	      const matchText = language.case_insensitive ? match[0].toLowerCase() : match[0];
	      return Object.prototype.hasOwnProperty.call(mode.keywords, matchText) && mode.keywords[matchText];
	    }

	    function processKeywords() {
	      if (!top.keywords) {
	        emitter.addText(modeBuffer);
	        return;
	      }

	      let lastIndex = 0;
	      top.keywordPatternRe.lastIndex = 0;
	      let match = top.keywordPatternRe.exec(modeBuffer);
	      let buf = "";

	      while (match) {
	        buf += modeBuffer.substring(lastIndex, match.index);
	        const data = keywordData(top, match);
	        if (data) {
	          const [kind, keywordRelevance] = data;
	          emitter.addText(buf);
	          buf = "";

	          relevance += keywordRelevance;
	          const cssClass = language.classNameAliases[kind] || kind;
	          emitter.addKeyword(match[0], cssClass);
	        } else {
	          buf += match[0];
	        }
	        lastIndex = top.keywordPatternRe.lastIndex;
	        match = top.keywordPatternRe.exec(modeBuffer);
	      }
	      buf += modeBuffer.substr(lastIndex);
	      emitter.addText(buf);
	    }

	    function processSubLanguage() {
	      if (modeBuffer === "") return;
	      /** @type HighlightResult */
	      let result = null;

	      if (typeof top.subLanguage === 'string') {
	        if (!languages[top.subLanguage]) {
	          emitter.addText(modeBuffer);
	          return;
	        }
	        result = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
	        continuations[top.subLanguage] = /** @type {CompiledMode} */ (result.top);
	      } else {
	        result = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
	      }

	      // Counting embedded language score towards the host language may be disabled
	      // with zeroing the containing mode relevance. Use case in point is Markdown that
	      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
	      // score.
	      if (top.relevance > 0) {
	        relevance += result.relevance;
	      }
	      emitter.addSublanguage(result.emitter, result.language);
	    }

	    function processBuffer() {
	      if (top.subLanguage != null) {
	        processSubLanguage();
	      } else {
	        processKeywords();
	      }
	      modeBuffer = '';
	    }

	    /**
	     * @param {Mode} mode - new mode to start
	     */
	    function startNewMode(mode) {
	      if (mode.className) {
	        emitter.openNode(language.classNameAliases[mode.className] || mode.className);
	      }
	      top = Object.create(mode, { parent: { value: top } });
	      return top;
	    }

	    /**
	     * @param {CompiledMode } mode - the mode to potentially end
	     * @param {RegExpMatchArray} match - the latest match
	     * @param {string} matchPlusRemainder - match plus remainder of content
	     * @returns {CompiledMode | void} - the next mode, or if void continue on in current mode
	     */
	    function endOfMode(mode, match, matchPlusRemainder) {
	      let matched = startsWith(mode.endRe, matchPlusRemainder);

	      if (matched) {
	        if (mode["on:end"]) {
	          const resp = new Response(mode);
	          mode["on:end"](match, resp);
	          if (resp.ignore) matched = false;
	        }

	        if (matched) {
	          while (mode.endsParent && mode.parent) {
	            mode = mode.parent;
	          }
	          return mode;
	        }
	      }
	      // even if on:end fires an `ignore` it's still possible
	      // that we might trigger the end node because of a parent mode
	      if (mode.endsWithParent) {
	        return endOfMode(mode.parent, match, matchPlusRemainder);
	      }
	    }

	    /**
	     * Handle matching but then ignoring a sequence of text
	     *
	     * @param {string} lexeme - string containing full match text
	     */
	    function doIgnore(lexeme) {
	      if (top.matcher.regexIndex === 0) {
	        // no more regexs to potentially match here, so we move the cursor forward one
	        // space
	        modeBuffer += lexeme[0];
	        return 1;
	      } else {
	        // no need to move the cursor, we still have additional regexes to try and
	        // match at this very spot
	        resumeScanAtSamePosition = true;
	        return 0;
	      }
	    }

	    /**
	     * Handle the start of a new potential mode match
	     *
	     * @param {EnhancedMatch} match - the current match
	     * @returns {number} how far to advance the parse cursor
	     */
	    function doBeginMatch(match) {
	      const lexeme = match[0];
	      const newMode = match.rule;

	      const resp = new Response(newMode);
	      // first internal before callbacks, then the public ones
	      const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
	      for (const cb of beforeCallbacks) {
	        if (!cb) continue;
	        cb(match, resp);
	        if (resp.ignore) return doIgnore(lexeme);
	      }

	      if (newMode && newMode.endSameAsBegin) {
	        newMode.endRe = escape(lexeme);
	      }

	      if (newMode.skip) {
	        modeBuffer += lexeme;
	      } else {
	        if (newMode.excludeBegin) {
	          modeBuffer += lexeme;
	        }
	        processBuffer();
	        if (!newMode.returnBegin && !newMode.excludeBegin) {
	          modeBuffer = lexeme;
	        }
	      }
	      startNewMode(newMode);
	      // if (mode["after:begin"]) {
	      //   let resp = new Response(mode);
	      //   mode["after:begin"](match, resp);
	      // }
	      return newMode.returnBegin ? 0 : lexeme.length;
	    }

	    /**
	     * Handle the potential end of mode
	     *
	     * @param {RegExpMatchArray} match - the current match
	     */
	    function doEndMatch(match) {
	      const lexeme = match[0];
	      const matchPlusRemainder = codeToHighlight.substr(match.index);

	      const endMode = endOfMode(top, match, matchPlusRemainder);
	      if (!endMode) { return NO_MATCH; }

	      const origin = top;
	      if (origin.skip) {
	        modeBuffer += lexeme;
	      } else {
	        if (!(origin.returnEnd || origin.excludeEnd)) {
	          modeBuffer += lexeme;
	        }
	        processBuffer();
	        if (origin.excludeEnd) {
	          modeBuffer = lexeme;
	        }
	      }
	      do {
	        if (top.className) {
	          emitter.closeNode();
	        }
	        if (!top.skip && !top.subLanguage) {
	          relevance += top.relevance;
	        }
	        top = top.parent;
	      } while (top !== endMode.parent);
	      if (endMode.starts) {
	        if (endMode.endSameAsBegin) {
	          endMode.starts.endRe = endMode.endRe;
	        }
	        startNewMode(endMode.starts);
	      }
	      return origin.returnEnd ? 0 : lexeme.length;
	    }

	    function processContinuations() {
	      const list = [];
	      for (let current = top; current !== language; current = current.parent) {
	        if (current.className) {
	          list.unshift(current.className);
	        }
	      }
	      list.forEach(item => emitter.openNode(item));
	    }

	    /** @type {{type?: MatchType, index?: number, rule?: Mode}}} */
	    let lastMatch = {};

	    /**
	     *  Process an individual match
	     *
	     * @param {string} textBeforeMatch - text preceeding the match (since the last match)
	     * @param {EnhancedMatch} [match] - the match itself
	     */
	    function processLexeme(textBeforeMatch, match) {
	      const lexeme = match && match[0];

	      // add non-matched text to the current mode buffer
	      modeBuffer += textBeforeMatch;

	      if (lexeme == null) {
	        processBuffer();
	        return 0;
	      }

	      // we've found a 0 width match and we're stuck, so we need to advance
	      // this happens when we have badly behaved rules that have optional matchers to the degree that
	      // sometimes they can end up matching nothing at all
	      // Ref: https://github.com/highlightjs/highlight.js/issues/2140
	      if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
	        // spit the "skipped" character that our regex choked on back into the output sequence
	        modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
	        if (!SAFE_MODE) {
	          /** @type {AnnotatedError} */
	          const err = new Error('0 width match regex');
	          err.languageName = languageName;
	          err.badRule = lastMatch.rule;
	          throw err;
	        }
	        return 1;
	      }
	      lastMatch = match;

	      if (match.type === "begin") {
	        return doBeginMatch(match);
	      } else if (match.type === "illegal" && !ignoreIllegals) {
	        // illegal match, we do not continue processing
	        /** @type {AnnotatedError} */
	        const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');
	        err.mode = top;
	        throw err;
	      } else if (match.type === "end") {
	        const processed = doEndMatch(match);
	        if (processed !== NO_MATCH) {
	          return processed;
	        }
	      }

	      // edge case for when illegal matches $ (end of line) which is technically
	      // a 0 width match but not a begin/end match so it's not caught by the
	      // first handler (when ignoreIllegals is true)
	      if (match.type === "illegal" && lexeme === "") {
	        // advance so we aren't stuck in an infinite loop
	        return 1;
	      }

	      // infinite loops are BAD, this is a last ditch catch all. if we have a
	      // decent number of iterations yet our index (cursor position in our
	      // parsing) still 3x behind our index then something is very wrong
	      // so we bail
	      if (iterations > 100000 && iterations > match.index * 3) {
	        const err = new Error('potential infinite loop, way more iterations than matches');
	        throw err;
	      }

	      /*
	      Why might be find ourselves here?  Only one occasion now.  An end match that was
	      triggered but could not be completed.  When might this happen?  When an `endSameasBegin`
	      rule sets the end rule to a specific match.  Since the overall mode termination rule that's
	      being used to scan the text isn't recompiled that means that any match that LOOKS like
	      the end (but is not, because it is not an exact match to the beginning) will
	      end up here.  A definite end match, but when `doEndMatch` tries to "reapply"
	      the end rule and fails to match, we wind up here, and just silently ignore the end.

	      This causes no real harm other than stopping a few times too many.
	      */

	      modeBuffer += lexeme;
	      return lexeme.length;
	    }

	    const language = getLanguage(languageName);
	    if (!language) {
	      error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
	      throw new Error('Unknown language: "' + languageName + '"');
	    }

	    const md = compileLanguage(language, { plugins });
	    let result = '';
	    /** @type {CompiledMode} */
	    let top = continuation || md;
	    /** @type Record<string,CompiledMode> */
	    const continuations = {}; // keep continuations for sub-languages
	    const emitter = new options.__emitter(options);
	    processContinuations();
	    let modeBuffer = '';
	    let relevance = 0;
	    let index = 0;
	    let iterations = 0;
	    let resumeScanAtSamePosition = false;

	    try {
	      top.matcher.considerAll();

	      for (;;) {
	        iterations++;
	        if (resumeScanAtSamePosition) {
	          // only regexes not matched previously will now be
	          // considered for a potential match
	          resumeScanAtSamePosition = false;
	        } else {
	          top.matcher.considerAll();
	        }
	        top.matcher.lastIndex = index;

	        const match = top.matcher.exec(codeToHighlight);
	        // console.log("match", match[0], match.rule && match.rule.begin)

	        if (!match) break;

	        const beforeMatch = codeToHighlight.substring(index, match.index);
	        const processedCount = processLexeme(beforeMatch, match);
	        index = match.index + processedCount;
	      }
	      processLexeme(codeToHighlight.substr(index));
	      emitter.closeAllNodes();
	      emitter.finalize();
	      result = emitter.toHTML();

	      return {
	        // avoid possible breakage with v10 clients expecting
	        // this to always be an integer
	        relevance: Math.floor(relevance),
	        value: result,
	        language: languageName,
	        illegal: false,
	        emitter: emitter,
	        top: top
	      };
	    } catch (err) {
	      if (err.message && err.message.includes('Illegal')) {
	        return {
	          illegal: true,
	          illegalBy: {
	            msg: err.message,
	            context: codeToHighlight.slice(index - 100, index + 100),
	            mode: err.mode
	          },
	          sofar: result,
	          relevance: 0,
	          value: escape$1(codeToHighlight),
	          emitter: emitter
	        };
	      } else if (SAFE_MODE) {
	        return {
	          illegal: false,
	          relevance: 0,
	          value: escape$1(codeToHighlight),
	          emitter: emitter,
	          language: languageName,
	          top: top,
	          errorRaised: err
	        };
	      } else {
	        throw err;
	      }
	    }
	  }

	  /**
	   * returns a valid highlight result, without actually doing any actual work,
	   * auto highlight starts with this and it's possible for small snippets that
	   * auto-detection may not find a better match
	   * @param {string} code
	   * @returns {HighlightResult}
	   */
	  function justTextHighlightResult(code) {
	    const result = {
	      relevance: 0,
	      emitter: new options.__emitter(options),
	      value: escape$1(code),
	      illegal: false,
	      top: PLAINTEXT_LANGUAGE
	    };
	    result.emitter.addText(code);
	    return result;
	  }

	  /**
	  Highlighting with language detection. Accepts a string with the code to
	  highlight. Returns an object with the following properties:

	  - language (detected language)
	  - relevance (int)
	  - value (an HTML string with highlighting markup)
	  - second_best (object with the same structure for second-best heuristically
	    detected language, may be absent)

	    @param {string} code
	    @param {Array<string>} [languageSubset]
	    @returns {AutoHighlightResult}
	  */
	  function highlightAuto(code, languageSubset) {
	    languageSubset = languageSubset || options.languages || Object.keys(languages);
	    const plaintext = justTextHighlightResult(code);

	    const results = languageSubset.filter(getLanguage).filter(autoDetection).map(name =>
	      _highlight(name, code, false)
	    );
	    results.unshift(plaintext); // plaintext is always an option

	    const sorted = results.sort((a, b) => {
	      // sort base on relevance
	      if (a.relevance !== b.relevance) return b.relevance - a.relevance;

	      // always award the tie to the base language
	      // ie if C++ and Arduino are tied, it's more likely to be C++
	      if (a.language && b.language) {
	        if (getLanguage(a.language).supersetOf === b.language) {
	          return 1;
	        } else if (getLanguage(b.language).supersetOf === a.language) {
	          return -1;
	        }
	      }

	      // otherwise say they are equal, which has the effect of sorting on
	      // relevance while preserving the original ordering - which is how ties
	      // have historically been settled, ie the language that comes first always
	      // wins in the case of a tie
	      return 0;
	    });

	    const [best, secondBest] = sorted;

	    /** @type {AutoHighlightResult} */
	    const result = best;
	    result.second_best = secondBest;

	    return result;
	  }

	  /**
	  Post-processing of the highlighted markup:

	  - replace TABs with something more useful
	  - replace real line-breaks with '<br>' for non-pre containers

	    @param {string} html
	    @returns {string}
	  */
	  function fixMarkup(html) {
	    if (!(options.tabReplace || options.useBR)) {
	      return html;
	    }

	    return html.replace(fixMarkupRe, match => {
	      if (match === '\n') {
	        return options.useBR ? '<br>' : match;
	      } else if (options.tabReplace) {
	        return match.replace(/\t/g, options.tabReplace);
	      }
	      return match;
	    });
	  }

	  /**
	   * Builds new class name for block given the language name
	   *
	   * @param {HTMLElement} element
	   * @param {string} [currentLang]
	   * @param {string} [resultLang]
	   */
	  function updateClassName(element, currentLang, resultLang) {
	    const language = currentLang ? aliases[currentLang] : resultLang;

	    element.classList.add("hljs");
	    if (language) element.classList.add(language);
	  }

	  /** @type {HLJSPlugin} */
	  const brPlugin = {
	    "before:highlightBlock": ({ block }) => {
	      if (options.useBR) {
	        block.innerHTML = block.innerHTML.replace(/\n/g, '').replace(/<br[ /]*>/g, '\n');
	      }
	    },
	    "after:highlightBlock": ({ result }) => {
	      if (options.useBR) {
	        result.value = result.value.replace(/\n/g, "<br>");
	      }
	    }
	  };

	  const TAB_REPLACE_RE = /^(<[^>]+>|\t)+/gm;
	  /** @type {HLJSPlugin} */
	  const tabReplacePlugin = {
	    "after:highlightBlock": ({ result }) => {
	      if (options.tabReplace) {
	        result.value = result.value.replace(TAB_REPLACE_RE, (m) =>
	          m.replace(/\t/g, options.tabReplace)
	        );
	      }
	    }
	  };

	  /**
	   * Applies highlighting to a DOM node containing code. Accepts a DOM node and
	   * two optional parameters for fixMarkup.
	   *
	   * @param {HighlightedHTMLElement} element - the HTML element to highlight
	  */
	  function highlightBlock(element) {
	    /** @type HTMLElement */
	    let node = null;
	    const language = blockLanguage(element);

	    if (shouldNotHighlight(language)) return;

	    fire("before:highlightBlock",
	      { block: element, language: language });

	    node = element;
	    const text = node.textContent;
	    const result = language ? highlight(language, text, true) : highlightAuto(text);

	    fire("after:highlightBlock", { block: element, result, text });

	    element.innerHTML = result.value;
	    updateClassName(element, language, result.language);
	    element.result = {
	      language: result.language,
	      // TODO: remove with version 11.0
	      re: result.relevance,
	      relavance: result.relevance
	    };
	    if (result.second_best) {
	      element.second_best = {
	        language: result.second_best.language,
	        // TODO: remove with version 11.0
	        re: result.second_best.relevance,
	        relavance: result.second_best.relevance
	      };
	    }
	  }

	  /**
	   * Updates highlight.js global options with the passed options
	   *
	   * @param {Partial<HLJSOptions>} userOptions
	   */
	  function configure(userOptions) {
	    if (userOptions.useBR) {
	      deprecated("10.3.0", "'useBR' will be removed entirely in v11.0");
	      deprecated("10.3.0", "Please see https://github.com/highlightjs/highlight.js/issues/2559");
	    }
	    options = inherit$1(options, userOptions);
	  }

	  /**
	   * Highlights to all <pre><code> blocks on a page
	   *
	   * @type {Function & {called?: boolean}}
	   */
	  // TODO: remove v12, deprecated
	  const initHighlighting = () => {
	    if (initHighlighting.called) return;
	    initHighlighting.called = true;

	    deprecated("10.6.0", "initHighlighting() is deprecated.  Use highlightAll() instead.");

	    const blocks = document.querySelectorAll('pre code');
	    blocks.forEach(highlightBlock);
	  };

	  // Higlights all when DOMContentLoaded fires
	  // TODO: remove v12, deprecated
	  function initHighlightingOnLoad() {
	    deprecated("10.6.0", "initHighlightingOnLoad() is deprecated.  Use highlightAll() instead.");
	    wantsHighlight = true;
	  }

	  let wantsHighlight = false;
	  let domLoaded = false;

	  /**
	   * auto-highlights all pre>code elements on the page
	   */
	  function highlightAll() {
	    // if we are called too early in the loading process
	    if (!domLoaded) { wantsHighlight = true; return; }

	    const blocks = document.querySelectorAll('pre code');
	    blocks.forEach(highlightBlock);
	  }

	  function boot() {
	    domLoaded = true;
	    // if a highlight was requested before DOM was loaded, do now
	    if (wantsHighlight) highlightAll();
	  }

	  // make sure we are in the browser environment
	  if (typeof window !== 'undefined' && window.addEventListener) {
	    window.addEventListener('DOMContentLoaded', boot, false);
	  }

	  /**
	   * Register a language grammar module
	   *
	   * @param {string} languageName
	   * @param {LanguageFn} languageDefinition
	   */
	  function registerLanguage(languageName, languageDefinition) {
	    let lang = null;
	    try {
	      lang = languageDefinition(hljs);
	    } catch (error$1) {
	      error("Language definition for '{}' could not be registered.".replace("{}", languageName));
	      // hard or soft error
	      if (!SAFE_MODE) { throw error$1; } else { error(error$1); }
	      // languages that have serious errors are replaced with essentially a
	      // "plaintext" stand-in so that the code blocks will still get normal
	      // css classes applied to them - and one bad language won't break the
	      // entire highlighter
	      lang = PLAINTEXT_LANGUAGE;
	    }
	    // give it a temporary name if it doesn't have one in the meta-data
	    if (!lang.name) lang.name = languageName;
	    languages[languageName] = lang;
	    lang.rawDefinition = languageDefinition.bind(null, hljs);

	    if (lang.aliases) {
	      registerAliases(lang.aliases, { languageName });
	    }
	  }

	  /**
	   * @returns {string[]} List of language internal names
	   */
	  function listLanguages() {
	    return Object.keys(languages);
	  }

	  /**
	    intended usage: When one language truly requires another

	    Unlike `getLanguage`, this will throw when the requested language
	    is not available.

	    @param {string} name - name of the language to fetch/require
	    @returns {Language | never}
	  */
	  function requireLanguage(name) {
	    deprecated("10.4.0", "requireLanguage will be removed entirely in v11.");
	    deprecated("10.4.0", "Please see https://github.com/highlightjs/highlight.js/pull/2844");

	    const lang = getLanguage(name);
	    if (lang) { return lang; }

	    const err = new Error('The \'{}\' language is required, but not loaded.'.replace('{}', name));
	    throw err;
	  }

	  /**
	   * @param {string} name - name of the language to retrieve
	   * @returns {Language | undefined}
	   */
	  function getLanguage(name) {
	    name = (name || '').toLowerCase();
	    return languages[name] || languages[aliases[name]];
	  }

	  /**
	   *
	   * @param {string|string[]} aliasList - single alias or list of aliases
	   * @param {{languageName: string}} opts
	   */
	  function registerAliases(aliasList, { languageName }) {
	    if (typeof aliasList === 'string') {
	      aliasList = [aliasList];
	    }
	    aliasList.forEach(alias => { aliases[alias] = languageName; });
	  }

	  /**
	   * Determines if a given language has auto-detection enabled
	   * @param {string} name - name of the language
	   */
	  function autoDetection(name) {
	    const lang = getLanguage(name);
	    return lang && !lang.disableAutodetect;
	  }

	  /**
	   * @param {HLJSPlugin} plugin
	   */
	  function addPlugin(plugin) {
	    plugins.push(plugin);
	  }

	  /**
	   *
	   * @param {PluginEvent} event
	   * @param {any} args
	   */
	  function fire(event, args) {
	    const cb = event;
	    plugins.forEach(function(plugin) {
	      if (plugin[cb]) {
	        plugin[cb](args);
	      }
	    });
	  }

	  /**
	  Note: fixMarkup is deprecated and will be removed entirely in v11

	  @param {string} arg
	  @returns {string}
	  */
	  function deprecateFixMarkup(arg) {
	    deprecated("10.2.0", "fixMarkup will be removed entirely in v11.0");
	    deprecated("10.2.0", "Please see https://github.com/highlightjs/highlight.js/issues/2534");

	    return fixMarkup(arg);
	  }

	  /* Interface definition */
	  Object.assign(hljs, {
	    highlight,
	    highlightAuto,
	    highlightAll,
	    fixMarkup: deprecateFixMarkup,
	    highlightBlock,
	    configure,
	    initHighlighting,
	    initHighlightingOnLoad,
	    registerLanguage,
	    listLanguages,
	    getLanguage,
	    registerAliases,
	    requireLanguage,
	    autoDetection,
	    inherit: inherit$1,
	    addPlugin,
	    // plugins for frameworks
	    vuePlugin: BuildVuePlugin(hljs).VuePlugin
	  });

	  hljs.debugMode = function() { SAFE_MODE = false; };
	  hljs.safeMode = function() { SAFE_MODE = true; };
	  hljs.versionString = version;

	  for (const key in MODES) {
	    // @ts-ignore
	    if (typeof MODES[key] === "object") {
	      // @ts-ignore
	      deepFreezeEs6(MODES[key]);
	    }
	  }

	  // merge all the modes/regexs into our main object
	  Object.assign(hljs, MODES);

	  // built-in plugins, likely to be moved out of core in the future
	  hljs.addPlugin(brPlugin); // slated to be removed in v11
	  hljs.addPlugin(mergeHTMLPlugin);
	  hljs.addPlugin(tabReplacePlugin);
	  return hljs;
	};

	// export an "instance" of the highlighter
	var highlight = HLJS({});

	var core = highlight;

	const IDENT_RE$1 = '[A-Za-z$_][0-9A-Za-z$_]*';
	const KEYWORDS$1 = [
	  "as", // for exports
	  "in",
	  "of",
	  "if",
	  "for",
	  "while",
	  "finally",
	  "var",
	  "new",
	  "function",
	  "do",
	  "return",
	  "void",
	  "else",
	  "break",
	  "catch",
	  "instanceof",
	  "with",
	  "throw",
	  "case",
	  "default",
	  "try",
	  "switch",
	  "continue",
	  "typeof",
	  "delete",
	  "let",
	  "yield",
	  "const",
	  "class",
	  // JS handles these with a special rule
	  // "get",
	  // "set",
	  "debugger",
	  "async",
	  "await",
	  "static",
	  "import",
	  "from",
	  "export",
	  "extends"
	];
	const LITERALS$1 = [
	  "true",
	  "false",
	  "null",
	  "undefined",
	  "NaN",
	  "Infinity"
	];

	const TYPES$1 = [
	  "Intl",
	  "DataView",
	  "Number",
	  "Math",
	  "Date",
	  "String",
	  "RegExp",
	  "Object",
	  "Function",
	  "Boolean",
	  "Error",
	  "Symbol",
	  "Set",
	  "Map",
	  "WeakSet",
	  "WeakMap",
	  "Proxy",
	  "Reflect",
	  "JSON",
	  "Promise",
	  "Float64Array",
	  "Int16Array",
	  "Int32Array",
	  "Int8Array",
	  "Uint16Array",
	  "Uint32Array",
	  "Float32Array",
	  "Array",
	  "Uint8Array",
	  "Uint8ClampedArray",
	  "ArrayBuffer"
	];

	const ERROR_TYPES$1 = [
	  "EvalError",
	  "InternalError",
	  "RangeError",
	  "ReferenceError",
	  "SyntaxError",
	  "TypeError",
	  "URIError"
	];

	const BUILT_IN_GLOBALS$1 = [
	  "setInterval",
	  "setTimeout",
	  "clearInterval",
	  "clearTimeout",

	  "require",
	  "exports",

	  "eval",
	  "isFinite",
	  "isNaN",
	  "parseFloat",
	  "parseInt",
	  "decodeURI",
	  "decodeURIComponent",
	  "encodeURI",
	  "encodeURIComponent",
	  "escape",
	  "unescape"
	];

	const BUILT_IN_VARIABLES$1 = [
	  "arguments",
	  "this",
	  "super",
	  "console",
	  "window",
	  "document",
	  "localStorage",
	  "module",
	  "global" // Node.js
	];

	const BUILT_INS$1 = [].concat(
	  BUILT_IN_GLOBALS$1,
	  BUILT_IN_VARIABLES$1,
	  TYPES$1,
	  ERROR_TYPES$1
	);

	/**
	 * @param {string} value
	 * @returns {RegExp}
	 * */

	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function source$a(re) {
	  if (!re) return null;
	  if (typeof re === "string") return re;

	  return re.source;
	}

	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function lookahead$2(re) {
	  return concat$9('(?=', re, ')');
	}

	/**
	 * @param {...(RegExp | string) } args
	 * @returns {string}
	 */
	function concat$9(...args) {
	  const joined = args.map((x) => source$a(x)).join("");
	  return joined;
	}

	/*
	Language: JavaScript
	Description: JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.
	Category: common, scripting
	Website: https://developer.mozilla.org/en-US/docs/Web/JavaScript
	*/

	/** @type LanguageFn */
	function javascript$1(hljs) {
	  /**
	   * Takes a string like "<Booger" and checks to see
	   * if we can find a matching "</Booger" later in the
	   * content.
	   * @param {RegExpMatchArray} match
	   * @param {{after:number}} param1
	   */
	  const hasClosingTag = (match, { after }) => {
	    const tag = "</" + match[0].slice(1);
	    const pos = match.input.indexOf(tag, after);
	    return pos !== -1;
	  };

	  const IDENT_RE$1$1 = IDENT_RE$1;
	  const FRAGMENT = {
	    begin: '<>',
	    end: '</>'
	  };
	  const XML_TAG = {
	    begin: /<[A-Za-z0-9\\._:-]+/,
	    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
	    /**
	     * @param {RegExpMatchArray} match
	     * @param {CallbackResponse} response
	     */
	    isTrulyOpeningTag: (match, response) => {
	      const afterMatchIndex = match[0].length + match.index;
	      const nextChar = match.input[afterMatchIndex];
	      // nested type?
	      // HTML should not include another raw `<` inside a tag
	      // But a type might: `<Array<Array<number>>`, etc.
	      if (nextChar === "<") {
	        response.ignoreMatch();
	        return;
	      }
	      // <something>
	      // This is now either a tag or a type.
	      if (nextChar === ">") {
	        // if we cannot find a matching closing tag, then we
	        // will ignore it
	        if (!hasClosingTag(match, { after: afterMatchIndex })) {
	          response.ignoreMatch();
	        }
	      }
	    }
	  };
	  const KEYWORDS$1$1 = {
	    $pattern: IDENT_RE$1,
	    keyword: KEYWORDS$1,
	    literal: LITERALS$1,
	    built_in: BUILT_INS$1
	  };

	  // https://tc39.es/ecma262/#sec-literals-numeric-literals
	  const decimalDigits = '[0-9](_?[0-9])*';
	  const frac = `\\.(${decimalDigits})`;
	  // DecimalIntegerLiteral, including Annex B NonOctalDecimalIntegerLiteral
	  // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
	  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
	  const NUMBER = {
	    className: 'number',
	    variants: [
	      // DecimalLiteral
	      { begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))` +
	        `[eE][+-]?(${decimalDigits})\\b` },
	      { begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },

	      // DecimalBigIntegerLiteral
	      { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },

	      // NonDecimalIntegerLiteral
	      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
	      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
	      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },

	      // LegacyOctalIntegerLiteral (does not include underscore separators)
	      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
	      { begin: "\\b0[0-7]+n?\\b" },
	    ],
	    relevance: 0
	  };

	  const SUBST = {
	    className: 'subst',
	    begin: '\\$\\{',
	    end: '\\}',
	    keywords: KEYWORDS$1$1,
	    contains: [] // defined later
	  };
	  const HTML_TEMPLATE = {
	    begin: 'html`',
	    end: '',
	    starts: {
	      end: '`',
	      returnEnd: false,
	      contains: [
	        hljs.BACKSLASH_ESCAPE,
	        SUBST
	      ],
	      subLanguage: 'xml'
	    }
	  };
	  const CSS_TEMPLATE = {
	    begin: 'css`',
	    end: '',
	    starts: {
	      end: '`',
	      returnEnd: false,
	      contains: [
	        hljs.BACKSLASH_ESCAPE,
	        SUBST
	      ],
	      subLanguage: 'css'
	    }
	  };
	  const TEMPLATE_STRING = {
	    className: 'string',
	    begin: '`',
	    end: '`',
	    contains: [
	      hljs.BACKSLASH_ESCAPE,
	      SUBST
	    ]
	  };
	  const JSDOC_COMMENT = hljs.COMMENT(
	    /\/\*\*(?!\/)/,
	    '\\*/',
	    {
	      relevance: 0,
	      contains: [
	        {
	          className: 'doctag',
	          begin: '@[A-Za-z]+',
	          contains: [
	            {
	              className: 'type',
	              begin: '\\{',
	              end: '\\}',
	              relevance: 0
	            },
	            {
	              className: 'variable',
	              begin: IDENT_RE$1$1 + '(?=\\s*(-)|$)',
	              endsParent: true,
	              relevance: 0
	            },
	            // eat spaces (not newlines) so we can find
	            // types or variables
	            {
	              begin: /(?=[^\n])\s/,
	              relevance: 0
	            }
	          ]
	        }
	      ]
	    }
	  );
	  const COMMENT = {
	    className: "comment",
	    variants: [
	      JSDOC_COMMENT,
	      hljs.C_BLOCK_COMMENT_MODE,
	      hljs.C_LINE_COMMENT_MODE
	    ]
	  };
	  const SUBST_INTERNALS = [
	    hljs.APOS_STRING_MODE,
	    hljs.QUOTE_STRING_MODE,
	    HTML_TEMPLATE,
	    CSS_TEMPLATE,
	    TEMPLATE_STRING,
	    NUMBER,
	    hljs.REGEXP_MODE
	  ];
	  SUBST.contains = SUBST_INTERNALS
	    .concat({
	      // we need to pair up {} inside our subst to prevent
	      // it from ending too early by matching another }
	      begin: /\{/,
	      end: /\}/,
	      keywords: KEYWORDS$1$1,
	      contains: [
	        "self"
	      ].concat(SUBST_INTERNALS)
	    });
	  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
	  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
	    // eat recursive parens in sub expressions
	    {
	      begin: /\(/,
	      end: /\)/,
	      keywords: KEYWORDS$1$1,
	      contains: ["self"].concat(SUBST_AND_COMMENTS)
	    }
	  ]);
	  const PARAMS = {
	    className: 'params',
	    begin: /\(/,
	    end: /\)/,
	    excludeBegin: true,
	    excludeEnd: true,
	    keywords: KEYWORDS$1$1,
	    contains: PARAMS_CONTAINS
	  };

	  return {
	    name: 'Javascript',
	    aliases: ['js', 'jsx', 'mjs', 'cjs'],
	    keywords: KEYWORDS$1$1,
	    // this will be extended by TypeScript
	    exports: { PARAMS_CONTAINS },
	    illegal: /#(?![$_A-z])/,
	    contains: [
	      hljs.SHEBANG({
	        label: "shebang",
	        binary: "node",
	        relevance: 5
	      }),
	      {
	        label: "use_strict",
	        className: 'meta',
	        relevance: 10,
	        begin: /^\s*['"]use (strict|asm)['"]/
	      },
	      hljs.APOS_STRING_MODE,
	      hljs.QUOTE_STRING_MODE,
	      HTML_TEMPLATE,
	      CSS_TEMPLATE,
	      TEMPLATE_STRING,
	      COMMENT,
	      NUMBER,
	      { // object attr container
	        begin: concat$9(/[{,\n]\s*/,
	          // we need to look ahead to make sure that we actually have an
	          // attribute coming up so we don't steal a comma from a potential
	          // "value" container
	          //
	          // NOTE: this might not work how you think.  We don't actually always
	          // enter this mode and stay.  Instead it might merely match `,
	          // <comments up next>` and then immediately end after the , because it
	          // fails to find any actual attrs. But this still does the job because
	          // it prevents the value contain rule from grabbing this instead and
	          // prevening this rule from firing when we actually DO have keys.
	          lookahead$2(concat$9(
	            // we also need to allow for multiple possible comments inbetween
	            // the first key:value pairing
	            /(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/,
	            IDENT_RE$1$1 + '\\s*:'))),
	        relevance: 0,
	        contains: [
	          {
	            className: 'attr',
	            begin: IDENT_RE$1$1 + lookahead$2('\\s*:'),
	            relevance: 0
	          }
	        ]
	      },
	      { // "value" container
	        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
	        keywords: 'return throw case',
	        contains: [
	          COMMENT,
	          hljs.REGEXP_MODE,
	          {
	            className: 'function',
	            // we have to count the parens to make sure we actually have the
	            // correct bounding ( ) before the =>.  There could be any number of
	            // sub-expressions inside also surrounded by parens.
	            begin: '(\\(' +
	            '[^()]*(\\(' +
	            '[^()]*(\\(' +
	            '[^()]*' +
	            '\\)[^()]*)*' +
	            '\\)[^()]*)*' +
	            '\\)|' + hljs.UNDERSCORE_IDENT_RE + ')\\s*=>',
	            returnBegin: true,
	            end: '\\s*=>',
	            contains: [
	              {
	                className: 'params',
	                variants: [
	                  {
	                    begin: hljs.UNDERSCORE_IDENT_RE,
	                    relevance: 0
	                  },
	                  {
	                    className: null,
	                    begin: /\(\s*\)/,
	                    skip: true
	                  },
	                  {
	                    begin: /\(/,
	                    end: /\)/,
	                    excludeBegin: true,
	                    excludeEnd: true,
	                    keywords: KEYWORDS$1$1,
	                    contains: PARAMS_CONTAINS
	                  }
	                ]
	              }
	            ]
	          },
	          { // could be a comma delimited list of params to a function call
	            begin: /,/, relevance: 0
	          },
	          {
	            className: '',
	            begin: /\s/,
	            end: /\s*/,
	            skip: true
	          },
	          { // JSX
	            variants: [
	              { begin: FRAGMENT.begin, end: FRAGMENT.end },
	              {
	                begin: XML_TAG.begin,
	                // we carefully check the opening tag to see if it truly
	                // is a tag and not a false positive
	                'on:begin': XML_TAG.isTrulyOpeningTag,
	                end: XML_TAG.end
	              }
	            ],
	            subLanguage: 'xml',
	            contains: [
	              {
	                begin: XML_TAG.begin,
	                end: XML_TAG.end,
	                skip: true,
	                contains: ['self']
	              }
	            ]
	          }
	        ],
	        relevance: 0
	      },
	      {
	        className: 'function',
	        beginKeywords: 'function',
	        end: /[{;]/,
	        excludeEnd: true,
	        keywords: KEYWORDS$1$1,
	        contains: [
	          'self',
	          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1$1 }),
	          PARAMS
	        ],
	        illegal: /%/
	      },
	      {
	        // prevent this from getting swallowed up by function
	        // since they appear "function like"
	        beginKeywords: "while if switch catch for"
	      },
	      {
	        className: 'function',
	        // we have to count the parens to make sure we actually have the correct
	        // bounding ( ).  There could be any number of sub-expressions inside
	        // also surrounded by parens.
	        begin: hljs.UNDERSCORE_IDENT_RE +
	          '\\(' + // first parens
	          '[^()]*(\\(' +
	            '[^()]*(\\(' +
	              '[^()]*' +
	            '\\)[^()]*)*' +
	          '\\)[^()]*)*' +
	          '\\)\\s*\\{', // end parens
	        returnBegin:true,
	        contains: [
	          PARAMS,
	          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1$1 }),
	        ]
	      },
	      // hack: prevents detection of keywords in some circumstances
	      // .keyword()
	      // $keyword = x
	      {
	        variants: [
	          { begin: '\\.' + IDENT_RE$1$1 },
	          { begin: '\\$' + IDENT_RE$1$1 }
	        ],
	        relevance: 0
	      },
	      { // ES6 class
	        className: 'class',
	        beginKeywords: 'class',
	        end: /[{;=]/,
	        excludeEnd: true,
	        illegal: /[:"[\]]/,
	        contains: [
	          { beginKeywords: 'extends' },
	          hljs.UNDERSCORE_TITLE_MODE
	        ]
	      },
	      {
	        begin: /\b(?=constructor)/,
	        end: /[{;]/,
	        excludeEnd: true,
	        contains: [
	          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1$1 }),
	          'self',
	          PARAMS
	        ]
	      },
	      {
	        begin: '(get|set)\\s+(?=' + IDENT_RE$1$1 + '\\()',
	        end: /\{/,
	        keywords: "get set",
	        contains: [
	          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1$1 }),
	          { begin: /\(\)/ }, // eat to avoid empty params
	          PARAMS
	        ]
	      },
	      {
	        begin: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
	      }
	    ]
	  };
	}

	var javascript_1 = javascript$1;

	/**
	 * @param {string} value
	 * @returns {RegExp}
	 * */
	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function source$9(re) {
	  if (!re) return null;
	  if (typeof re === "string") return re;

	  return re.source;
	}

	/**
	 * @param {...(RegExp | string) } args
	 * @returns {string}
	 */
	function concat$8(...args) {
	  const joined = args.map((x) => source$9(x)).join("");
	  return joined;
	}

	/*
	Language: Bash
	Author: vah <vahtenberg@gmail.com>
	Contributrors: Benjamin Pannell <contact@sierrasoftworks.com>
	Website: https://www.gnu.org/software/bash/
	Category: common
	*/

	/** @type LanguageFn */
	function bash(hljs) {
	  const VAR = {};
	  const BRACED_VAR = {
	    begin: /\$\{/,
	    end:/\}/,
	    contains: [
	      "self",
	      {
	        begin: /:-/,
	        contains: [ VAR ]
	      } // default values
	    ]
	  };
	  Object.assign(VAR,{
	    className: 'variable',
	    variants: [
	      {begin: concat$8(/\$[\w\d#@][\w\d_]*/,
	        // negative look-ahead tries to avoid matching patterns that are not
	        // Perl at all like $ident$, @ident@, etc.
	        `(?![\\w\\d])(?![$])`) },
	      BRACED_VAR
	    ]
	  });

	  const SUBST = {
	    className: 'subst',
	    begin: /\$\(/, end: /\)/,
	    contains: [hljs.BACKSLASH_ESCAPE]
	  };
	  const HERE_DOC = {
	    begin: /<<-?\s*(?=\w+)/,
	    starts: {
	      contains: [
	        hljs.END_SAME_AS_BEGIN({
	          begin: /(\w+)/,
	          end: /(\w+)/,
	          className: 'string'
	        })
	      ]
	    }
	  };
	  const QUOTE_STRING = {
	    className: 'string',
	    begin: /"/, end: /"/,
	    contains: [
	      hljs.BACKSLASH_ESCAPE,
	      VAR,
	      SUBST
	    ]
	  };
	  SUBST.contains.push(QUOTE_STRING);
	  const ESCAPED_QUOTE = {
	    className: '',
	    begin: /\\"/

	  };
	  const APOS_STRING = {
	    className: 'string',
	    begin: /'/, end: /'/
	  };
	  const ARITHMETIC = {
	    begin: /\$\(\(/,
	    end: /\)\)/,
	    contains: [
	      { begin: /\d+#[0-9a-f]+/, className: "number" },
	      hljs.NUMBER_MODE,
	      VAR
	    ]
	  };
	  const SH_LIKE_SHELLS = [
	    "fish",
	    "bash",
	    "zsh",
	    "sh",
	    "csh",
	    "ksh",
	    "tcsh",
	    "dash",
	    "scsh",
	  ];
	  const KNOWN_SHEBANG = hljs.SHEBANG({
	    binary: `(${SH_LIKE_SHELLS.join("|")})`,
	    relevance: 10
	  });
	  const FUNCTION = {
	    className: 'function',
	    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
	    returnBegin: true,
	    contains: [hljs.inherit(hljs.TITLE_MODE, {begin: /\w[\w\d_]*/})],
	    relevance: 0
	  };

	  return {
	    name: 'Bash',
	    aliases: ['sh', 'zsh'],
	    keywords: {
	      $pattern: /\b[a-z._-]+\b/,
	      keyword:
	        'if then else elif fi for while in do done case esac function',
	      literal:
	        'true false',
	      built_in:
	        // Shell built-ins
	        // http://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
	        'break cd continue eval exec exit export getopts hash pwd readonly return shift test times ' +
	        'trap umask unset ' +
	        // Bash built-ins
	        'alias bind builtin caller command declare echo enable help let local logout mapfile printf ' +
	        'read readarray source type typeset ulimit unalias ' +
	        // Shell modifiers
	        'set shopt ' +
	        // Zsh built-ins
	        'autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles ' +
	        'compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate ' +
	        'fc fg float functions getcap getln history integer jobs kill limit log noglob popd print ' +
	        'pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit ' +
	        'unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof ' +
	        'zpty zregexparse zsocket zstyle ztcp'
	    },
	    contains: [
	      KNOWN_SHEBANG, // to catch known shells and boost relevancy
	      hljs.SHEBANG(), // to catch unknown shells but still highlight the shebang
	      FUNCTION,
	      ARITHMETIC,
	      hljs.HASH_COMMENT_MODE,
	      HERE_DOC,
	      QUOTE_STRING,
	      ESCAPED_QUOTE,
	      APOS_STRING,
	      VAR
	    ]
	  };
	}

	var bash_1 = bash;

	/**
	 * @param {string} value
	 * @returns {RegExp}
	 * */
	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function source$8(re) {
	  if (!re) return null;
	  if (typeof re === "string") return re;

	  return re.source;
	}

	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function optional$3(re) {
	  return concat$7('(', re, ')?');
	}

	/**
	 * @param {...(RegExp | string) } args
	 * @returns {string}
	 */
	function concat$7(...args) {
	  const joined = args.map((x) => source$8(x)).join("");
	  return joined;
	}

	/*
	Language: C++
	Category: common, system
	Website: https://isocpp.org
	*/

	/** @type LanguageFn */
	function cPlusPlus(hljs) {
	  // added for historic reasons because `hljs.C_LINE_COMMENT_MODE` does
	  // not include such support nor can we be sure all the grammars depending
	  // on it would desire this behavior
	  const C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$', {
	    contains: [
	      {
	        begin: /\\\n/
	      }
	    ]
	  });
	  const DECLTYPE_AUTO_RE = 'decltype\\(auto\\)';
	  const NAMESPACE_RE = '[a-zA-Z_]\\w*::';
	  const TEMPLATE_ARGUMENT_RE = '<[^<>]+>';
	  const FUNCTION_TYPE_RE = '(' +
	    DECLTYPE_AUTO_RE + '|' +
	    optional$3(NAMESPACE_RE) +
	    '[a-zA-Z_]\\w*' + optional$3(TEMPLATE_ARGUMENT_RE) +
	  ')';
	  const CPP_PRIMITIVE_TYPES = {
	    className: 'keyword',
	    begin: '\\b[a-z\\d_]*_t\\b'
	  };

	  // https://en.cppreference.com/w/cpp/language/escape
	  // \\ \x \xFF \u2837 \u00323747 \374
	  const CHARACTER_ESCAPES = '\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)';
	  const STRINGS = {
	    className: 'string',
	    variants: [
	      {
	        begin: '(u8?|U|L)?"',
	        end: '"',
	        illegal: '\\n',
	        contains: [ hljs.BACKSLASH_ESCAPE ]
	      },
	      {
	        begin: '(u8?|U|L)?\'(' + CHARACTER_ESCAPES + "|.)",
	        end: '\'',
	        illegal: '.'
	      },
	      hljs.END_SAME_AS_BEGIN({
	        begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
	        end: /\)([^()\\ ]{0,16})"/
	      })
	    ]
	  };

	  const NUMBERS = {
	    className: 'number',
	    variants: [
	      {
	        begin: '\\b(0b[01\']+)'
	      },
	      {
	        begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)'
	      },
	      {
	        begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)'
	      }
	    ],
	    relevance: 0
	  };

	  const PREPROCESSOR = {
	    className: 'meta',
	    begin: /#\s*[a-z]+\b/,
	    end: /$/,
	    keywords: {
	      'meta-keyword':
	        'if else elif endif define undef warning error line ' +
	        'pragma _Pragma ifdef ifndef include'
	    },
	    contains: [
	      {
	        begin: /\\\n/,
	        relevance: 0
	      },
	      hljs.inherit(STRINGS, {
	        className: 'meta-string'
	      }),
	      {
	        className: 'meta-string',
	        begin: /<.*?>/,
	        end: /$/,
	        illegal: '\\n'
	      },
	      C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE
	    ]
	  };

	  const TITLE_MODE = {
	    className: 'title',
	    begin: optional$3(NAMESPACE_RE) + hljs.IDENT_RE,
	    relevance: 0
	  };

	  const FUNCTION_TITLE = optional$3(NAMESPACE_RE) + hljs.IDENT_RE + '\\s*\\(';

	  const CPP_KEYWORDS = {
	    keyword: 'int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof ' +
	      'dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace ' +
	      'unsigned long volatile static protected bool template mutable if public friend ' +
	      'do goto auto void enum else break extern using asm case typeid wchar_t ' +
	      'short reinterpret_cast|10 default double register explicit signed typename try this ' +
	      'switch continue inline delete alignas alignof constexpr consteval constinit decltype ' +
	      'concept co_await co_return co_yield requires ' +
	      'noexcept static_assert thread_local restrict final override ' +
	      'atomic_bool atomic_char atomic_schar ' +
	      'atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong ' +
	      'atomic_ullong new throw return ' +
	      'and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq',
	    built_in: 'std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream ' +
	      'auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set ' +
	      'unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos ' +
	      'asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp ' +
	      'fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper ' +
	      'isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow ' +
	      'printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp ' +
	      'strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan ' +
	      'vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary',
	    literal: 'true false nullptr NULL'
	  };

	  const EXPRESSION_CONTAINS = [
	    PREPROCESSOR,
	    CPP_PRIMITIVE_TYPES,
	    C_LINE_COMMENT_MODE,
	    hljs.C_BLOCK_COMMENT_MODE,
	    NUMBERS,
	    STRINGS
	  ];

	  const EXPRESSION_CONTEXT = {
	    // This mode covers expression context where we can't expect a function
	    // definition and shouldn't highlight anything that looks like one:
	    // `return some()`, `else if()`, `(x*sum(1, 2))`
	    variants: [
	      {
	        begin: /=/,
	        end: /;/
	      },
	      {
	        begin: /\(/,
	        end: /\)/
	      },
	      {
	        beginKeywords: 'new throw return else',
	        end: /;/
	      }
	    ],
	    keywords: CPP_KEYWORDS,
	    contains: EXPRESSION_CONTAINS.concat([
	      {
	        begin: /\(/,
	        end: /\)/,
	        keywords: CPP_KEYWORDS,
	        contains: EXPRESSION_CONTAINS.concat([ 'self' ]),
	        relevance: 0
	      }
	    ]),
	    relevance: 0
	  };

	  const FUNCTION_DECLARATION = {
	    className: 'function',
	    begin: '(' + FUNCTION_TYPE_RE + '[\\*&\\s]+)+' + FUNCTION_TITLE,
	    returnBegin: true,
	    end: /[{;=]/,
	    excludeEnd: true,
	    keywords: CPP_KEYWORDS,
	    illegal: /[^\w\s\*&:<>.]/,
	    contains: [
	      { // to prevent it from being confused as the function title
	        begin: DECLTYPE_AUTO_RE,
	        keywords: CPP_KEYWORDS,
	        relevance: 0
	      },
	      {
	        begin: FUNCTION_TITLE,
	        returnBegin: true,
	        contains: [ TITLE_MODE ],
	        relevance: 0
	      },
	      {
	        className: 'params',
	        begin: /\(/,
	        end: /\)/,
	        keywords: CPP_KEYWORDS,
	        relevance: 0,
	        contains: [
	          C_LINE_COMMENT_MODE,
	          hljs.C_BLOCK_COMMENT_MODE,
	          STRINGS,
	          NUMBERS,
	          CPP_PRIMITIVE_TYPES,
	          // Count matching parentheses.
	          {
	            begin: /\(/,
	            end: /\)/,
	            keywords: CPP_KEYWORDS,
	            relevance: 0,
	            contains: [
	              'self',
	              C_LINE_COMMENT_MODE,
	              hljs.C_BLOCK_COMMENT_MODE,
	              STRINGS,
	              NUMBERS,
	              CPP_PRIMITIVE_TYPES
	            ]
	          }
	        ]
	      },
	      CPP_PRIMITIVE_TYPES,
	      C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE,
	      PREPROCESSOR
	    ]
	  };

	  return {
	    name: 'C++',
	    aliases: [
	      'cc',
	      'c++',
	      'h++',
	      'hpp',
	      'hh',
	      'hxx',
	      'cxx'
	    ],
	    keywords: CPP_KEYWORDS,
	    illegal: '</',
	    contains: [].concat(
	      EXPRESSION_CONTEXT,
	      FUNCTION_DECLARATION,
	      EXPRESSION_CONTAINS,
	      [
	        PREPROCESSOR,
	        { // containers: ie, `vector <int> rooms (9);`
	          begin: '\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<',
	          end: '>',
	          keywords: CPP_KEYWORDS,
	          contains: [
	            'self',
	            CPP_PRIMITIVE_TYPES
	          ]
	        },
	        {
	          begin: hljs.IDENT_RE + '::',
	          keywords: CPP_KEYWORDS
	        },
	        {
	          className: 'class',
	          beginKeywords: 'enum class struct union',
	          end: /[{;:<>=]/,
	          contains: [
	            {
	              beginKeywords: "final class struct"
	            },
	            hljs.TITLE_MODE
	          ]
	        }
	      ]),
	    exports: {
	      preprocessor: PREPROCESSOR,
	      strings: STRINGS,
	      keywords: CPP_KEYWORDS
	    }
	  };
	}

	/*
	Language: C-like (deprecated, use C and C++ instead)
	Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
	Contributors: Evgeny Stepanischev <imbolk@gmail.com>, Zaven Muradyan <megalivoithos@gmail.com>, Roel Deckers <admin@codingcat.nl>, Sam Wu <samsam2310@gmail.com>, Jordi Petit <jordi.petit@gmail.com>, Pieter Vantorre <pietervantorre@gmail.com>, Google Inc. (David Benjamin) <davidben@google.com>
	*/

	/** @type LanguageFn */
	function cLike(hljs) {
	  const lang = cPlusPlus(hljs);

	  const C_ALIASES = [
	    "c",
	    "h"
	  ];

	  const CPP_ALIASES = [
	    'cc',
	    'c++',
	    'h++',
	    'hpp',
	    'hh',
	    'hxx',
	    'cxx'
	  ];

	  lang.disableAutodetect = true;
	  lang.aliases = [];
	  // support users only loading c-like (legacy)
	  if (!hljs.getLanguage("c")) lang.aliases.push(...C_ALIASES);
	  if (!hljs.getLanguage("cpp")) lang.aliases.push(...CPP_ALIASES);

	  // if c and cpp are loaded after then they will reclaim these
	  // aliases for themselves

	  return lang;
	}

	var cLike_1 = cLike;

	/**
	 * @param {string} value
	 * @returns {RegExp}
	 * */
	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function source$7(re) {
	  if (!re) return null;
	  if (typeof re === "string") return re;

	  return re.source;
	}

	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function optional$2(re) {
	  return concat$6('(', re, ')?');
	}

	/**
	 * @param {...(RegExp | string) } args
	 * @returns {string}
	 */
	function concat$6(...args) {
	  const joined = args.map((x) => source$7(x)).join("");
	  return joined;
	}

	/*
	Language: C
	Category: common, system
	Website: https://en.wikipedia.org/wiki/C_(programming_language)
	*/

	/** @type LanguageFn */
	function c(hljs) {
	  // added for historic reasons because `hljs.C_LINE_COMMENT_MODE` does
	  // not include such support nor can we be sure all the grammars depending
	  // on it would desire this behavior
	  const C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$', {
	    contains: [
	      {
	        begin: /\\\n/
	      }
	    ]
	  });
	  const DECLTYPE_AUTO_RE = 'decltype\\(auto\\)';
	  const NAMESPACE_RE = '[a-zA-Z_]\\w*::';
	  const TEMPLATE_ARGUMENT_RE = '<[^<>]+>';
	  const FUNCTION_TYPE_RE = '(' +
	    DECLTYPE_AUTO_RE + '|' +
	    optional$2(NAMESPACE_RE) +
	    '[a-zA-Z_]\\w*' + optional$2(TEMPLATE_ARGUMENT_RE) +
	  ')';
	  const CPP_PRIMITIVE_TYPES = {
	    className: 'keyword',
	    begin: '\\b[a-z\\d_]*_t\\b'
	  };

	  // https://en.cppreference.com/w/cpp/language/escape
	  // \\ \x \xFF \u2837 \u00323747 \374
	  const CHARACTER_ESCAPES = '\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)';
	  const STRINGS = {
	    className: 'string',
	    variants: [
	      {
	        begin: '(u8?|U|L)?"',
	        end: '"',
	        illegal: '\\n',
	        contains: [ hljs.BACKSLASH_ESCAPE ]
	      },
	      {
	        begin: '(u8?|U|L)?\'(' + CHARACTER_ESCAPES + "|.)",
	        end: '\'',
	        illegal: '.'
	      },
	      hljs.END_SAME_AS_BEGIN({
	        begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
	        end: /\)([^()\\ ]{0,16})"/
	      })
	    ]
	  };

	  const NUMBERS = {
	    className: 'number',
	    variants: [
	      {
	        begin: '\\b(0b[01\']+)'
	      },
	      {
	        begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)'
	      },
	      {
	        begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)'
	      }
	    ],
	    relevance: 0
	  };

	  const PREPROCESSOR = {
	    className: 'meta',
	    begin: /#\s*[a-z]+\b/,
	    end: /$/,
	    keywords: {
	      'meta-keyword':
	        'if else elif endif define undef warning error line ' +
	        'pragma _Pragma ifdef ifndef include'
	    },
	    contains: [
	      {
	        begin: /\\\n/,
	        relevance: 0
	      },
	      hljs.inherit(STRINGS, {
	        className: 'meta-string'
	      }),
	      {
	        className: 'meta-string',
	        begin: /<.*?>/,
	        end: /$/,
	        illegal: '\\n'
	      },
	      C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE
	    ]
	  };

	  const TITLE_MODE = {
	    className: 'title',
	    begin: optional$2(NAMESPACE_RE) + hljs.IDENT_RE,
	    relevance: 0
	  };

	  const FUNCTION_TITLE = optional$2(NAMESPACE_RE) + hljs.IDENT_RE + '\\s*\\(';

	  const CPP_KEYWORDS = {
	    keyword: 'int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof ' +
	      'dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace ' +
	      'unsigned long volatile static protected bool template mutable if public friend ' +
	      'do goto auto void enum else break extern using asm case typeid wchar_t ' +
	      'short reinterpret_cast|10 default double register explicit signed typename try this ' +
	      'switch continue inline delete alignas alignof constexpr consteval constinit decltype ' +
	      'concept co_await co_return co_yield requires ' +
	      'noexcept static_assert thread_local restrict final override ' +
	      'atomic_bool atomic_char atomic_schar ' +
	      'atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong ' +
	      'atomic_ullong new throw return ' +
	      'and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq',
	    built_in: 'std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream ' +
	      'auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set ' +
	      'unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos ' +
	      'asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp ' +
	      'fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper ' +
	      'isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow ' +
	      'printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp ' +
	      'strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan ' +
	      'vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary',
	    literal: 'true false nullptr NULL'
	  };

	  const EXPRESSION_CONTAINS = [
	    PREPROCESSOR,
	    CPP_PRIMITIVE_TYPES,
	    C_LINE_COMMENT_MODE,
	    hljs.C_BLOCK_COMMENT_MODE,
	    NUMBERS,
	    STRINGS
	  ];

	  const EXPRESSION_CONTEXT = {
	    // This mode covers expression context where we can't expect a function
	    // definition and shouldn't highlight anything that looks like one:
	    // `return some()`, `else if()`, `(x*sum(1, 2))`
	    variants: [
	      {
	        begin: /=/,
	        end: /;/
	      },
	      {
	        begin: /\(/,
	        end: /\)/
	      },
	      {
	        beginKeywords: 'new throw return else',
	        end: /;/
	      }
	    ],
	    keywords: CPP_KEYWORDS,
	    contains: EXPRESSION_CONTAINS.concat([
	      {
	        begin: /\(/,
	        end: /\)/,
	        keywords: CPP_KEYWORDS,
	        contains: EXPRESSION_CONTAINS.concat([ 'self' ]),
	        relevance: 0
	      }
	    ]),
	    relevance: 0
	  };

	  const FUNCTION_DECLARATION = {
	    className: 'function',
	    begin: '(' + FUNCTION_TYPE_RE + '[\\*&\\s]+)+' + FUNCTION_TITLE,
	    returnBegin: true,
	    end: /[{;=]/,
	    excludeEnd: true,
	    keywords: CPP_KEYWORDS,
	    illegal: /[^\w\s\*&:<>.]/,
	    contains: [
	      { // to prevent it from being confused as the function title
	        begin: DECLTYPE_AUTO_RE,
	        keywords: CPP_KEYWORDS,
	        relevance: 0
	      },
	      {
	        begin: FUNCTION_TITLE,
	        returnBegin: true,
	        contains: [ TITLE_MODE ],
	        relevance: 0
	      },
	      {
	        className: 'params',
	        begin: /\(/,
	        end: /\)/,
	        keywords: CPP_KEYWORDS,
	        relevance: 0,
	        contains: [
	          C_LINE_COMMENT_MODE,
	          hljs.C_BLOCK_COMMENT_MODE,
	          STRINGS,
	          NUMBERS,
	          CPP_PRIMITIVE_TYPES,
	          // Count matching parentheses.
	          {
	            begin: /\(/,
	            end: /\)/,
	            keywords: CPP_KEYWORDS,
	            relevance: 0,
	            contains: [
	              'self',
	              C_LINE_COMMENT_MODE,
	              hljs.C_BLOCK_COMMENT_MODE,
	              STRINGS,
	              NUMBERS,
	              CPP_PRIMITIVE_TYPES
	            ]
	          }
	        ]
	      },
	      CPP_PRIMITIVE_TYPES,
	      C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE,
	      PREPROCESSOR
	    ]
	  };

	  return {
	    name: "C",
	    aliases: [
	      'c',
	      'h'
	    ],
	    keywords: CPP_KEYWORDS,
	    // Until differentiations are added between `c` and `cpp`, `c` will
	    // not be auto-detected to avoid auto-detect conflicts between C and C++
	    disableAutodetect: true,
	    illegal: '</',
	    contains: [].concat(
	      EXPRESSION_CONTEXT,
	      FUNCTION_DECLARATION,
	      EXPRESSION_CONTAINS,
	      [
	        PREPROCESSOR,
	        { // containers: ie, `vector <int> rooms (9);`
	          begin: '\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<',
	          end: '>',
	          keywords: CPP_KEYWORDS,
	          contains: [
	            'self',
	            CPP_PRIMITIVE_TYPES
	          ]
	        },
	        {
	          begin: hljs.IDENT_RE + '::',
	          keywords: CPP_KEYWORDS
	        },
	        {
	          className: 'class',
	          beginKeywords: 'enum class struct union',
	          end: /[{;:<>=]/,
	          contains: [
	            {
	              beginKeywords: "final class struct"
	            },
	            hljs.TITLE_MODE
	          ]
	        }
	      ]),
	    exports: {
	      preprocessor: PREPROCESSOR,
	      strings: STRINGS,
	      keywords: CPP_KEYWORDS
	    }
	  };
	}

	var c_1 = c;

	/*
	Language: CMake
	Description: CMake is an open-source cross-platform system for build automation.
	Author: Igor Kalnitsky <igor@kalnitsky.org>
	Website: https://cmake.org
	*/
	/** @type LanguageFn */
	function cmake(hljs) {
	  return {
	    name: 'CMake',
	    aliases: ['cmake.in'],
	    case_insensitive: true,
	    keywords: {
	      keyword:
	        // scripting commands
	        'break cmake_host_system_information cmake_minimum_required cmake_parse_arguments ' +
	        'cmake_policy configure_file continue elseif else endforeach endfunction endif endmacro ' +
	        'endwhile execute_process file find_file find_library find_package find_path ' +
	        'find_program foreach function get_cmake_property get_directory_property ' +
	        'get_filename_component get_property if include include_guard list macro ' +
	        'mark_as_advanced math message option return separate_arguments ' +
	        'set_directory_properties set_property set site_name string unset variable_watch while ' +
	        // project commands
	        'add_compile_definitions add_compile_options add_custom_command add_custom_target ' +
	        'add_definitions add_dependencies add_executable add_library add_link_options ' +
	        'add_subdirectory add_test aux_source_directory build_command create_test_sourcelist ' +
	        'define_property enable_language enable_testing export fltk_wrap_ui ' +
	        'get_source_file_property get_target_property get_test_property include_directories ' +
	        'include_external_msproject include_regular_expression install link_directories ' +
	        'link_libraries load_cache project qt_wrap_cpp qt_wrap_ui remove_definitions ' +
	        'set_source_files_properties set_target_properties set_tests_properties source_group ' +
	        'target_compile_definitions target_compile_features target_compile_options ' +
	        'target_include_directories target_link_directories target_link_libraries ' +
	        'target_link_options target_sources try_compile try_run ' +
	        // CTest commands
	        'ctest_build ctest_configure ctest_coverage ctest_empty_binary_directory ctest_memcheck ' +
	        'ctest_read_custom_files ctest_run_script ctest_sleep ctest_start ctest_submit ' +
	        'ctest_test ctest_update ctest_upload ' +
	        // deprecated commands
	        'build_name exec_program export_library_dependencies install_files install_programs ' +
	        'install_targets load_command make_directory output_required_files remove ' +
	        'subdir_depends subdirs use_mangled_mesa utility_source variable_requires write_file ' +
	        'qt5_use_modules qt5_use_package qt5_wrap_cpp ' +
	        // core keywords
	        'on off true false and or not command policy target test exists is_newer_than ' +
	        'is_directory is_symlink is_absolute matches less greater equal less_equal ' +
	        'greater_equal strless strgreater strequal strless_equal strgreater_equal version_less ' +
	        'version_greater version_equal version_less_equal version_greater_equal in_list defined'
	    },
	    contains: [
	      {
	        className: 'variable',
	        begin: /\$\{/,
	        end: /\}/
	      },
	      hljs.HASH_COMMENT_MODE,
	      hljs.QUOTE_STRING_MODE,
	      hljs.NUMBER_MODE
	    ]
	  };
	}

	var cmake_1 = cmake;

	/**
	 * @param {string} value
	 * @returns {RegExp}
	 * */
	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function source$6(re) {
	  if (!re) return null;
	  if (typeof re === "string") return re;

	  return re.source;
	}

	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function optional$1(re) {
	  return concat$5('(', re, ')?');
	}

	/**
	 * @param {...(RegExp | string) } args
	 * @returns {string}
	 */
	function concat$5(...args) {
	  const joined = args.map((x) => source$6(x)).join("");
	  return joined;
	}

	/*
	Language: C++
	Category: common, system
	Website: https://isocpp.org
	*/

	/** @type LanguageFn */
	function cpp(hljs) {
	  // added for historic reasons because `hljs.C_LINE_COMMENT_MODE` does
	  // not include such support nor can we be sure all the grammars depending
	  // on it would desire this behavior
	  const C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$', {
	    contains: [
	      {
	        begin: /\\\n/
	      }
	    ]
	  });
	  const DECLTYPE_AUTO_RE = 'decltype\\(auto\\)';
	  const NAMESPACE_RE = '[a-zA-Z_]\\w*::';
	  const TEMPLATE_ARGUMENT_RE = '<[^<>]+>';
	  const FUNCTION_TYPE_RE = '(' +
	    DECLTYPE_AUTO_RE + '|' +
	    optional$1(NAMESPACE_RE) +
	    '[a-zA-Z_]\\w*' + optional$1(TEMPLATE_ARGUMENT_RE) +
	  ')';
	  const CPP_PRIMITIVE_TYPES = {
	    className: 'keyword',
	    begin: '\\b[a-z\\d_]*_t\\b'
	  };

	  // https://en.cppreference.com/w/cpp/language/escape
	  // \\ \x \xFF \u2837 \u00323747 \374
	  const CHARACTER_ESCAPES = '\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)';
	  const STRINGS = {
	    className: 'string',
	    variants: [
	      {
	        begin: '(u8?|U|L)?"',
	        end: '"',
	        illegal: '\\n',
	        contains: [ hljs.BACKSLASH_ESCAPE ]
	      },
	      {
	        begin: '(u8?|U|L)?\'(' + CHARACTER_ESCAPES + "|.)",
	        end: '\'',
	        illegal: '.'
	      },
	      hljs.END_SAME_AS_BEGIN({
	        begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
	        end: /\)([^()\\ ]{0,16})"/
	      })
	    ]
	  };

	  const NUMBERS = {
	    className: 'number',
	    variants: [
	      {
	        begin: '\\b(0b[01\']+)'
	      },
	      {
	        begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)'
	      },
	      {
	        begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)'
	      }
	    ],
	    relevance: 0
	  };

	  const PREPROCESSOR = {
	    className: 'meta',
	    begin: /#\s*[a-z]+\b/,
	    end: /$/,
	    keywords: {
	      'meta-keyword':
	        'if else elif endif define undef warning error line ' +
	        'pragma _Pragma ifdef ifndef include'
	    },
	    contains: [
	      {
	        begin: /\\\n/,
	        relevance: 0
	      },
	      hljs.inherit(STRINGS, {
	        className: 'meta-string'
	      }),
	      {
	        className: 'meta-string',
	        begin: /<.*?>/,
	        end: /$/,
	        illegal: '\\n'
	      },
	      C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE
	    ]
	  };

	  const TITLE_MODE = {
	    className: 'title',
	    begin: optional$1(NAMESPACE_RE) + hljs.IDENT_RE,
	    relevance: 0
	  };

	  const FUNCTION_TITLE = optional$1(NAMESPACE_RE) + hljs.IDENT_RE + '\\s*\\(';

	  const CPP_KEYWORDS = {
	    keyword: 'int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof ' +
	      'dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace ' +
	      'unsigned long volatile static protected bool template mutable if public friend ' +
	      'do goto auto void enum else break extern using asm case typeid wchar_t ' +
	      'short reinterpret_cast|10 default double register explicit signed typename try this ' +
	      'switch continue inline delete alignas alignof constexpr consteval constinit decltype ' +
	      'concept co_await co_return co_yield requires ' +
	      'noexcept static_assert thread_local restrict final override ' +
	      'atomic_bool atomic_char atomic_schar ' +
	      'atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong ' +
	      'atomic_ullong new throw return ' +
	      'and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq',
	    built_in: 'std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream ' +
	      'auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set ' +
	      'unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos ' +
	      'asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp ' +
	      'fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper ' +
	      'isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow ' +
	      'printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp ' +
	      'strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan ' +
	      'vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary',
	    literal: 'true false nullptr NULL'
	  };

	  const EXPRESSION_CONTAINS = [
	    PREPROCESSOR,
	    CPP_PRIMITIVE_TYPES,
	    C_LINE_COMMENT_MODE,
	    hljs.C_BLOCK_COMMENT_MODE,
	    NUMBERS,
	    STRINGS
	  ];

	  const EXPRESSION_CONTEXT = {
	    // This mode covers expression context where we can't expect a function
	    // definition and shouldn't highlight anything that looks like one:
	    // `return some()`, `else if()`, `(x*sum(1, 2))`
	    variants: [
	      {
	        begin: /=/,
	        end: /;/
	      },
	      {
	        begin: /\(/,
	        end: /\)/
	      },
	      {
	        beginKeywords: 'new throw return else',
	        end: /;/
	      }
	    ],
	    keywords: CPP_KEYWORDS,
	    contains: EXPRESSION_CONTAINS.concat([
	      {
	        begin: /\(/,
	        end: /\)/,
	        keywords: CPP_KEYWORDS,
	        contains: EXPRESSION_CONTAINS.concat([ 'self' ]),
	        relevance: 0
	      }
	    ]),
	    relevance: 0
	  };

	  const FUNCTION_DECLARATION = {
	    className: 'function',
	    begin: '(' + FUNCTION_TYPE_RE + '[\\*&\\s]+)+' + FUNCTION_TITLE,
	    returnBegin: true,
	    end: /[{;=]/,
	    excludeEnd: true,
	    keywords: CPP_KEYWORDS,
	    illegal: /[^\w\s\*&:<>.]/,
	    contains: [
	      { // to prevent it from being confused as the function title
	        begin: DECLTYPE_AUTO_RE,
	        keywords: CPP_KEYWORDS,
	        relevance: 0
	      },
	      {
	        begin: FUNCTION_TITLE,
	        returnBegin: true,
	        contains: [ TITLE_MODE ],
	        relevance: 0
	      },
	      {
	        className: 'params',
	        begin: /\(/,
	        end: /\)/,
	        keywords: CPP_KEYWORDS,
	        relevance: 0,
	        contains: [
	          C_LINE_COMMENT_MODE,
	          hljs.C_BLOCK_COMMENT_MODE,
	          STRINGS,
	          NUMBERS,
	          CPP_PRIMITIVE_TYPES,
	          // Count matching parentheses.
	          {
	            begin: /\(/,
	            end: /\)/,
	            keywords: CPP_KEYWORDS,
	            relevance: 0,
	            contains: [
	              'self',
	              C_LINE_COMMENT_MODE,
	              hljs.C_BLOCK_COMMENT_MODE,
	              STRINGS,
	              NUMBERS,
	              CPP_PRIMITIVE_TYPES
	            ]
	          }
	        ]
	      },
	      CPP_PRIMITIVE_TYPES,
	      C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE,
	      PREPROCESSOR
	    ]
	  };

	  return {
	    name: 'C++',
	    aliases: [
	      'cc',
	      'c++',
	      'h++',
	      'hpp',
	      'hh',
	      'hxx',
	      'cxx'
	    ],
	    keywords: CPP_KEYWORDS,
	    illegal: '</',
	    contains: [].concat(
	      EXPRESSION_CONTEXT,
	      FUNCTION_DECLARATION,
	      EXPRESSION_CONTAINS,
	      [
	        PREPROCESSOR,
	        { // containers: ie, `vector <int> rooms (9);`
	          begin: '\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<',
	          end: '>',
	          keywords: CPP_KEYWORDS,
	          contains: [
	            'self',
	            CPP_PRIMITIVE_TYPES
	          ]
	        },
	        {
	          begin: hljs.IDENT_RE + '::',
	          keywords: CPP_KEYWORDS
	        },
	        {
	          className: 'class',
	          beginKeywords: 'enum class struct union',
	          end: /[{;:<>=]/,
	          contains: [
	            {
	              beginKeywords: "final class struct"
	            },
	            hljs.TITLE_MODE
	          ]
	        }
	      ]),
	    exports: {
	      preprocessor: PREPROCESSOR,
	      strings: STRINGS,
	      keywords: CPP_KEYWORDS
	    }
	  };
	}

	var cpp_1 = cpp;

	/*
	Language: C#
	Author: Jason Diamond <jason@diamond.name>
	Contributor: Nicolas LLOBERA <nllobera@gmail.com>, Pieter Vantorre <pietervantorre@gmail.com>, David Pine <david.pine@microsoft.com>
	Website: https://docs.microsoft.com/en-us/dotnet/csharp/
	Category: common
	*/
	/** @type LanguageFn */
	function csharp(hljs) {
	  var BUILT_IN_KEYWORDS = [
	      'bool',
	      'byte',
	      'char',
	      'decimal',
	      'delegate',
	      'double',
	      'dynamic',
	      'enum',
	      'float',
	      'int',
	      'long',
	      'nint',
	      'nuint',
	      'object',
	      'sbyte',
	      'short',
	      'string',
	      'ulong',
	      'unit',
	      'ushort'
	  ];
	  var FUNCTION_MODIFIERS = [
	    'public',
	    'private',
	    'protected',
	    'static',
	    'internal',
	    'protected',
	    'abstract',
	    'async',
	    'extern',
	    'override',
	    'unsafe',
	    'virtual',
	    'new',
	    'sealed',
	    'partial'
	  ];
	  var LITERAL_KEYWORDS = [
	      'default',
	      'false',
	      'null',
	      'true'
	  ];
	  var NORMAL_KEYWORDS = [
	    'abstract',
	    'as',
	    'base',
	    'break',
	    'case',
	    'class',
	    'const',
	    'continue',
	    'do',
	    'else',
	    'event',
	    'explicit',
	    'extern',
	    'finally',
	    'fixed',
	    'for',
	    'foreach',
	    'goto',
	    'if',
	    'implicit',
	    'in',
	    'interface',
	    'internal',
	    'is',
	    'lock',
	    'namespace',
	    'new',
	    'operator',
	    'out',
	    'override',
	    'params',
	    'private',
	    'protected',
	    'public',
	    'readonly',
	    'record',
	    'ref',
	    'return',
	    'sealed',
	    'sizeof',
	    'stackalloc',
	    'static',
	    'struct',
	    'switch',
	    'this',
	    'throw',
	    'try',
	    'typeof',
	    'unchecked',
	    'unsafe',
	    'using',
	    'virtual',
	    'void',
	    'volatile',
	    'while'
	  ];
	  var CONTEXTUAL_KEYWORDS = [
	    'add',
	    'alias',
	    'and',
	    'ascending',
	    'async',
	    'await',
	    'by',
	    'descending',
	    'equals',
	    'from',
	    'get',
	    'global',
	    'group',
	    'init',
	    'into',
	    'join',
	    'let',
	    'nameof',
	    'not',
	    'notnull',
	    'on',
	    'or',
	    'orderby',
	    'partial',
	    'remove',
	    'select',
	    'set',
	    'unmanaged',
	    'value|0',
	    'var',
	    'when',
	    'where',
	    'with',
	    'yield'
	  ];

	  var KEYWORDS = {
	    keyword: NORMAL_KEYWORDS.concat(CONTEXTUAL_KEYWORDS),
	    built_in: BUILT_IN_KEYWORDS,
	    literal: LITERAL_KEYWORDS
	  };
	  var TITLE_MODE = hljs.inherit(hljs.TITLE_MODE, {begin: '[a-zA-Z](\\.?\\w)*'});
	  var NUMBERS = {
	    className: 'number',
	    variants: [
	      { begin: '\\b(0b[01\']+)' },
	      { begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)(u|U|l|L|ul|UL|f|F|b|B)' },
	      { begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)' }
	    ],
	    relevance: 0
	  };
	  var VERBATIM_STRING = {
	    className: 'string',
	    begin: '@"', end: '"',
	    contains: [{begin: '""'}]
	  };
	  var VERBATIM_STRING_NO_LF = hljs.inherit(VERBATIM_STRING, {illegal: /\n/});
	  var SUBST = {
	    className: 'subst',
	    begin: /\{/, end: /\}/,
	    keywords: KEYWORDS
	  };
	  var SUBST_NO_LF = hljs.inherit(SUBST, {illegal: /\n/});
	  var INTERPOLATED_STRING = {
	    className: 'string',
	    begin: /\$"/, end: '"',
	    illegal: /\n/,
	    contains: [{begin: /\{\{/}, {begin: /\}\}/}, hljs.BACKSLASH_ESCAPE, SUBST_NO_LF]
	  };
	  var INTERPOLATED_VERBATIM_STRING = {
	    className: 'string',
	    begin: /\$@"/, end: '"',
	    contains: [{begin: /\{\{/}, {begin: /\}\}/}, {begin: '""'}, SUBST]
	  };
	  var INTERPOLATED_VERBATIM_STRING_NO_LF = hljs.inherit(INTERPOLATED_VERBATIM_STRING, {
	    illegal: /\n/,
	    contains: [{begin: /\{\{/}, {begin: /\}\}/}, {begin: '""'}, SUBST_NO_LF]
	  });
	  SUBST.contains = [
	    INTERPOLATED_VERBATIM_STRING,
	    INTERPOLATED_STRING,
	    VERBATIM_STRING,
	    hljs.APOS_STRING_MODE,
	    hljs.QUOTE_STRING_MODE,
	    NUMBERS,
	    hljs.C_BLOCK_COMMENT_MODE
	  ];
	  SUBST_NO_LF.contains = [
	    INTERPOLATED_VERBATIM_STRING_NO_LF,
	    INTERPOLATED_STRING,
	    VERBATIM_STRING_NO_LF,
	    hljs.APOS_STRING_MODE,
	    hljs.QUOTE_STRING_MODE,
	    NUMBERS,
	    hljs.inherit(hljs.C_BLOCK_COMMENT_MODE, {illegal: /\n/})
	  ];
	  var STRING = {
	    variants: [
	      INTERPOLATED_VERBATIM_STRING,
	      INTERPOLATED_STRING,
	      VERBATIM_STRING,
	      hljs.APOS_STRING_MODE,
	      hljs.QUOTE_STRING_MODE
	    ]
	  };

	  var GENERIC_MODIFIER = {
	    begin: "<",
	    end: ">",
	    contains: [
	      { beginKeywords: "in out"},
	      TITLE_MODE
	    ]
	  };
	  var TYPE_IDENT_RE = hljs.IDENT_RE + '(<' + hljs.IDENT_RE + '(\\s*,\\s*' + hljs.IDENT_RE + ')*>)?(\\[\\])?';
	  var AT_IDENTIFIER = {
	    // prevents expressions like `@class` from incorrect flagging
	    // `class` as a keyword
	    begin: "@" + hljs.IDENT_RE,
	    relevance: 0
	  };

	  return {
	    name: 'C#',
	    aliases: ['cs', 'c#'],
	    keywords: KEYWORDS,
	    illegal: /::/,
	    contains: [
	      hljs.COMMENT(
	        '///',
	        '$',
	        {
	          returnBegin: true,
	          contains: [
	            {
	              className: 'doctag',
	              variants: [
	                {
	                  begin: '///', relevance: 0
	                },
	                {
	                  begin: '<!--|-->'
	                },
	                {
	                  begin: '</?', end: '>'
	                }
	              ]
	            }
	          ]
	        }
	      ),
	      hljs.C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE,
	      {
	        className: 'meta',
	        begin: '#', end: '$',
	        keywords: {
	          'meta-keyword': 'if else elif endif define undef warning error line region endregion pragma checksum'
	        }
	      },
	      STRING,
	      NUMBERS,
	      {
	        beginKeywords: 'class interface',
	        relevance: 0,
	        end: /[{;=]/,
	        illegal: /[^\s:,]/,
	        contains: [
	          { beginKeywords: "where class" },
	          TITLE_MODE,
	          GENERIC_MODIFIER,
	          hljs.C_LINE_COMMENT_MODE,
	          hljs.C_BLOCK_COMMENT_MODE
	        ]
	      },
	      {
	        beginKeywords: 'namespace',
	        relevance: 0,
	        end: /[{;=]/,
	        illegal: /[^\s:]/,
	        contains: [
	          TITLE_MODE,
	          hljs.C_LINE_COMMENT_MODE,
	          hljs.C_BLOCK_COMMENT_MODE
	        ]
	      },
	      {
	        beginKeywords: 'record',
	        relevance: 0,
	        end: /[{;=]/,
	        illegal: /[^\s:]/,
	        contains: [
	          TITLE_MODE,
	          GENERIC_MODIFIER,
	          hljs.C_LINE_COMMENT_MODE,
	          hljs.C_BLOCK_COMMENT_MODE
	        ]
	      },
	      {
	        // [Attributes("")]
	        className: 'meta',
	        begin: '^\\s*\\[', excludeBegin: true, end: '\\]', excludeEnd: true,
	        contains: [
	          {className: 'meta-string', begin: /"/, end: /"/}
	        ]
	      },
	      {
	        // Expression keywords prevent 'keyword Name(...)' from being
	        // recognized as a function definition
	        beginKeywords: 'new return throw await else',
	        relevance: 0
	      },
	      {
	        className: 'function',
	        begin: '(' + TYPE_IDENT_RE + '\\s+)+' + hljs.IDENT_RE + '\\s*(<.+>\\s*)?\\(', returnBegin: true,
	        end: /\s*[{;=]/, excludeEnd: true,
	        keywords: KEYWORDS,
	        contains: [
	          // prevents these from being highlighted `title`
	          {
	            beginKeywords: FUNCTION_MODIFIERS.join(" "),
	            relevance: 0
	          },
	          {
	            begin: hljs.IDENT_RE + '\\s*(<.+>\\s*)?\\(', returnBegin: true,
	            contains: [
	              hljs.TITLE_MODE,
	              GENERIC_MODIFIER
	            ],
	            relevance: 0
	          },
	          {
	            className: 'params',
	            begin: /\(/, end: /\)/,
	            excludeBegin: true,
	            excludeEnd: true,
	            keywords: KEYWORDS,
	            relevance: 0,
	            contains: [
	              STRING,
	              NUMBERS,
	              hljs.C_BLOCK_COMMENT_MODE
	            ]
	          },
	          hljs.C_LINE_COMMENT_MODE,
	          hljs.C_BLOCK_COMMENT_MODE
	        ]
	      },
	      AT_IDENTIFIER
	    ]
	  };
	}

	var csharp_1 = csharp;

	/*
	Language: Dart
	Requires: markdown.js
	Author: Maxim Dikun <dikmax@gmail.com>
	Description: Dart a modern, object-oriented language developed by Google. For more information see https://www.dartlang.org/
	Website: https://dart.dev
	Category: scripting
	*/
	/** @type LanguageFn */
	function dart(hljs) {
	  const SUBST = {
	    className: 'subst',
	    variants: [{
	      begin: '\\$[A-Za-z0-9_]+'
	    }]
	  };

	  const BRACED_SUBST = {
	    className: 'subst',
	    variants: [{
	      begin: /\$\{/,
	      end: /\}/
	    }],
	    keywords: 'true false null this is new super'
	  };

	  const STRING = {
	    className: 'string',
	    variants: [
	      {
	        begin: 'r\'\'\'',
	        end: '\'\'\''
	      },
	      {
	        begin: 'r"""',
	        end: '"""'
	      },
	      {
	        begin: 'r\'',
	        end: '\'',
	        illegal: '\\n'
	      },
	      {
	        begin: 'r"',
	        end: '"',
	        illegal: '\\n'
	      },
	      {
	        begin: '\'\'\'',
	        end: '\'\'\'',
	        contains: [
	          hljs.BACKSLASH_ESCAPE,
	          SUBST,
	          BRACED_SUBST
	        ]
	      },
	      {
	        begin: '"""',
	        end: '"""',
	        contains: [
	          hljs.BACKSLASH_ESCAPE,
	          SUBST,
	          BRACED_SUBST
	        ]
	      },
	      {
	        begin: '\'',
	        end: '\'',
	        illegal: '\\n',
	        contains: [
	          hljs.BACKSLASH_ESCAPE,
	          SUBST,
	          BRACED_SUBST
	        ]
	      },
	      {
	        begin: '"',
	        end: '"',
	        illegal: '\\n',
	        contains: [
	          hljs.BACKSLASH_ESCAPE,
	          SUBST,
	          BRACED_SUBST
	        ]
	      }
	    ]
	  };
	  BRACED_SUBST.contains = [
	    hljs.C_NUMBER_MODE,
	    STRING
	  ];

	  const BUILT_IN_TYPES = [
	    // dart:core
	    'Comparable',
	    'DateTime',
	    'Duration',
	    'Function',
	    'Iterable',
	    'Iterator',
	    'List',
	    'Map',
	    'Match',
	    'Object',
	    'Pattern',
	    'RegExp',
	    'Set',
	    'Stopwatch',
	    'String',
	    'StringBuffer',
	    'StringSink',
	    'Symbol',
	    'Type',
	    'Uri',
	    'bool',
	    'double',
	    'int',
	    'num',
	    // dart:html
	    'Element',
	    'ElementList'
	  ];
	  const NULLABLE_BUILT_IN_TYPES = BUILT_IN_TYPES.map((e) => `${e}?`);

	  const KEYWORDS = {
	    keyword: 'abstract as assert async await break case catch class const continue covariant default deferred do ' +
	      'dynamic else enum export extends extension external factory false final finally for Function get hide if ' +
	      'implements import in inferface is late library mixin new null on operator part required rethrow return set ' +
	      'show static super switch sync this throw true try typedef var void while with yield',
	    built_in:
	      BUILT_IN_TYPES
	        .concat(NULLABLE_BUILT_IN_TYPES)
	        .concat([
	          // dart:core
	          'Never',
	          'Null',
	          'dynamic',
	          'print',
	          // dart:html
	          'document',
	          'querySelector',
	          'querySelectorAll',
	          'window'
	        ]),
	    $pattern: /[A-Za-z][A-Za-z0-9_]*\??/
	  };

	  return {
	    name: 'Dart',
	    keywords: KEYWORDS,
	    contains: [
	      STRING,
	      hljs.COMMENT(
	        /\/\*\*(?!\/)/,
	        /\*\//,
	        {
	          subLanguage: 'markdown',
	          relevance: 0
	        }
	      ),
	      hljs.COMMENT(
	        /\/{3,} ?/,
	        /$/, {
	          contains: [{
	            subLanguage: 'markdown',
	            begin: '.',
	            end: '$',
	            relevance: 0
	          }]
	        }
	      ),
	      hljs.C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE,
	      {
	        className: 'class',
	        beginKeywords: 'class interface',
	        end: /\{/,
	        excludeEnd: true,
	        contains: [
	          {
	            beginKeywords: 'extends implements'
	          },
	          hljs.UNDERSCORE_TITLE_MODE
	        ]
	      },
	      hljs.C_NUMBER_MODE,
	      {
	        className: 'meta',
	        begin: '@[A-Za-z]+'
	      },
	      {
	        begin: '=>' // No markup, just a relevance booster
	      }
	    ]
	  };
	}

	var dart_1 = dart;

	/*
	Language: Diff
	Description: Unified and context diff
	Author: Vasily Polovnyov <vast@whiteants.net>
	Website: https://www.gnu.org/software/diffutils/
	Category: common
	*/
	/** @type LanguageFn */
	function diff(hljs) {
	  return {
	    name: 'Diff',
	    aliases: ['patch'],
	    contains: [
	      {
	        className: 'meta',
	        relevance: 10,
	        variants: [
	          {
	            begin: /^@@ +-\d+,\d+ +\+\d+,\d+ +@@/
	          },
	          {
	            begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
	          },
	          {
	            begin: /^--- +\d+,\d+ +----$/
	          }
	        ]
	      },
	      {
	        className: 'comment',
	        variants: [
	          {
	            begin: /Index: /,
	            end: /$/
	          },
	          {
	            begin: /^index/,
	            end: /$/
	          },
	          {
	            begin: /={3,}/,
	            end: /$/
	          },
	          {
	            begin: /^-{3}/,
	            end: /$/
	          },
	          {
	            begin: /^\*{3} /,
	            end: /$/
	          },
	          {
	            begin: /^\+{3}/,
	            end: /$/
	          },
	          {
	            begin: /^\*{15}$/
	          },
	          {
	            begin: /^diff --git/,
	            end: /$/
	          }
	        ]
	      },
	      {
	        className: 'addition',
	        begin: /^\+/,
	        end: /$/
	      },
	      {
	        className: 'deletion',
	        begin: /^-/,
	        end: /$/
	      },
	      {
	        className: 'addition',
	        begin: /^!/,
	        end: /$/
	      }
	    ]
	  };
	}

	var diff_1 = diff;

	/*
	Language: Dockerfile
	Requires: bash.js
	Author: Alexis Hénaut <alexis@henaut.net>
	Description: language definition for Dockerfile files
	Website: https://docs.docker.com/engine/reference/builder/
	Category: config
	*/
	/** @type LanguageFn */
	function dockerfile(hljs) {
	  return {
	    name: 'Dockerfile',
	    aliases: ['docker'],
	    case_insensitive: true,
	    keywords: 'from maintainer expose env arg user onbuild stopsignal',
	    contains: [
	      hljs.HASH_COMMENT_MODE,
	      hljs.APOS_STRING_MODE,
	      hljs.QUOTE_STRING_MODE,
	      hljs.NUMBER_MODE,
	      {
	        beginKeywords: 'run cmd entrypoint volume add copy workdir label healthcheck shell',
	        starts: {
	          end: /[^\\]$/,
	          subLanguage: 'bash'
	        }
	      }
	    ],
	    illegal: '</'
	  };
	}

	var dockerfile_1 = dockerfile;

	/*
	Language: GLSL
	Description: OpenGL Shading Language
	Author: Sergey Tikhomirov <sergey@tikhomirov.io>
	Website: https://en.wikipedia.org/wiki/OpenGL_Shading_Language
	Category: graphics
	*/
	function glsl(hljs) {
	  return {
	    name: 'GLSL',
	    keywords: {
	      keyword:
	        // Statements
	        'break continue discard do else for if return while switch case default ' +
	        // Qualifiers
	        'attribute binding buffer ccw centroid centroid varying coherent column_major const cw ' +
	        'depth_any depth_greater depth_less depth_unchanged early_fragment_tests equal_spacing ' +
	        'flat fractional_even_spacing fractional_odd_spacing highp in index inout invariant ' +
	        'invocations isolines layout line_strip lines lines_adjacency local_size_x local_size_y ' +
	        'local_size_z location lowp max_vertices mediump noperspective offset origin_upper_left ' +
	        'out packed patch pixel_center_integer point_mode points precise precision quads r11f_g11f_b10f ' +
	        'r16 r16_snorm r16f r16i r16ui r32f r32i r32ui r8 r8_snorm r8i r8ui readonly restrict ' +
	        'rg16 rg16_snorm rg16f rg16i rg16ui rg32f rg32i rg32ui rg8 rg8_snorm rg8i rg8ui rgb10_a2 ' +
	        'rgb10_a2ui rgba16 rgba16_snorm rgba16f rgba16i rgba16ui rgba32f rgba32i rgba32ui rgba8 ' +
	        'rgba8_snorm rgba8i rgba8ui row_major sample shared smooth std140 std430 stream triangle_strip ' +
	        'triangles triangles_adjacency uniform varying vertices volatile writeonly',
	      type:
	        'atomic_uint bool bvec2 bvec3 bvec4 dmat2 dmat2x2 dmat2x3 dmat2x4 dmat3 dmat3x2 dmat3x3 ' +
	        'dmat3x4 dmat4 dmat4x2 dmat4x3 dmat4x4 double dvec2 dvec3 dvec4 float iimage1D iimage1DArray ' +
	        'iimage2D iimage2DArray iimage2DMS iimage2DMSArray iimage2DRect iimage3D iimageBuffer ' +
	        'iimageCube iimageCubeArray image1D image1DArray image2D image2DArray image2DMS image2DMSArray ' +
	        'image2DRect image3D imageBuffer imageCube imageCubeArray int isampler1D isampler1DArray ' +
	        'isampler2D isampler2DArray isampler2DMS isampler2DMSArray isampler2DRect isampler3D ' +
	        'isamplerBuffer isamplerCube isamplerCubeArray ivec2 ivec3 ivec4 mat2 mat2x2 mat2x3 ' +
	        'mat2x4 mat3 mat3x2 mat3x3 mat3x4 mat4 mat4x2 mat4x3 mat4x4 sampler1D sampler1DArray ' +
	        'sampler1DArrayShadow sampler1DShadow sampler2D sampler2DArray sampler2DArrayShadow ' +
	        'sampler2DMS sampler2DMSArray sampler2DRect sampler2DRectShadow sampler2DShadow sampler3D ' +
	        'samplerBuffer samplerCube samplerCubeArray samplerCubeArrayShadow samplerCubeShadow ' +
	        'image1D uimage1DArray uimage2D uimage2DArray uimage2DMS uimage2DMSArray uimage2DRect ' +
	        'uimage3D uimageBuffer uimageCube uimageCubeArray uint usampler1D usampler1DArray ' +
	        'usampler2D usampler2DArray usampler2DMS usampler2DMSArray usampler2DRect usampler3D ' +
	        'samplerBuffer usamplerCube usamplerCubeArray uvec2 uvec3 uvec4 vec2 vec3 vec4 void',
	      built_in:
	        // Constants
	        'gl_MaxAtomicCounterBindings gl_MaxAtomicCounterBufferSize gl_MaxClipDistances gl_MaxClipPlanes ' +
	        'gl_MaxCombinedAtomicCounterBuffers gl_MaxCombinedAtomicCounters gl_MaxCombinedImageUniforms ' +
	        'gl_MaxCombinedImageUnitsAndFragmentOutputs gl_MaxCombinedTextureImageUnits gl_MaxComputeAtomicCounterBuffers ' +
	        'gl_MaxComputeAtomicCounters gl_MaxComputeImageUniforms gl_MaxComputeTextureImageUnits ' +
	        'gl_MaxComputeUniformComponents gl_MaxComputeWorkGroupCount gl_MaxComputeWorkGroupSize ' +
	        'gl_MaxDrawBuffers gl_MaxFragmentAtomicCounterBuffers gl_MaxFragmentAtomicCounters ' +
	        'gl_MaxFragmentImageUniforms gl_MaxFragmentInputComponents gl_MaxFragmentInputVectors ' +
	        'gl_MaxFragmentUniformComponents gl_MaxFragmentUniformVectors gl_MaxGeometryAtomicCounterBuffers ' +
	        'gl_MaxGeometryAtomicCounters gl_MaxGeometryImageUniforms gl_MaxGeometryInputComponents ' +
	        'gl_MaxGeometryOutputComponents gl_MaxGeometryOutputVertices gl_MaxGeometryTextureImageUnits ' +
	        'gl_MaxGeometryTotalOutputComponents gl_MaxGeometryUniformComponents gl_MaxGeometryVaryingComponents ' +
	        'gl_MaxImageSamples gl_MaxImageUnits gl_MaxLights gl_MaxPatchVertices gl_MaxProgramTexelOffset ' +
	        'gl_MaxTessControlAtomicCounterBuffers gl_MaxTessControlAtomicCounters gl_MaxTessControlImageUniforms ' +
	        'gl_MaxTessControlInputComponents gl_MaxTessControlOutputComponents gl_MaxTessControlTextureImageUnits ' +
	        'gl_MaxTessControlTotalOutputComponents gl_MaxTessControlUniformComponents ' +
	        'gl_MaxTessEvaluationAtomicCounterBuffers gl_MaxTessEvaluationAtomicCounters ' +
	        'gl_MaxTessEvaluationImageUniforms gl_MaxTessEvaluationInputComponents gl_MaxTessEvaluationOutputComponents ' +
	        'gl_MaxTessEvaluationTextureImageUnits gl_MaxTessEvaluationUniformComponents ' +
	        'gl_MaxTessGenLevel gl_MaxTessPatchComponents gl_MaxTextureCoords gl_MaxTextureImageUnits ' +
	        'gl_MaxTextureUnits gl_MaxVaryingComponents gl_MaxVaryingFloats gl_MaxVaryingVectors ' +
	        'gl_MaxVertexAtomicCounterBuffers gl_MaxVertexAtomicCounters gl_MaxVertexAttribs gl_MaxVertexImageUniforms ' +
	        'gl_MaxVertexOutputComponents gl_MaxVertexOutputVectors gl_MaxVertexTextureImageUnits ' +
	        'gl_MaxVertexUniformComponents gl_MaxVertexUniformVectors gl_MaxViewports gl_MinProgramTexelOffset ' +
	        // Variables
	        'gl_BackColor gl_BackLightModelProduct gl_BackLightProduct gl_BackMaterial ' +
	        'gl_BackSecondaryColor gl_ClipDistance gl_ClipPlane gl_ClipVertex gl_Color ' +
	        'gl_DepthRange gl_EyePlaneQ gl_EyePlaneR gl_EyePlaneS gl_EyePlaneT gl_Fog gl_FogCoord ' +
	        'gl_FogFragCoord gl_FragColor gl_FragCoord gl_FragData gl_FragDepth gl_FrontColor ' +
	        'gl_FrontFacing gl_FrontLightModelProduct gl_FrontLightProduct gl_FrontMaterial ' +
	        'gl_FrontSecondaryColor gl_GlobalInvocationID gl_InstanceID gl_InvocationID gl_Layer gl_LightModel ' +
	        'gl_LightSource gl_LocalInvocationID gl_LocalInvocationIndex gl_ModelViewMatrix ' +
	        'gl_ModelViewMatrixInverse gl_ModelViewMatrixInverseTranspose gl_ModelViewMatrixTranspose ' +
	        'gl_ModelViewProjectionMatrix gl_ModelViewProjectionMatrixInverse gl_ModelViewProjectionMatrixInverseTranspose ' +
	        'gl_ModelViewProjectionMatrixTranspose gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 ' +
	        'gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 ' +
	        'gl_Normal gl_NormalMatrix gl_NormalScale gl_NumSamples gl_NumWorkGroups gl_ObjectPlaneQ ' +
	        'gl_ObjectPlaneR gl_ObjectPlaneS gl_ObjectPlaneT gl_PatchVerticesIn gl_Point gl_PointCoord ' +
	        'gl_PointSize gl_Position gl_PrimitiveID gl_PrimitiveIDIn gl_ProjectionMatrix gl_ProjectionMatrixInverse ' +
	        'gl_ProjectionMatrixInverseTranspose gl_ProjectionMatrixTranspose gl_SampleID gl_SampleMask ' +
	        'gl_SampleMaskIn gl_SamplePosition gl_SecondaryColor gl_TessCoord gl_TessLevelInner gl_TessLevelOuter ' +
	        'gl_TexCoord gl_TextureEnvColor gl_TextureMatrix gl_TextureMatrixInverse gl_TextureMatrixInverseTranspose ' +
	        'gl_TextureMatrixTranspose gl_Vertex gl_VertexID gl_ViewportIndex gl_WorkGroupID gl_WorkGroupSize gl_in gl_out ' +
	        // Functions
	        'EmitStreamVertex EmitVertex EndPrimitive EndStreamPrimitive abs acos acosh all any asin ' +
	        'asinh atan atanh atomicAdd atomicAnd atomicCompSwap atomicCounter atomicCounterDecrement ' +
	        'atomicCounterIncrement atomicExchange atomicMax atomicMin atomicOr atomicXor barrier ' +
	        'bitCount bitfieldExtract bitfieldInsert bitfieldReverse ceil clamp cos cosh cross ' +
	        'dFdx dFdy degrees determinant distance dot equal exp exp2 faceforward findLSB findMSB ' +
	        'floatBitsToInt floatBitsToUint floor fma fract frexp ftransform fwidth greaterThan ' +
	        'greaterThanEqual groupMemoryBarrier imageAtomicAdd imageAtomicAnd imageAtomicCompSwap ' +
	        'imageAtomicExchange imageAtomicMax imageAtomicMin imageAtomicOr imageAtomicXor imageLoad ' +
	        'imageSize imageStore imulExtended intBitsToFloat interpolateAtCentroid interpolateAtOffset ' +
	        'interpolateAtSample inverse inversesqrt isinf isnan ldexp length lessThan lessThanEqual log ' +
	        'log2 matrixCompMult max memoryBarrier memoryBarrierAtomicCounter memoryBarrierBuffer ' +
	        'memoryBarrierImage memoryBarrierShared min mix mod modf noise1 noise2 noise3 noise4 ' +
	        'normalize not notEqual outerProduct packDouble2x32 packHalf2x16 packSnorm2x16 packSnorm4x8 ' +
	        'packUnorm2x16 packUnorm4x8 pow radians reflect refract round roundEven shadow1D shadow1DLod ' +
	        'shadow1DProj shadow1DProjLod shadow2D shadow2DLod shadow2DProj shadow2DProjLod sign sin sinh ' +
	        'smoothstep sqrt step tan tanh texelFetch texelFetchOffset texture texture1D texture1DLod ' +
	        'texture1DProj texture1DProjLod texture2D texture2DLod texture2DProj texture2DProjLod ' +
	        'texture3D texture3DLod texture3DProj texture3DProjLod textureCube textureCubeLod ' +
	        'textureGather textureGatherOffset textureGatherOffsets textureGrad textureGradOffset ' +
	        'textureLod textureLodOffset textureOffset textureProj textureProjGrad textureProjGradOffset ' +
	        'textureProjLod textureProjLodOffset textureProjOffset textureQueryLevels textureQueryLod ' +
	        'textureSize transpose trunc uaddCarry uintBitsToFloat umulExtended unpackDouble2x32 ' +
	        'unpackHalf2x16 unpackSnorm2x16 unpackSnorm4x8 unpackUnorm2x16 unpackUnorm4x8 usubBorrow',
	      literal: 'true false'
	    },
	    illegal: '"',
	    contains: [
	      hljs.C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE,
	      hljs.C_NUMBER_MODE,
	      {
	        className: 'meta',
	        begin: '#',
	        end: '$'
	      }
	    ]
	  };
	}

	var glsl_1 = glsl;

	/*
	Language: Go
	Author: Stephan Kountso aka StepLg <steplg@gmail.com>
	Contributors: Evgeny Stepanischev <imbolk@gmail.com>
	Description: Google go language (golang). For info about language
	Website: http://golang.org/
	Category: common, system
	*/
	function go(hljs) {
	  const GO_KEYWORDS = {
	    keyword:
	      'break default func interface select case map struct chan else goto package switch ' +
	      'const fallthrough if range type continue for import return var go defer ' +
	      'bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 ' +
	      'uint16 uint32 uint64 int uint uintptr rune',
	    literal:
	       'true false iota nil',
	    built_in:
	      'append cap close complex copy imag len make new panic print println real recover delete'
	  };
	  return {
	    name: 'Go',
	    aliases: ['golang'],
	    keywords: GO_KEYWORDS,
	    illegal: '</',
	    contains: [
	      hljs.C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE,
	      {
	        className: 'string',
	        variants: [
	          hljs.QUOTE_STRING_MODE,
	          hljs.APOS_STRING_MODE,
	          {
	            begin: '`',
	            end: '`'
	          }
	        ]
	      },
	      {
	        className: 'number',
	        variants: [
	          {
	            begin: hljs.C_NUMBER_RE + '[i]',
	            relevance: 1
	          },
	          hljs.C_NUMBER_MODE
	        ]
	      },
	      {
	        begin: /:=/ // relevance booster
	      },
	      {
	        className: 'function',
	        beginKeywords: 'func',
	        end: '\\s*(\\{|$)',
	        excludeEnd: true,
	        contains: [
	          hljs.TITLE_MODE,
	          {
	            className: 'params',
	            begin: /\(/,
	            end: /\)/,
	            keywords: GO_KEYWORDS,
	            illegal: /["']/
	          }
	        ]
	      }
	    ]
	  };
	}

	var go_1 = go;

	/*
	Language: Gradle
	Description: Gradle is an open-source build automation tool focused on flexibility and performance.
	Website: https://gradle.org
	Author: Damian Mee <mee.damian@gmail.com>
	*/
	function gradle(hljs) {
	  return {
	    name: 'Gradle',
	    case_insensitive: true,
	    keywords: {
	      keyword:
	        'task project allprojects subprojects artifacts buildscript configurations ' +
	        'dependencies repositories sourceSets description delete from into include ' +
	        'exclude source classpath destinationDir includes options sourceCompatibility ' +
	        'targetCompatibility group flatDir doLast doFirst flatten todir fromdir ant ' +
	        'def abstract break case catch continue default do else extends final finally ' +
	        'for if implements instanceof native new private protected public return static ' +
	        'switch synchronized throw throws transient try volatile while strictfp package ' +
	        'import false null super this true antlrtask checkstyle codenarc copy boolean ' +
	        'byte char class double float int interface long short void compile runTime ' +
	        'file fileTree abs any append asList asWritable call collect compareTo count ' +
	        'div dump each eachByte eachFile eachLine every find findAll flatten getAt ' +
	        'getErr getIn getOut getText grep immutable inject inspect intersect invokeMethods ' +
	        'isCase join leftShift minus multiply newInputStream newOutputStream newPrintWriter ' +
	        'newReader newWriter next plus pop power previous print println push putAt read ' +
	        'readBytes readLines reverse reverseEach round size sort splitEachLine step subMap ' +
	        'times toInteger toList tokenize upto waitForOrKill withPrintWriter withReader ' +
	        'withStream withWriter withWriterAppend write writeLine'
	    },
	    contains: [
	      hljs.C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE,
	      hljs.APOS_STRING_MODE,
	      hljs.QUOTE_STRING_MODE,
	      hljs.NUMBER_MODE,
	      hljs.REGEXP_MODE

	    ]
	  };
	}

	var gradle_1 = gradle;

	/**
	 * @param {string} value
	 * @returns {RegExp}
	 * */
	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function source$5(re) {
	  if (!re) return null;
	  if (typeof re === "string") return re;

	  return re.source;
	}

	/**
	 * @param {...(RegExp | string) } args
	 * @returns {string}
	 */
	function concat$4(...args) {
	  const joined = args.map((x) => source$5(x)).join("");
	  return joined;
	}

	/*
	Language: HTTP
	Description: HTTP request and response headers with automatic body highlighting
	Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
	Category: common, protocols
	Website: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
	*/

	function http(hljs) {
	  const VERSION = 'HTTP/(2|1\\.[01])';
	  const HEADER_NAME = /[A-Za-z][A-Za-z0-9-]*/;
	  const HEADERS_AND_BODY = [
	    {
	      className: 'attribute',
	      begin: concat$4('^', HEADER_NAME, '(?=\\:\\s)'),
	      starts: {
	        contains: [
	          {
	            className: "punctuation",
	            begin: /: /,
	            relevance: 0,
	            starts: {
	              end: '$',
	              relevance: 0
	            }
	          }
	        ]
	      }
	    },
	    {
	      begin: '\\n\\n',
	      starts: { subLanguage: [], endsWithParent: true }
	    }
	  ];

	  return {
	    name: 'HTTP',
	    aliases: ['https'],
	    illegal: /\S/,
	    contains: [
	      // response
	      {
	        begin: '^(?=' + VERSION + " \\d{3})",
	        end: /$/,
	        contains: [
	          {
	            className: "meta",
	            begin: VERSION
	          },
	          {
	            className: 'number', begin: '\\b\\d{3}\\b'
	          }
	        ],
	        starts: {
	          end: /\b\B/,
	          illegal: /\S/,
	          contains: HEADERS_AND_BODY
	        }
	      },
	      // request
	      {
	        begin: '(?=^[A-Z]+ (.*?) ' + VERSION + '$)',
	        end: /$/,
	        contains: [
	          {
	            className: 'string',
	            begin: ' ',
	            end: ' ',
	            excludeBegin: true,
	            excludeEnd: true
	          },
	          {
	            className: "meta",
	            begin: VERSION
	          },
	          {
	            className: 'keyword',
	            begin: '[A-Z]+'
	          }
	        ],
	        starts: {
	          end: /\b\B/,
	          illegal: /\S/,
	          contains: HEADERS_AND_BODY
	        }
	      }
	    ]
	  };
	}

	var http_1 = http;

	// https://docs.oracle.com/javase/specs/jls/se15/html/jls-3.html#jls-3.10
	var decimalDigits$1 = '[0-9](_*[0-9])*';
	var frac$1 = `\\.(${decimalDigits$1})`;
	var hexDigits$1 = '[0-9a-fA-F](_*[0-9a-fA-F])*';
	var NUMERIC$1 = {
	  className: 'number',
	  variants: [
	    // DecimalFloatingPointLiteral
	    // including ExponentPart
	    { begin: `(\\b(${decimalDigits$1})((${frac$1})|\\.)?|(${frac$1}))` +
	      `[eE][+-]?(${decimalDigits$1})[fFdD]?\\b` },
	    // excluding ExponentPart
	    { begin: `\\b(${decimalDigits$1})((${frac$1})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
	    { begin: `(${frac$1})[fFdD]?\\b` },
	    { begin: `\\b(${decimalDigits$1})[fFdD]\\b` },

	    // HexadecimalFloatingPointLiteral
	    { begin: `\\b0[xX]((${hexDigits$1})\\.?|(${hexDigits$1})?\\.(${hexDigits$1}))` +
	      `[pP][+-]?(${decimalDigits$1})[fFdD]?\\b` },

	    // DecimalIntegerLiteral
	    { begin: '\\b(0|[1-9](_*[0-9])*)[lL]?\\b' },

	    // HexIntegerLiteral
	    { begin: `\\b0[xX](${hexDigits$1})[lL]?\\b` },

	    // OctalIntegerLiteral
	    { begin: '\\b0(_*[0-7])*[lL]?\\b' },

	    // BinaryIntegerLiteral
	    { begin: '\\b0[bB][01](_*[01])*[lL]?\\b' },
	  ],
	  relevance: 0
	};

	/*
	Language: Java
	Author: Vsevolod Solovyov <vsevolod.solovyov@gmail.com>
	Category: common, enterprise
	Website: https://www.java.com/
	*/

	function java(hljs) {
	  var JAVA_IDENT_RE = '[\u00C0-\u02B8a-zA-Z_$][\u00C0-\u02B8a-zA-Z_$0-9]*';
	  var GENERIC_IDENT_RE = JAVA_IDENT_RE + '(<' + JAVA_IDENT_RE + '(\\s*,\\s*' + JAVA_IDENT_RE + ')*>)?';
	  var KEYWORDS = 'false synchronized int abstract float private char boolean var static null if const ' +
	    'for true while long strictfp finally protected import native final void ' +
	    'enum else break transient catch instanceof byte super volatile case assert short ' +
	    'package default double public try this switch continue throws protected public private ' +
	    'module requires exports do';

	  var ANNOTATION = {
	    className: 'meta',
	    begin: '@' + JAVA_IDENT_RE,
	    contains: [
	      {
	        begin: /\(/,
	        end: /\)/,
	        contains: ["self"] // allow nested () inside our annotation
	      },
	    ]
	  };
	  const NUMBER = NUMERIC$1;

	  return {
	    name: 'Java',
	    aliases: ['jsp'],
	    keywords: KEYWORDS,
	    illegal: /<\/|#/,
	    contains: [
	      hljs.COMMENT(
	        '/\\*\\*',
	        '\\*/',
	        {
	          relevance: 0,
	          contains: [
	            {
	              // eat up @'s in emails to prevent them to be recognized as doctags
	              begin: /\w+@/, relevance: 0
	            },
	            {
	              className: 'doctag',
	              begin: '@[A-Za-z]+'
	            }
	          ]
	        }
	      ),
	      // relevance boost
	      {
	        begin: /import java\.[a-z]+\./,
	        keywords: "import",
	        relevance: 2
	      },
	      hljs.C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE,
	      hljs.APOS_STRING_MODE,
	      hljs.QUOTE_STRING_MODE,
	      {
	        className: 'class',
	        beginKeywords: 'class interface enum', end: /[{;=]/, excludeEnd: true,
	        // TODO: can this be removed somehow?
	        // an extra boost because Java is more popular than other languages with
	        // this same syntax feature (this is just to preserve our tests passing
	        // for now)
	        relevance: 1,
	        keywords: 'class interface enum',
	        illegal: /[:"\[\]]/,
	        contains: [
	          { beginKeywords: 'extends implements' },
	          hljs.UNDERSCORE_TITLE_MODE
	        ]
	      },
	      {
	        // Expression keywords prevent 'keyword Name(...)' from being
	        // recognized as a function definition
	        beginKeywords: 'new throw return else',
	        relevance: 0
	      },
	      {
	        className: 'class',
	        begin: 'record\\s+' + hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
	        returnBegin: true,
	        excludeEnd: true,
	        end: /[{;=]/,
	        keywords: KEYWORDS,
	        contains: [
	          { beginKeywords: "record" },
	          {
	            begin: hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
	            returnBegin: true,
	            relevance: 0,
	            contains: [hljs.UNDERSCORE_TITLE_MODE]
	          },
	          {
	            className: 'params',
	            begin: /\(/, end: /\)/,
	            keywords: KEYWORDS,
	            relevance: 0,
	            contains: [
	              hljs.C_BLOCK_COMMENT_MODE
	            ]
	          },
	          hljs.C_LINE_COMMENT_MODE,
	          hljs.C_BLOCK_COMMENT_MODE
	        ]
	      },
	      {
	        className: 'function',
	        begin: '(' + GENERIC_IDENT_RE + '\\s+)+' + hljs.UNDERSCORE_IDENT_RE + '\\s*\\(', returnBegin: true, end: /[{;=]/,
	        excludeEnd: true,
	        keywords: KEYWORDS,
	        contains: [
	          {
	            begin: hljs.UNDERSCORE_IDENT_RE + '\\s*\\(', returnBegin: true,
	            relevance: 0,
	            contains: [hljs.UNDERSCORE_TITLE_MODE]
	          },
	          {
	            className: 'params',
	            begin: /\(/, end: /\)/,
	            keywords: KEYWORDS,
	            relevance: 0,
	            contains: [
	              ANNOTATION,
	              hljs.APOS_STRING_MODE,
	              hljs.QUOTE_STRING_MODE,
	              NUMBER,
	              hljs.C_BLOCK_COMMENT_MODE
	            ]
	          },
	          hljs.C_LINE_COMMENT_MODE,
	          hljs.C_BLOCK_COMMENT_MODE
	        ]
	      },
	      NUMBER,
	      ANNOTATION
	    ]
	  };
	}

	var java_1 = java;

	/*
	Language: JSON
	Description: JSON (JavaScript Object Notation) is a lightweight data-interchange format.
	Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
	Website: http://www.json.org
	Category: common, protocols
	*/
	function json(hljs) {
	  const LITERALS = {
	    literal: 'true false null'
	  };
	  const ALLOWED_COMMENTS = [
	    hljs.C_LINE_COMMENT_MODE,
	    hljs.C_BLOCK_COMMENT_MODE
	  ];
	  const TYPES = [
	    hljs.QUOTE_STRING_MODE,
	    hljs.C_NUMBER_MODE
	  ];
	  const VALUE_CONTAINER = {
	    end: ',',
	    endsWithParent: true,
	    excludeEnd: true,
	    contains: TYPES,
	    keywords: LITERALS
	  };
	  const OBJECT = {
	    begin: /\{/,
	    end: /\}/,
	    contains: [
	      {
	        className: 'attr',
	        begin: /"/,
	        end: /"/,
	        contains: [hljs.BACKSLASH_ESCAPE],
	        illegal: '\\n'
	      },
	      hljs.inherit(VALUE_CONTAINER, {
	        begin: /:/
	      })
	    ].concat(ALLOWED_COMMENTS),
	    illegal: '\\S'
	  };
	  const ARRAY = {
	    begin: '\\[',
	    end: '\\]',
	    contains: [hljs.inherit(VALUE_CONTAINER)], // inherit is a workaround for a bug that makes shared modes with endsWithParent compile only the ending of one of the parents
	    illegal: '\\S'
	  };
	  TYPES.push(OBJECT, ARRAY);
	  ALLOWED_COMMENTS.forEach(function(rule) {
	    TYPES.push(rule);
	  });
	  return {
	    name: 'JSON',
	    contains: TYPES,
	    keywords: LITERALS,
	    illegal: '\\S'
	  };
	}

	var json_1 = json;

	// https://docs.oracle.com/javase/specs/jls/se15/html/jls-3.html#jls-3.10
	var decimalDigits = '[0-9](_*[0-9])*';
	var frac = `\\.(${decimalDigits})`;
	var hexDigits = '[0-9a-fA-F](_*[0-9a-fA-F])*';
	var NUMERIC = {
	  className: 'number',
	  variants: [
	    // DecimalFloatingPointLiteral
	    // including ExponentPart
	    { begin: `(\\b(${decimalDigits})((${frac})|\\.)?|(${frac}))` +
	      `[eE][+-]?(${decimalDigits})[fFdD]?\\b` },
	    // excluding ExponentPart
	    { begin: `\\b(${decimalDigits})((${frac})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
	    { begin: `(${frac})[fFdD]?\\b` },
	    { begin: `\\b(${decimalDigits})[fFdD]\\b` },

	    // HexadecimalFloatingPointLiteral
	    { begin: `\\b0[xX]((${hexDigits})\\.?|(${hexDigits})?\\.(${hexDigits}))` +
	      `[pP][+-]?(${decimalDigits})[fFdD]?\\b` },

	    // DecimalIntegerLiteral
	    { begin: '\\b(0|[1-9](_*[0-9])*)[lL]?\\b' },

	    // HexIntegerLiteral
	    { begin: `\\b0[xX](${hexDigits})[lL]?\\b` },

	    // OctalIntegerLiteral
	    { begin: '\\b0(_*[0-7])*[lL]?\\b' },

	    // BinaryIntegerLiteral
	    { begin: '\\b0[bB][01](_*[01])*[lL]?\\b' },
	  ],
	  relevance: 0
	};

	/*
	 Language: Kotlin
	 Description: Kotlin is an OSS statically typed programming language that targets the JVM, Android, JavaScript and Native.
	 Author: Sergey Mashkov <cy6erGn0m@gmail.com>
	 Website: https://kotlinlang.org
	 Category: common
	 */

	function kotlin(hljs) {
	  const KEYWORDS = {
	    keyword:
	      'abstract as val var vararg get set class object open private protected public noinline ' +
	      'crossinline dynamic final enum if else do while for when throw try catch finally ' +
	      'import package is in fun override companion reified inline lateinit init ' +
	      'interface annotation data sealed internal infix operator out by constructor super ' +
	      'tailrec where const inner suspend typealias external expect actual',
	    built_in:
	      'Byte Short Char Int Long Boolean Float Double Void Unit Nothing',
	    literal:
	      'true false null'
	  };
	  const KEYWORDS_WITH_LABEL = {
	    className: 'keyword',
	    begin: /\b(break|continue|return|this)\b/,
	    starts: {
	      contains: [
	        {
	          className: 'symbol',
	          begin: /@\w+/
	        }
	      ]
	    }
	  };
	  const LABEL = {
	    className: 'symbol',
	    begin: hljs.UNDERSCORE_IDENT_RE + '@'
	  };

	  // for string templates
	  const SUBST = {
	    className: 'subst',
	    begin: /\$\{/,
	    end: /\}/,
	    contains: [ hljs.C_NUMBER_MODE ]
	  };
	  const VARIABLE = {
	    className: 'variable',
	    begin: '\\$' + hljs.UNDERSCORE_IDENT_RE
	  };
	  const STRING = {
	    className: 'string',
	    variants: [
	      {
	        begin: '"""',
	        end: '"""(?=[^"])',
	        contains: [
	          VARIABLE,
	          SUBST
	        ]
	      },
	      // Can't use built-in modes easily, as we want to use STRING in the meta
	      // context as 'meta-string' and there's no syntax to remove explicitly set
	      // classNames in built-in modes.
	      {
	        begin: '\'',
	        end: '\'',
	        illegal: /\n/,
	        contains: [ hljs.BACKSLASH_ESCAPE ]
	      },
	      {
	        begin: '"',
	        end: '"',
	        illegal: /\n/,
	        contains: [
	          hljs.BACKSLASH_ESCAPE,
	          VARIABLE,
	          SUBST
	        ]
	      }
	    ]
	  };
	  SUBST.contains.push(STRING);

	  const ANNOTATION_USE_SITE = {
	    className: 'meta',
	    begin: '@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*' + hljs.UNDERSCORE_IDENT_RE + ')?'
	  };
	  const ANNOTATION = {
	    className: 'meta',
	    begin: '@' + hljs.UNDERSCORE_IDENT_RE,
	    contains: [
	      {
	        begin: /\(/,
	        end: /\)/,
	        contains: [
	          hljs.inherit(STRING, {
	            className: 'meta-string'
	          })
	        ]
	      }
	    ]
	  };

	  // https://kotlinlang.org/docs/reference/whatsnew11.html#underscores-in-numeric-literals
	  // According to the doc above, the number mode of kotlin is the same as java 8,
	  // so the code below is copied from java.js
	  const KOTLIN_NUMBER_MODE = NUMERIC;
	  const KOTLIN_NESTED_COMMENT = hljs.COMMENT(
	    '/\\*', '\\*/',
	    {
	      contains: [ hljs.C_BLOCK_COMMENT_MODE ]
	    }
	  );
	  const KOTLIN_PAREN_TYPE = {
	    variants: [
	      {
	        className: 'type',
	        begin: hljs.UNDERSCORE_IDENT_RE
	      },
	      {
	        begin: /\(/,
	        end: /\)/,
	        contains: [] // defined later
	      }
	    ]
	  };
	  const KOTLIN_PAREN_TYPE2 = KOTLIN_PAREN_TYPE;
	  KOTLIN_PAREN_TYPE2.variants[1].contains = [ KOTLIN_PAREN_TYPE ];
	  KOTLIN_PAREN_TYPE.variants[1].contains = [ KOTLIN_PAREN_TYPE2 ];

	  return {
	    name: 'Kotlin',
	    aliases: [ 'kt' ],
	    keywords: KEYWORDS,
	    contains: [
	      hljs.COMMENT(
	        '/\\*\\*',
	        '\\*/',
	        {
	          relevance: 0,
	          contains: [
	            {
	              className: 'doctag',
	              begin: '@[A-Za-z]+'
	            }
	          ]
	        }
	      ),
	      hljs.C_LINE_COMMENT_MODE,
	      KOTLIN_NESTED_COMMENT,
	      KEYWORDS_WITH_LABEL,
	      LABEL,
	      ANNOTATION_USE_SITE,
	      ANNOTATION,
	      {
	        className: 'function',
	        beginKeywords: 'fun',
	        end: '[(]|$',
	        returnBegin: true,
	        excludeEnd: true,
	        keywords: KEYWORDS,
	        relevance: 5,
	        contains: [
	          {
	            begin: hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
	            returnBegin: true,
	            relevance: 0,
	            contains: [ hljs.UNDERSCORE_TITLE_MODE ]
	          },
	          {
	            className: 'type',
	            begin: /</,
	            end: />/,
	            keywords: 'reified',
	            relevance: 0
	          },
	          {
	            className: 'params',
	            begin: /\(/,
	            end: /\)/,
	            endsParent: true,
	            keywords: KEYWORDS,
	            relevance: 0,
	            contains: [
	              {
	                begin: /:/,
	                end: /[=,\/]/,
	                endsWithParent: true,
	                contains: [
	                  KOTLIN_PAREN_TYPE,
	                  hljs.C_LINE_COMMENT_MODE,
	                  KOTLIN_NESTED_COMMENT
	                ],
	                relevance: 0
	              },
	              hljs.C_LINE_COMMENT_MODE,
	              KOTLIN_NESTED_COMMENT,
	              ANNOTATION_USE_SITE,
	              ANNOTATION,
	              STRING,
	              hljs.C_NUMBER_MODE
	            ]
	          },
	          KOTLIN_NESTED_COMMENT
	        ]
	      },
	      {
	        className: 'class',
	        beginKeywords: 'class interface trait', // remove 'trait' when removed from KEYWORDS
	        end: /[:\{(]|$/,
	        excludeEnd: true,
	        illegal: 'extends implements',
	        contains: [
	          {
	            beginKeywords: 'public protected internal private constructor'
	          },
	          hljs.UNDERSCORE_TITLE_MODE,
	          {
	            className: 'type',
	            begin: /</,
	            end: />/,
	            excludeBegin: true,
	            excludeEnd: true,
	            relevance: 0
	          },
	          {
	            className: 'type',
	            begin: /[,:]\s*/,
	            end: /[<\(,]|$/,
	            excludeBegin: true,
	            returnEnd: true
	          },
	          ANNOTATION_USE_SITE,
	          ANNOTATION
	        ]
	      },
	      STRING,
	      {
	        className: 'meta',
	        begin: "^#!/usr/bin/env",
	        end: '$',
	        illegal: '\n'
	      },
	      KOTLIN_NUMBER_MODE
	    ]
	  };
	}

	var kotlin_1 = kotlin;

	/**
	 * @param {string} value
	 * @returns {RegExp}
	 * */
	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function source$4(re) {
	  if (!re) return null;
	  if (typeof re === "string") return re;

	  return re.source;
	}

	/**
	 * Any of the passed expresssions may match
	 *
	 * Creates a huge this | this | that | that match
	 * @param {(RegExp | string)[] } args
	 * @returns {string}
	 */
	function either$2(...args) {
	  const joined = '(' + args.map((x) => source$4(x)).join("|") + ")";
	  return joined;
	}

	/*
	Language: LaTeX
	Author: Benedikt Wilde <bwilde@posteo.de>
	Website: https://www.latex-project.org
	Category: markup
	*/

	/** @type LanguageFn */
	function latex(hljs) {
	  const KNOWN_CONTROL_WORDS = either$2(...[
	      '(?:NeedsTeXFormat|RequirePackage|GetIdInfo)',
	      'Provides(?:Expl)?(?:Package|Class|File)',
	      '(?:DeclareOption|ProcessOptions)',
	      '(?:documentclass|usepackage|input|include)',
	      'makeat(?:letter|other)',
	      'ExplSyntax(?:On|Off)',
	      '(?:new|renew|provide)?command',
	      '(?:re)newenvironment',
	      '(?:New|Renew|Provide|Declare)(?:Expandable)?DocumentCommand',
	      '(?:New|Renew|Provide|Declare)DocumentEnvironment',
	      '(?:(?:e|g|x)?def|let)',
	      '(?:begin|end)',
	      '(?:part|chapter|(?:sub){0,2}section|(?:sub)?paragraph)',
	      'caption',
	      '(?:label|(?:eq|page|name)?ref|(?:paren|foot|super)?cite)',
	      '(?:alpha|beta|[Gg]amma|[Dd]elta|(?:var)?epsilon|zeta|eta|[Tt]heta|vartheta)',
	      '(?:iota|(?:var)?kappa|[Ll]ambda|mu|nu|[Xx]i|[Pp]i|varpi|(?:var)rho)',
	      '(?:[Ss]igma|varsigma|tau|[Uu]psilon|[Pp]hi|varphi|chi|[Pp]si|[Oo]mega)',
	      '(?:frac|sum|prod|lim|infty|times|sqrt|leq|geq|left|right|middle|[bB]igg?)',
	      '(?:[lr]angle|q?quad|[lcvdi]?dots|d?dot|hat|tilde|bar)'
	    ].map(word => word + '(?![a-zA-Z@:_])'));
	  const L3_REGEX = new RegExp([
	      // A function \module_function_name:signature or \__module_function_name:signature,
	      // where both module and function_name need at least two characters and
	      // function_name may contain single underscores.
	      '(?:__)?[a-zA-Z]{2,}_[a-zA-Z](?:_?[a-zA-Z])+:[a-zA-Z]*',
	      // A variable \scope_module_and_name_type or \scope__module_ane_name_type,
	      // where scope is one of l, g or c, type needs at least two characters
	      // and module_and_name may contain single underscores.
	      '[lgc]__?[a-zA-Z](?:_?[a-zA-Z])*_[a-zA-Z]{2,}',
	      // A quark \q_the_name or \q__the_name or
	      // scan mark \s_the_name or \s__vthe_name,
	      // where variable_name needs at least two characters and
	      // may contain single underscores.
	      '[qs]__?[a-zA-Z](?:_?[a-zA-Z])+',
	      // Other LaTeX3 macro names that are not covered by the three rules above.
	      'use(?:_i)?:[a-zA-Z]*',
	      '(?:else|fi|or):',
	      '(?:if|cs|exp):w',
	      '(?:hbox|vbox):n',
	      '::[a-zA-Z]_unbraced',
	      '::[a-zA-Z:]'
	    ].map(pattern => pattern + '(?![a-zA-Z:_])').join('|'));
	  const L2_VARIANTS = [
	    {begin: /[a-zA-Z@]+/}, // control word
	    {begin: /[^a-zA-Z@]?/} // control symbol
	  ];
	  const DOUBLE_CARET_VARIANTS = [
	    {begin: /\^{6}[0-9a-f]{6}/},
	    {begin: /\^{5}[0-9a-f]{5}/},
	    {begin: /\^{4}[0-9a-f]{4}/},
	    {begin: /\^{3}[0-9a-f]{3}/},
	    {begin: /\^{2}[0-9a-f]{2}/},
	    {begin: /\^{2}[\u0000-\u007f]/}
	  ];
	  const CONTROL_SEQUENCE = {
	    className: 'keyword',
	    begin: /\\/,
	    relevance: 0,
	    contains: [
	      {
	        endsParent: true,
	        begin: KNOWN_CONTROL_WORDS
	      },
	      {
	        endsParent: true,
	        begin: L3_REGEX
	      },
	      {
	        endsParent: true,
	        variants: DOUBLE_CARET_VARIANTS
	      },
	      {
	        endsParent: true,
	        relevance: 0,
	        variants: L2_VARIANTS
	      }
	    ]
	  };
	  const MACRO_PARAM = {
	    className: 'params',
	    relevance: 0,
	    begin: /#+\d?/
	  };
	  const DOUBLE_CARET_CHAR = {
	    // relevance: 1
	    variants: DOUBLE_CARET_VARIANTS
	  };
	  const SPECIAL_CATCODE = {
	    className: 'built_in',
	    relevance: 0,
	    begin: /[$&^_]/
	  };
	  const MAGIC_COMMENT = {
	    className: 'meta',
	    begin: '% !TeX',
	    end: '$',
	    relevance: 10
	  };
	  const COMMENT = hljs.COMMENT(
	    '%',
	    '$',
	    {
	      relevance: 0
	    }
	  );
	  const EVERYTHING_BUT_VERBATIM = [
	    CONTROL_SEQUENCE,
	    MACRO_PARAM,
	    DOUBLE_CARET_CHAR,
	    SPECIAL_CATCODE,
	    MAGIC_COMMENT,
	    COMMENT
	  ];
	  const BRACE_GROUP_NO_VERBATIM = {
	    begin: /\{/, end: /\}/,
	    relevance: 0,
	    contains: ['self', ...EVERYTHING_BUT_VERBATIM]
	  };
	  const ARGUMENT_BRACES = hljs.inherit(
	    BRACE_GROUP_NO_VERBATIM,
	    {
	      relevance: 0,
	      endsParent: true,
	      contains: [BRACE_GROUP_NO_VERBATIM, ...EVERYTHING_BUT_VERBATIM]
	    }
	  );
	  const ARGUMENT_BRACKETS = {
	    begin: /\[/,
	      end: /\]/,
	    endsParent: true,
	    relevance: 0,
	    contains: [BRACE_GROUP_NO_VERBATIM, ...EVERYTHING_BUT_VERBATIM]
	  };
	  const SPACE_GOBBLER = {
	    begin: /\s+/,
	    relevance: 0
	  };
	  const ARGUMENT_M = [ARGUMENT_BRACES];
	  const ARGUMENT_O = [ARGUMENT_BRACKETS];
	  const ARGUMENT_AND_THEN = function(arg, starts_mode) {
	    return {
	      contains: [SPACE_GOBBLER],
	      starts: {
	        relevance: 0,
	        contains: arg,
	        starts: starts_mode
	      }
	    };
	  };
	  const CSNAME = function(csname, starts_mode) {
	    return {
	        begin: '\\\\' + csname + '(?![a-zA-Z@:_])',
	        keywords: {$pattern: /\\[a-zA-Z]+/, keyword: '\\' + csname},
	        relevance: 0,
	        contains: [SPACE_GOBBLER],
	        starts: starts_mode
	      };
	  };
	  const BEGIN_ENV = function(envname, starts_mode) {
	    return hljs.inherit(
	      {
	        begin: '\\\\begin(?=[ \t]*(\\r?\\n[ \t]*)?\\{' + envname + '\\})',
	        keywords: {$pattern: /\\[a-zA-Z]+/, keyword: '\\begin'},
	        relevance: 0,
	      },
	      ARGUMENT_AND_THEN(ARGUMENT_M, starts_mode)
	    );
	  };
	  const VERBATIM_DELIMITED_EQUAL = (innerName = "string") => {
	    return hljs.END_SAME_AS_BEGIN({
	      className: innerName,
	      begin: /(.|\r?\n)/,
	      end: /(.|\r?\n)/,
	      excludeBegin: true,
	      excludeEnd: true,
	      endsParent: true
	    });
	  };
	  const VERBATIM_DELIMITED_ENV = function(envname) {
	    return {
	      className: 'string',
	      end: '(?=\\\\end\\{' + envname + '\\})'
	    };
	  };

	  const VERBATIM_DELIMITED_BRACES = (innerName = "string") => {
	    return {
	      relevance: 0,
	      begin: /\{/,
	      starts: {
	        endsParent: true,
	        contains: [
	          {
	            className: innerName,
	            end: /(?=\})/,
	            endsParent:true,
	            contains: [
	              {
	                begin: /\{/,
	                end: /\}/,
	                relevance: 0,
	                contains: ["self"]
	              }
	            ],
	          }
	        ]
	      }
	    };
	  };
	  const VERBATIM = [
	    ...['verb', 'lstinline'].map(csname => CSNAME(csname, {contains: [VERBATIM_DELIMITED_EQUAL()]})),
	    CSNAME('mint', ARGUMENT_AND_THEN(ARGUMENT_M, {contains: [VERBATIM_DELIMITED_EQUAL()]})),
	    CSNAME('mintinline', ARGUMENT_AND_THEN(ARGUMENT_M, {contains: [VERBATIM_DELIMITED_BRACES(), VERBATIM_DELIMITED_EQUAL()]})),
	    CSNAME('url', {contains: [VERBATIM_DELIMITED_BRACES("link"), VERBATIM_DELIMITED_BRACES("link")]}),
	    CSNAME('hyperref', {contains: [VERBATIM_DELIMITED_BRACES("link")]}),
	    CSNAME('href', ARGUMENT_AND_THEN(ARGUMENT_O, {contains: [VERBATIM_DELIMITED_BRACES("link")]})),
	    ...[].concat(...['', '\\*'].map(suffix => [
	      BEGIN_ENV('verbatim' + suffix, VERBATIM_DELIMITED_ENV('verbatim' + suffix)),
	      BEGIN_ENV('filecontents' + suffix,  ARGUMENT_AND_THEN(ARGUMENT_M, VERBATIM_DELIMITED_ENV('filecontents' + suffix))),
	      ...['', 'B', 'L'].map(prefix =>
	        BEGIN_ENV(prefix + 'Verbatim' + suffix, ARGUMENT_AND_THEN(ARGUMENT_O, VERBATIM_DELIMITED_ENV(prefix + 'Verbatim' + suffix)))
	      )
	    ])),
	    BEGIN_ENV('minted', ARGUMENT_AND_THEN(ARGUMENT_O, ARGUMENT_AND_THEN(ARGUMENT_M, VERBATIM_DELIMITED_ENV('minted')))),
	  ];

	  return {
	    name: 'LaTeX',
	    aliases: ['TeX'],
	    contains: [
	      ...VERBATIM,
	      ...EVERYTHING_BUT_VERBATIM
	    ]
	  };
	}

	var latex_1 = latex;

	/*
	Language: Lua
	Description: Lua is a powerful, efficient, lightweight, embeddable scripting language.
	Author: Andrew Fedorov <dmmdrs@mail.ru>
	Category: common, scripting
	Website: https://www.lua.org
	*/
	function lua(hljs) {
	  const OPENING_LONG_BRACKET = '\\[=*\\[';
	  const CLOSING_LONG_BRACKET = '\\]=*\\]';
	  const LONG_BRACKETS = {
	    begin: OPENING_LONG_BRACKET,
	    end: CLOSING_LONG_BRACKET,
	    contains: ['self']
	  };
	  const COMMENTS = [
	    hljs.COMMENT('--(?!' + OPENING_LONG_BRACKET + ')', '$'),
	    hljs.COMMENT(
	      '--' + OPENING_LONG_BRACKET,
	      CLOSING_LONG_BRACKET,
	      {
	        contains: [LONG_BRACKETS],
	        relevance: 10
	      }
	    )
	  ];
	  return {
	    name: 'Lua',
	    keywords: {
	      $pattern: hljs.UNDERSCORE_IDENT_RE,
	      literal: "true false nil",
	      keyword: "and break do else elseif end for goto if in local not or repeat return then until while",
	      built_in:
	        // Metatags and globals:
	        '_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len ' +
	        '__gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert ' +
	        // Standard methods and properties:
	        'collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring ' +
	        'module next pairs pcall print rawequal rawget rawset require select setfenv ' +
	        'setmetatable tonumber tostring type unpack xpcall arg self ' +
	        // Library methods and properties (one line per library):
	        'coroutine resume yield status wrap create running debug getupvalue ' +
	        'debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv ' +
	        'io lines write close flush open output type read stderr stdin input stdout popen tmpfile ' +
	        'math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan ' +
	        'os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall ' +
	        'string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower ' +
	        'table setn insert getn foreachi maxn foreach concat sort remove'
	    },
	    contains: COMMENTS.concat([
	      {
	        className: 'function',
	        beginKeywords: 'function',
	        end: '\\)',
	        contains: [
	          hljs.inherit(hljs.TITLE_MODE, {
	            begin: '([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*'
	          }),
	          {
	            className: 'params',
	            begin: '\\(',
	            endsWithParent: true,
	            contains: COMMENTS
	          }
	        ].concat(COMMENTS)
	      },
	      hljs.C_NUMBER_MODE,
	      hljs.APOS_STRING_MODE,
	      hljs.QUOTE_STRING_MODE,
	      {
	        className: 'string',
	        begin: OPENING_LONG_BRACKET,
	        end: CLOSING_LONG_BRACKET,
	        contains: [LONG_BRACKETS],
	        relevance: 5
	      }
	    ])
	  };
	}

	var lua_1 = lua;

	/*
	Language: Makefile
	Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
	Contributors: Joël Porquet <joel@porquet.org>
	Website: https://www.gnu.org/software/make/manual/html_node/Introduction.html
	Category: common
	*/
	function makefile(hljs) {
	  /* Variables: simple (eg $(var)) and special (eg $@) */
	  const VARIABLE = {
	    className: 'variable',
	    variants: [
	      {
	        begin: '\\$\\(' + hljs.UNDERSCORE_IDENT_RE + '\\)',
	        contains: [ hljs.BACKSLASH_ESCAPE ]
	      },
	      {
	        begin: /\$[@%<?\^\+\*]/
	      }
	    ]
	  };
	  /* Quoted string with variables inside */
	  const QUOTE_STRING = {
	    className: 'string',
	    begin: /"/,
	    end: /"/,
	    contains: [
	      hljs.BACKSLASH_ESCAPE,
	      VARIABLE
	    ]
	  };
	  /* Function: $(func arg,...) */
	  const FUNC = {
	    className: 'variable',
	    begin: /\$\([\w-]+\s/,
	    end: /\)/,
	    keywords: {
	      built_in:
	        'subst patsubst strip findstring filter filter-out sort ' +
	        'word wordlist firstword lastword dir notdir suffix basename ' +
	        'addsuffix addprefix join wildcard realpath abspath error warning ' +
	        'shell origin flavor foreach if or and call eval file value'
	    },
	    contains: [ VARIABLE ]
	  };
	  /* Variable assignment */
	  const ASSIGNMENT = {
	    begin: '^' + hljs.UNDERSCORE_IDENT_RE + '\\s*(?=[:+?]?=)'
	  };
	  /* Meta targets (.PHONY) */
	  const META = {
	    className: 'meta',
	    begin: /^\.PHONY:/,
	    end: /$/,
	    keywords: {
	      $pattern: /[\.\w]+/,
	      'meta-keyword': '.PHONY'
	    }
	  };
	  /* Targets */
	  const TARGET = {
	    className: 'section',
	    begin: /^[^\s]+:/,
	    end: /$/,
	    contains: [ VARIABLE ]
	  };
	  return {
	    name: 'Makefile',
	    aliases: [
	      'mk',
	      'mak',
	      'make',
	    ],
	    keywords: {
	      $pattern: /[\w-]+/,
	      keyword: 'define endef undefine ifdef ifndef ifeq ifneq else endif ' +
	      'include -include sinclude override export unexport private vpath'
	    },
	    contains: [
	      hljs.HASH_COMMENT_MODE,
	      VARIABLE,
	      QUOTE_STRING,
	      FUNC,
	      ASSIGNMENT,
	      META,
	      TARGET
	    ]
	  };
	}

	var makefile_1 = makefile;

	/**
	 * @param {string} value
	 * @returns {RegExp}
	 * */
	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function source$3(re) {
	  if (!re) return null;
	  if (typeof re === "string") return re;

	  return re.source;
	}

	/**
	 * @param {...(RegExp | string) } args
	 * @returns {string}
	 */
	function concat$3(...args) {
	  const joined = args.map((x) => source$3(x)).join("");
	  return joined;
	}

	/*
	Language: Markdown
	Requires: xml.js
	Author: John Crepezzi <john.crepezzi@gmail.com>
	Website: https://daringfireball.net/projects/markdown/
	Category: common, markup
	*/

	function markdown(hljs) {
	  const INLINE_HTML = {
	    begin: /<\/?[A-Za-z_]/,
	    end: '>',
	    subLanguage: 'xml',
	    relevance: 0
	  };
	  const HORIZONTAL_RULE = {
	    begin: '^[-\\*]{3,}',
	    end: '$'
	  };
	  const CODE = {
	    className: 'code',
	    variants: [
	      // TODO: fix to allow these to work with sublanguage also
	      {
	        begin: '(`{3,})[^`](.|\\n)*?\\1`*[ ]*'
	      },
	      {
	        begin: '(~{3,})[^~](.|\\n)*?\\1~*[ ]*'
	      },
	      // needed to allow markdown as a sublanguage to work
	      {
	        begin: '```',
	        end: '```+[ ]*$'
	      },
	      {
	        begin: '~~~',
	        end: '~~~+[ ]*$'
	      },
	      {
	        begin: '`.+?`'
	      },
	      {
	        begin: '(?=^( {4}|\\t))',
	        // use contains to gobble up multiple lines to allow the block to be whatever size
	        // but only have a single open/close tag vs one per line
	        contains: [
	          {
	            begin: '^( {4}|\\t)',
	            end: '(\\n)$'
	          }
	        ],
	        relevance: 0
	      }
	    ]
	  };
	  const LIST = {
	    className: 'bullet',
	    begin: '^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)',
	    end: '\\s+',
	    excludeEnd: true
	  };
	  const LINK_REFERENCE = {
	    begin: /^\[[^\n]+\]:/,
	    returnBegin: true,
	    contains: [
	      {
	        className: 'symbol',
	        begin: /\[/,
	        end: /\]/,
	        excludeBegin: true,
	        excludeEnd: true
	      },
	      {
	        className: 'link',
	        begin: /:\s*/,
	        end: /$/,
	        excludeBegin: true
	      }
	    ]
	  };
	  const URL_SCHEME = /[A-Za-z][A-Za-z0-9+.-]*/;
	  const LINK = {
	    variants: [
	      // too much like nested array access in so many languages
	      // to have any real relevance
	      {
	        begin: /\[.+?\]\[.*?\]/,
	        relevance: 0
	      },
	      // popular internet URLs
	      {
	        begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
	        relevance: 2
	      },
	      {
	        begin: concat$3(/\[.+?\]\(/, URL_SCHEME, /:\/\/.*?\)/),
	        relevance: 2
	      },
	      // relative urls
	      {
	        begin: /\[.+?\]\([./?&#].*?\)/,
	        relevance: 1
	      },
	      // whatever else, lower relevance (might not be a link at all)
	      {
	        begin: /\[.+?\]\(.*?\)/,
	        relevance: 0
	      }
	    ],
	    returnBegin: true,
	    contains: [
	      {
	        className: 'string',
	        relevance: 0,
	        begin: '\\[',
	        end: '\\]',
	        excludeBegin: true,
	        returnEnd: true
	      },
	      {
	        className: 'link',
	        relevance: 0,
	        begin: '\\]\\(',
	        end: '\\)',
	        excludeBegin: true,
	        excludeEnd: true
	      },
	      {
	        className: 'symbol',
	        relevance: 0,
	        begin: '\\]\\[',
	        end: '\\]',
	        excludeBegin: true,
	        excludeEnd: true
	      }
	    ]
	  };
	  const BOLD = {
	    className: 'strong',
	    contains: [], // defined later
	    variants: [
	      {
	        begin: /_{2}/,
	        end: /_{2}/
	      },
	      {
	        begin: /\*{2}/,
	        end: /\*{2}/
	      }
	    ]
	  };
	  const ITALIC = {
	    className: 'emphasis',
	    contains: [], // defined later
	    variants: [
	      {
	        begin: /\*(?!\*)/,
	        end: /\*/
	      },
	      {
	        begin: /_(?!_)/,
	        end: /_/,
	        relevance: 0
	      }
	    ]
	  };
	  BOLD.contains.push(ITALIC);
	  ITALIC.contains.push(BOLD);

	  let CONTAINABLE = [
	    INLINE_HTML,
	    LINK
	  ];

	  BOLD.contains = BOLD.contains.concat(CONTAINABLE);
	  ITALIC.contains = ITALIC.contains.concat(CONTAINABLE);

	  CONTAINABLE = CONTAINABLE.concat(BOLD, ITALIC);

	  const HEADER = {
	    className: 'section',
	    variants: [
	      {
	        begin: '^#{1,6}',
	        end: '$',
	        contains: CONTAINABLE
	      },
	      {
	        begin: '(?=^.+?\\n[=-]{2,}$)',
	        contains: [
	          {
	            begin: '^[=-]*$'
	          },
	          {
	            begin: '^',
	            end: "\\n",
	            contains: CONTAINABLE
	          }
	        ]
	      }
	    ]
	  };

	  const BLOCKQUOTE = {
	    className: 'quote',
	    begin: '^>\\s+',
	    contains: CONTAINABLE,
	    end: '$'
	  };

	  return {
	    name: 'Markdown',
	    aliases: [
	      'md',
	      'mkdown',
	      'mkd'
	    ],
	    contains: [
	      HEADER,
	      INLINE_HTML,
	      LIST,
	      BOLD,
	      ITALIC,
	      BLOCKQUOTE,
	      CODE,
	      HORIZONTAL_RULE,
	      LINK,
	      LINK_REFERENCE
	    ]
	  };
	}

	var markdown_1 = markdown;

	/*
	Language: PHP
	Author: Victor Karamzin <Victor.Karamzin@enterra-inc.com>
	Contributors: Evgeny Stepanischev <imbolk@gmail.com>, Ivan Sagalaev <maniac@softwaremaniacs.org>
	Website: https://www.php.net
	Category: common
	*/
	/**
	 * @param {HLJSApi} hljs
	 * @returns {LanguageDetail}
	 * */
	function php(hljs) {
	  const VARIABLE = {
	    className: 'variable',
	    begin: '\\$+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*' +
	      // negative look-ahead tries to avoid matching patterns that are not
	      // Perl at all like $ident$, @ident@, etc.
	      `(?![A-Za-z0-9])(?![$])`
	  };
	  const PREPROCESSOR = {
	    className: 'meta',
	    variants: [
	      { begin: /<\?php/, relevance: 10 }, // boost for obvious PHP
	      { begin: /<\?[=]?/ },
	      { begin: /\?>/ } // end php tag
	    ]
	  };
	  const SUBST = {
	    className: 'subst',
	    variants: [
	      { begin: /\$\w+/ },
	      { begin: /\{\$/, end: /\}/ }
	    ]
	  };
	  const SINGLE_QUOTED = hljs.inherit(hljs.APOS_STRING_MODE, {
	    illegal: null,
	  });
	  const DOUBLE_QUOTED = hljs.inherit(hljs.QUOTE_STRING_MODE, {
	    illegal: null,
	    contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST),
	  });
	  const HEREDOC = hljs.END_SAME_AS_BEGIN({
	    begin: /<<<[ \t]*(\w+)\n/,
	    end: /[ \t]*(\w+)\b/,
	    contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST),
	  });
	  const STRING = {
	    className: 'string',
	    contains: [hljs.BACKSLASH_ESCAPE, PREPROCESSOR],
	    variants: [
	      hljs.inherit(SINGLE_QUOTED, {
	        begin: "b'", end: "'",
	      }),
	      hljs.inherit(DOUBLE_QUOTED, {
	        begin: 'b"', end: '"',
	      }),
	      DOUBLE_QUOTED,
	      SINGLE_QUOTED,
	      HEREDOC
	    ]
	  };
	  const NUMBER = {variants: [hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE]};
	  const KEYWORDS = {
	    keyword:
	    // Magic constants:
	    // <https://www.php.net/manual/en/language.constants.predefined.php>
	    '__CLASS__ __DIR__ __FILE__ __FUNCTION__ __LINE__ __METHOD__ __NAMESPACE__ __TRAIT__ ' +
	    // Function that look like language construct or language construct that look like function:
	    // List of keywords that may not require parenthesis
	    'die echo exit include include_once print require require_once ' +
	    // These are not language construct (function) but operate on the currently-executing function and can access the current symbol table
	    // 'compact extract func_get_arg func_get_args func_num_args get_called_class get_parent_class ' +
	    // Other keywords:
	    // <https://www.php.net/manual/en/reserved.php>
	    // <https://www.php.net/manual/en/language.types.type-juggling.php>
	    'array abstract and as binary bool boolean break callable case catch class clone const continue declare ' +
	    'default do double else elseif empty enddeclare endfor endforeach endif endswitch endwhile eval extends ' +
	    'final finally float for foreach from global goto if implements instanceof insteadof int integer interface ' +
	    'isset iterable list match|0 new object or private protected public real return string switch throw trait ' +
	    'try unset use var void while xor yield',
	    literal: 'false null true',
	    built_in:
	    // Standard PHP library:
	    // <https://www.php.net/manual/en/book.spl.php>
	    'Error|0 ' + // error is too common a name esp since PHP is case in-sensitive
	    'AppendIterator ArgumentCountError ArithmeticError ArrayIterator ArrayObject AssertionError BadFunctionCallException BadMethodCallException CachingIterator CallbackFilterIterator CompileError Countable DirectoryIterator DivisionByZeroError DomainException EmptyIterator ErrorException Exception FilesystemIterator FilterIterator GlobIterator InfiniteIterator InvalidArgumentException IteratorIterator LengthException LimitIterator LogicException MultipleIterator NoRewindIterator OutOfBoundsException OutOfRangeException OuterIterator OverflowException ParentIterator ParseError RangeException RecursiveArrayIterator RecursiveCachingIterator RecursiveCallbackFilterIterator RecursiveDirectoryIterator RecursiveFilterIterator RecursiveIterator RecursiveIteratorIterator RecursiveRegexIterator RecursiveTreeIterator RegexIterator RuntimeException SeekableIterator SplDoublyLinkedList SplFileInfo SplFileObject SplFixedArray SplHeap SplMaxHeap SplMinHeap SplObjectStorage SplObserver SplObserver SplPriorityQueue SplQueue SplStack SplSubject SplSubject SplTempFileObject TypeError UnderflowException UnexpectedValueException ' +
	    // Reserved interfaces:
	    // <https://www.php.net/manual/en/reserved.interfaces.php>
	    'ArrayAccess Closure Generator Iterator IteratorAggregate Serializable Throwable Traversable WeakReference ' +
	    // Reserved classes:
	    // <https://www.php.net/manual/en/reserved.classes.php>
	    'Directory __PHP_Incomplete_Class parent php_user_filter self static stdClass'
	  };
	  return {
	    aliases: ['php', 'php3', 'php4', 'php5', 'php6', 'php7', 'php8'],
	    case_insensitive: true,
	    keywords: KEYWORDS,
	    contains: [
	      hljs.HASH_COMMENT_MODE,
	      hljs.COMMENT('//', '$', {contains: [PREPROCESSOR]}),
	      hljs.COMMENT(
	        '/\\*',
	        '\\*/',
	        {
	          contains: [
	            {
	              className: 'doctag',
	              begin: '@[A-Za-z]+'
	            }
	          ]
	        }
	      ),
	      hljs.COMMENT(
	        '__halt_compiler.+?;',
	        false,
	        {
	          endsWithParent: true,
	          keywords: '__halt_compiler'
	        }
	      ),
	      PREPROCESSOR,
	      {
	        className: 'keyword', begin: /\$this\b/
	      },
	      VARIABLE,
	      {
	        // swallow composed identifiers to avoid parsing them as keywords
	        begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
	      },
	      {
	        className: 'function',
	        relevance: 0,
	        beginKeywords: 'fn function', end: /[;{]/, excludeEnd: true,
	        illegal: '[$%\\[]',
	        contains: [
	          hljs.UNDERSCORE_TITLE_MODE,
	          {
	            begin: '=>' // No markup, just a relevance booster
	          },
	          {
	            className: 'params',
	            begin: '\\(', end: '\\)',
	            excludeBegin: true,
	            excludeEnd: true,
	            keywords: KEYWORDS,
	            contains: [
	              'self',
	              VARIABLE,
	              hljs.C_BLOCK_COMMENT_MODE,
	              STRING,
	              NUMBER
	            ]
	          }
	        ]
	      },
	      {
	        className: 'class',
	        beginKeywords: 'class interface',
	        relevance: 0,
	        end: /\{/,
	        excludeEnd: true,
	        illegal: /[:($"]/,
	        contains: [
	          {beginKeywords: 'extends implements'},
	          hljs.UNDERSCORE_TITLE_MODE
	        ]
	      },
	      {
	        beginKeywords: 'namespace',
	        relevance: 0,
	        end: ';',
	        illegal: /[.']/,
	        contains: [hljs.UNDERSCORE_TITLE_MODE]
	      },
	      {
	        beginKeywords: 'use',
	        relevance: 0,
	        end: ';',
	        contains: [hljs.UNDERSCORE_TITLE_MODE]
	      },
	      STRING,
	      NUMBER
	    ]
	  };
	}

	var php_1 = php;

	/*
	Language: PowerShell
	Description: PowerShell is a task-based command-line shell and scripting language built on .NET.
	Author: David Mohundro <david@mohundro.com>
	Contributors: Nicholas Blumhardt <nblumhardt@nblumhardt.com>, Victor Zhou <OiCMudkips@users.noreply.github.com>, Nicolas Le Gall <contact@nlegall.fr>
	Website: https://docs.microsoft.com/en-us/powershell/
	*/
	function powershell(hljs) {
	  const TYPES = [
	    "string",
	    "char",
	    "byte",
	    "int",
	    "long",
	    "bool",
	    "decimal",
	    "single",
	    "double",
	    "DateTime",
	    "xml",
	    "array",
	    "hashtable",
	    "void"
	  ];

	  // https://docs.microsoft.com/en-us/powershell/scripting/developer/cmdlet/approved-verbs-for-windows-powershell-commands
	  const VALID_VERBS =
	    'Add|Clear|Close|Copy|Enter|Exit|Find|Format|Get|Hide|Join|Lock|' +
	    'Move|New|Open|Optimize|Pop|Push|Redo|Remove|Rename|Reset|Resize|' +
	    'Search|Select|Set|Show|Skip|Split|Step|Switch|Undo|Unlock|' +
	    'Watch|Backup|Checkpoint|Compare|Compress|Convert|ConvertFrom|' +
	    'ConvertTo|Dismount|Edit|Expand|Export|Group|Import|Initialize|' +
	    'Limit|Merge|Mount|Out|Publish|Restore|Save|Sync|Unpublish|Update|' +
	    'Approve|Assert|Build|Complete|Confirm|Deny|Deploy|Disable|Enable|Install|Invoke|' +
	    'Register|Request|Restart|Resume|Start|Stop|Submit|Suspend|Uninstall|' +
	    'Unregister|Wait|Debug|Measure|Ping|Repair|Resolve|Test|Trace|Connect|' +
	    'Disconnect|Read|Receive|Send|Write|Block|Grant|Protect|Revoke|Unblock|' +
	    'Unprotect|Use|ForEach|Sort|Tee|Where';

	  const COMPARISON_OPERATORS =
	    '-and|-as|-band|-bnot|-bor|-bxor|-casesensitive|-ccontains|-ceq|-cge|-cgt|' +
	    '-cle|-clike|-clt|-cmatch|-cne|-cnotcontains|-cnotlike|-cnotmatch|-contains|' +
	    '-creplace|-csplit|-eq|-exact|-f|-file|-ge|-gt|-icontains|-ieq|-ige|-igt|' +
	    '-ile|-ilike|-ilt|-imatch|-in|-ine|-inotcontains|-inotlike|-inotmatch|' +
	    '-ireplace|-is|-isnot|-isplit|-join|-le|-like|-lt|-match|-ne|-not|' +
	    '-notcontains|-notin|-notlike|-notmatch|-or|-regex|-replace|-shl|-shr|' +
	    '-split|-wildcard|-xor';

	  const KEYWORDS = {
	    $pattern: /-?[A-z\.\-]+\b/,
	    keyword:
	      'if else foreach return do while until elseif begin for trap data dynamicparam ' +
	      'end break throw param continue finally in switch exit filter try process catch ' +
	      'hidden static parameter',
	    // "echo" relevance has been set to 0 to avoid auto-detect conflicts with shell transcripts
	    built_in:
	      'ac asnp cat cd CFS chdir clc clear clhy cli clp cls clv cnsn compare copy cp ' +
	      'cpi cpp curl cvpa dbp del diff dir dnsn ebp echo|0 epal epcsv epsn erase etsn exsn fc fhx ' +
	      'fl ft fw gal gbp gc gcb gci gcm gcs gdr gerr ghy gi gin gjb gl gm gmo gp gps gpv group ' +
	      'gsn gsnp gsv gtz gu gv gwmi h history icm iex ihy ii ipal ipcsv ipmo ipsn irm ise iwmi ' +
	      'iwr kill lp ls man md measure mi mount move mp mv nal ndr ni nmo npssc nsn nv ogv oh ' +
	      'popd ps pushd pwd r rbp rcjb rcsn rd rdr ren ri rjb rm rmdir rmo rni rnp rp rsn rsnp ' +
	      'rujb rv rvpa rwmi sajb sal saps sasv sbp sc scb select set shcm si sl sleep sls sort sp ' +
	      'spjb spps spsv start stz sujb sv swmi tee trcm type wget where wjb write'
	    // TODO: 'validate[A-Z]+' can't work in keywords
	  };

	  const TITLE_NAME_RE = /\w[\w\d]*((-)[\w\d]+)*/;

	  const BACKTICK_ESCAPE = {
	    begin: '`[\\s\\S]',
	    relevance: 0
	  };

	  const VAR = {
	    className: 'variable',
	    variants: [
	      {
	        begin: /\$\B/
	      },
	      {
	        className: 'keyword',
	        begin: /\$this/
	      },
	      {
	        begin: /\$[\w\d][\w\d_:]*/
	      }
	    ]
	  };

	  const LITERAL = {
	    className: 'literal',
	    begin: /\$(null|true|false)\b/
	  };

	  const QUOTE_STRING = {
	    className: "string",
	    variants: [
	      {
	        begin: /"/,
	        end: /"/
	      },
	      {
	        begin: /@"/,
	        end: /^"@/
	      }
	    ],
	    contains: [
	      BACKTICK_ESCAPE,
	      VAR,
	      {
	        className: 'variable',
	        begin: /\$[A-z]/,
	        end: /[^A-z]/
	      }
	    ]
	  };

	  const APOS_STRING = {
	    className: 'string',
	    variants: [
	      {
	        begin: /'/,
	        end: /'/
	      },
	      {
	        begin: /@'/,
	        end: /^'@/
	      }
	    ]
	  };

	  const PS_HELPTAGS = {
	    className: "doctag",
	    variants: [
	      /* no paramater help tags */
	      {
	        begin: /\.(synopsis|description|example|inputs|outputs|notes|link|component|role|functionality)/
	      },
	      /* one parameter help tags */
	      {
	        begin: /\.(parameter|forwardhelptargetname|forwardhelpcategory|remotehelprunspace|externalhelp)\s+\S+/
	      }
	    ]
	  };

	  const PS_COMMENT = hljs.inherit(
	    hljs.COMMENT(null, null),
	    {
	      variants: [
	        /* single-line comment */
	        {
	          begin: /#/,
	          end: /$/
	        },
	        /* multi-line comment */
	        {
	          begin: /<#/,
	          end: /#>/
	        }
	      ],
	      contains: [ PS_HELPTAGS ]
	    }
	  );

	  const CMDLETS = {
	    className: 'built_in',
	    variants: [
	      {
	        begin: '('.concat(VALID_VERBS, ')+(-)[\\w\\d]+')
	      }
	    ]
	  };

	  const PS_CLASS = {
	    className: 'class',
	    beginKeywords: 'class enum',
	    end: /\s*[{]/,
	    excludeEnd: true,
	    relevance: 0,
	    contains: [ hljs.TITLE_MODE ]
	  };

	  const PS_FUNCTION = {
	    className: 'function',
	    begin: /function\s+/,
	    end: /\s*\{|$/,
	    excludeEnd: true,
	    returnBegin: true,
	    relevance: 0,
	    contains: [
	      {
	        begin: "function",
	        relevance: 0,
	        className: "keyword"
	      },
	      {
	        className: "title",
	        begin: TITLE_NAME_RE,
	        relevance: 0
	      },
	      {
	        begin: /\(/,
	        end: /\)/,
	        className: "params",
	        relevance: 0,
	        contains: [ VAR ]
	      }
	      // CMDLETS
	    ]
	  };

	  // Using statment, plus type, plus assembly name.
	  const PS_USING = {
	    begin: /using\s/,
	    end: /$/,
	    returnBegin: true,
	    contains: [
	      QUOTE_STRING,
	      APOS_STRING,
	      {
	        className: 'keyword',
	        begin: /(using|assembly|command|module|namespace|type)/
	      }
	    ]
	  };

	  // Comperison operators & function named parameters.
	  const PS_ARGUMENTS = {
	    variants: [
	      // PS literals are pretty verbose so it's a good idea to accent them a bit.
	      {
	        className: 'operator',
	        begin: '('.concat(COMPARISON_OPERATORS, ')\\b')
	      },
	      {
	        className: 'literal',
	        begin: /(-)[\w\d]+/,
	        relevance: 0
	      }
	    ]
	  };

	  const HASH_SIGNS = {
	    className: 'selector-tag',
	    begin: /@\B/,
	    relevance: 0
	  };

	  // It's a very general rule so I'll narrow it a bit with some strict boundaries
	  // to avoid any possible false-positive collisions!
	  const PS_METHODS = {
	    className: 'function',
	    begin: /\[.*\]\s*[\w]+[ ]??\(/,
	    end: /$/,
	    returnBegin: true,
	    relevance: 0,
	    contains: [
	      {
	        className: 'keyword',
	        begin: '('.concat(
	          KEYWORDS.keyword.toString().replace(/\s/g, '|'
	          ), ')\\b'),
	        endsParent: true,
	        relevance: 0
	      },
	      hljs.inherit(hljs.TITLE_MODE, {
	        endsParent: true
	      })
	    ]
	  };

	  const GENTLEMANS_SET = [
	    // STATIC_MEMBER,
	    PS_METHODS,
	    PS_COMMENT,
	    BACKTICK_ESCAPE,
	    hljs.NUMBER_MODE,
	    QUOTE_STRING,
	    APOS_STRING,
	    // PS_NEW_OBJECT_TYPE,
	    CMDLETS,
	    VAR,
	    LITERAL,
	    HASH_SIGNS
	  ];

	  const PS_TYPE = {
	    begin: /\[/,
	    end: /\]/,
	    excludeBegin: true,
	    excludeEnd: true,
	    relevance: 0,
	    contains: [].concat(
	      'self',
	      GENTLEMANS_SET,
	      {
	        begin: "(" + TYPES.join("|") + ")",
	        className: "built_in",
	        relevance: 0
	      },
	      {
	        className: 'type',
	        begin: /[\.\w\d]+/,
	        relevance: 0
	      }
	    )
	  };

	  PS_METHODS.contains.unshift(PS_TYPE);

	  return {
	    name: 'PowerShell',
	    aliases: [
	      "ps",
	      "ps1"
	    ],
	    case_insensitive: true,
	    keywords: KEYWORDS,
	    contains: GENTLEMANS_SET.concat(
	      PS_CLASS,
	      PS_FUNCTION,
	      PS_USING,
	      PS_ARGUMENTS,
	      PS_TYPE
	    )
	  };
	}

	var powershell_1 = powershell;

	/*
	Language: Python
	Description: Python is an interpreted, object-oriented, high-level programming language with dynamic semantics.
	Website: https://www.python.org
	Category: common
	*/
	function python(hljs) {
	  const RESERVED_WORDS = [
	    'and',
	    'as',
	    'assert',
	    'async',
	    'await',
	    'break',
	    'class',
	    'continue',
	    'def',
	    'del',
	    'elif',
	    'else',
	    'except',
	    'finally',
	    'for',
	    '',
	    'from',
	    'global',
	    'if',
	    'import',
	    'in',
	    'is',
	    'lambda',
	    'nonlocal|10',
	    'not',
	    'or',
	    'pass',
	    'raise',
	    'return',
	    'try',
	    'while',
	    'with',
	    'yield',
	  ];

	  const BUILT_INS = [
	    '__import__',
	    'abs',
	    'all',
	    'any',
	    'ascii',
	    'bin',
	    'bool',
	    'breakpoint',
	    'bytearray',
	    'bytes',
	    'callable',
	    'chr',
	    'classmethod',
	    'compile',
	    'complex',
	    'delattr',
	    'dict',
	    'dir',
	    'divmod',
	    'enumerate',
	    'eval',
	    'exec',
	    'filter',
	    'float',
	    'format',
	    'frozenset',
	    'getattr',
	    'globals',
	    'hasattr',
	    'hash',
	    'help',
	    'hex',
	    'id',
	    'input',
	    'int',
	    'isinstance',
	    'issubclass',
	    'iter',
	    'len',
	    'list',
	    'locals',
	    'map',
	    'max',
	    'memoryview',
	    'min',
	    'next',
	    'object',
	    'oct',
	    'open',
	    'ord',
	    'pow',
	    'print',
	    'property',
	    'range',
	    'repr',
	    'reversed',
	    'round',
	    'set',
	    'setattr',
	    'slice',
	    'sorted',
	    'staticmethod',
	    'str',
	    'sum',
	    'super',
	    'tuple',
	    'type',
	    'vars',
	    'zip',
	  ];

	  const LITERALS = [
	    '__debug__',
	    'Ellipsis',
	    'False',
	    'None',
	    'NotImplemented',
	    'True',
	  ];

	  const KEYWORDS = {
	    keyword: RESERVED_WORDS,
	    built_in: BUILT_INS,
	    literal: LITERALS
	  };

	  const PROMPT = {
	    className: 'meta',  begin: /^(>>>|\.\.\.) /
	  };

	  const SUBST = {
	    className: 'subst',
	    begin: /\{/, end: /\}/,
	    keywords: KEYWORDS,
	    illegal: /#/
	  };

	  const LITERAL_BRACKET = {
	    begin: /\{\{/,
	    relevance: 0
	  };

	  const STRING = {
	    className: 'string',
	    contains: [hljs.BACKSLASH_ESCAPE],
	    variants: [
	      {
	        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/, end: /'''/,
	        contains: [hljs.BACKSLASH_ESCAPE, PROMPT],
	        relevance: 10
	      },
	      {
	        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/, end: /"""/,
	        contains: [hljs.BACKSLASH_ESCAPE, PROMPT],
	        relevance: 10
	      },
	      {
	        begin: /([fF][rR]|[rR][fF]|[fF])'''/, end: /'''/,
	        contains: [hljs.BACKSLASH_ESCAPE, PROMPT, LITERAL_BRACKET, SUBST]
	      },
	      {
	        begin: /([fF][rR]|[rR][fF]|[fF])"""/, end: /"""/,
	        contains: [hljs.BACKSLASH_ESCAPE, PROMPT, LITERAL_BRACKET, SUBST]
	      },
	      {
	        begin: /([uU]|[rR])'/, end: /'/,
	        relevance: 10
	      },
	      {
	        begin: /([uU]|[rR])"/, end: /"/,
	        relevance: 10
	      },
	      {
	        begin: /([bB]|[bB][rR]|[rR][bB])'/, end: /'/
	      },
	      {
	        begin: /([bB]|[bB][rR]|[rR][bB])"/, end: /"/
	      },
	      {
	        begin: /([fF][rR]|[rR][fF]|[fF])'/, end: /'/,
	        contains: [hljs.BACKSLASH_ESCAPE, LITERAL_BRACKET, SUBST]
	      },
	      {
	        begin: /([fF][rR]|[rR][fF]|[fF])"/, end: /"/,
	        contains: [hljs.BACKSLASH_ESCAPE, LITERAL_BRACKET, SUBST]
	      },
	      hljs.APOS_STRING_MODE,
	      hljs.QUOTE_STRING_MODE
	    ]
	  };

	  // https://docs.python.org/3.9/reference/lexical_analysis.html#numeric-literals
	  const digitpart = '[0-9](_?[0-9])*';
	  const pointfloat = `(\\b(${digitpart}))?\\.(${digitpart})|\\b(${digitpart})\\.`;
	  const NUMBER = {
	    className: 'number', relevance: 0,
	    variants: [
	      // exponentfloat, pointfloat
	      // https://docs.python.org/3.9/reference/lexical_analysis.html#floating-point-literals
	      // optionally imaginary
	      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
	      // Note: no leading \b because floats can start with a decimal point
	      // and we don't want to mishandle e.g. `fn(.5)`,
	      // no trailing \b for pointfloat because it can end with a decimal point
	      // and we don't want to mishandle e.g. `0..hex()`; this should be safe
	      // because both MUST contain a decimal point and so cannot be confused with
	      // the interior part of an identifier
	      { begin: `(\\b(${digitpart})|(${pointfloat}))[eE][+-]?(${digitpart})[jJ]?\\b` },
	      { begin: `(${pointfloat})[jJ]?` },

	      // decinteger, bininteger, octinteger, hexinteger
	      // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
	      // optionally "long" in Python 2
	      // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
	      // decinteger is optionally imaginary
	      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
	      { begin: '\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?\\b' },
	      { begin: '\\b0[bB](_?[01])+[lL]?\\b' },
	      { begin: '\\b0[oO](_?[0-7])+[lL]?\\b' },
	      { begin: '\\b0[xX](_?[0-9a-fA-F])+[lL]?\\b' },

	      // imagnumber (digitpart-based)
	      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
	      { begin: `\\b(${digitpart})[jJ]\\b` },
	    ]
	  };

	  const PARAMS = {
	    className: 'params',
	    variants: [
	      // Exclude params at functions without params
	      {begin: /\(\s*\)/, skip: true, className: null },
	      {
	        begin: /\(/, end: /\)/, excludeBegin: true, excludeEnd: true,
	        keywords: KEYWORDS,
	        contains: ['self', PROMPT, NUMBER, STRING, hljs.HASH_COMMENT_MODE],
	      },
	    ],
	  };
	  SUBST.contains = [STRING, NUMBER, PROMPT];

	  return {
	    name: 'Python',
	    aliases: ['py', 'gyp', 'ipython'],
	    keywords: KEYWORDS,
	    illegal: /(<\/|->|\?)|=>/,
	    contains: [
	      PROMPT,
	      NUMBER,
	      // eat "if" prior to string so that it won't accidentally be
	      // labeled as an f-string as in:
	      { begin: /\bself\b/, }, // very common convention
	      { beginKeywords: "if", relevance: 0 },
	      STRING,
	      hljs.HASH_COMMENT_MODE,
	      {
	        variants: [
	          {className: 'function', beginKeywords: 'def'},
	          {className: 'class', beginKeywords: 'class'}
	        ],
	        end: /:/,
	        illegal: /[${=;\n,]/,
	        contains: [
	          hljs.UNDERSCORE_TITLE_MODE,
	          PARAMS,
	          {
	            begin: /->/, endsWithParent: true,
	            keywords: 'None'
	          }
	        ]
	      },
	      {
	        className: 'meta',
	        begin: /^[\t ]*@/, end: /(?=#)|$/,
	        contains: [NUMBER, PARAMS, STRING]
	      },
	      {
	        begin: /\b(print|exec)\(/ // don’t highlight keywords-turned-functions in Python 3
	      }
	    ]
	  };
	}

	var python_1 = python;

	/**
	 * @param {string} value
	 * @returns {RegExp}
	 * */
	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function source$2(re) {
	  if (!re) return null;
	  if (typeof re === "string") return re;

	  return re.source;
	}

	/**
	 * @param {...(RegExp | string) } args
	 * @returns {string}
	 */
	function concat$2(...args) {
	  const joined = args.map((x) => source$2(x)).join("");
	  return joined;
	}

	/**
	 * Any of the passed expresssions may match
	 *
	 * Creates a huge this | this | that | that match
	 * @param {(RegExp | string)[] } args
	 * @returns {string}
	 */
	function either$1(...args) {
	  const joined = '(' + args.map((x) => source$2(x)).join("|") + ")";
	  return joined;
	}

	/*
	 Language: SQL
	 Website: https://en.wikipedia.org/wiki/SQL
	 Category: common, database
	 */

	function sql(hljs) {
	  const COMMENT_MODE = hljs.COMMENT('--', '$');
	  const STRING = {
	    className: 'string',
	    variants: [
	      {
	        begin: /'/,
	        end: /'/,
	        contains: [
	          {begin: /''/ }
	        ]
	      }
	    ]
	  };
	  const QUOTED_IDENTIFIER = {
	    begin: /"/,
	    end: /"/,
	    contains: [ { begin: /""/ } ]
	  };

	  const LITERALS = [
	    "true",
	    "false",
	    // Not sure it's correct to call NULL literal, and clauses like IS [NOT] NULL look strange that way.
	    // "null",
	    "unknown"
	  ];

	  const MULTI_WORD_TYPES = [
	    "double precision",
	    "large object",
	    "with timezone",
	    "without timezone"
	  ];

	  const TYPES = [
	    'bigint',
	    'binary',
	    'blob',
	    'boolean',
	    'char',
	    'character',
	    'clob',
	    'date',
	    'dec',
	    'decfloat',
	    'decimal',
	    'float',
	    'int',
	    'integer',
	    'interval',
	    'nchar',
	    'nclob',
	    'national',
	    'numeric',
	    'real',
	    'row',
	    'smallint',
	    'time',
	    'timestamp',
	    'varchar',
	    'varying', // modifier (character varying)
	    'varbinary'
	  ];

	  const NON_RESERVED_WORDS = [
	    "add",
	    "asc",
	    "collation",
	    "desc",
	    "final",
	    "first",
	    "last",
	    "view"
	  ];

	  // https://jakewheat.github.io/sql-overview/sql-2016-foundation-grammar.html#reserved-word
	  const RESERVED_WORDS = [
	    "abs",
	    "acos",
	    "all",
	    "allocate",
	    "alter",
	    "and",
	    "any",
	    "are",
	    "array",
	    "array_agg",
	    "array_max_cardinality",
	    "as",
	    "asensitive",
	    "asin",
	    "asymmetric",
	    "at",
	    "atan",
	    "atomic",
	    "authorization",
	    "avg",
	    "begin",
	    "begin_frame",
	    "begin_partition",
	    "between",
	    "bigint",
	    "binary",
	    "blob",
	    "boolean",
	    "both",
	    "by",
	    "call",
	    "called",
	    "cardinality",
	    "cascaded",
	    "case",
	    "cast",
	    "ceil",
	    "ceiling",
	    "char",
	    "char_length",
	    "character",
	    "character_length",
	    "check",
	    "classifier",
	    "clob",
	    "close",
	    "coalesce",
	    "collate",
	    "collect",
	    "column",
	    "commit",
	    "condition",
	    "connect",
	    "constraint",
	    "contains",
	    "convert",
	    "copy",
	    "corr",
	    "corresponding",
	    "cos",
	    "cosh",
	    "count",
	    "covar_pop",
	    "covar_samp",
	    "create",
	    "cross",
	    "cube",
	    "cume_dist",
	    "current",
	    "current_catalog",
	    "current_date",
	    "current_default_transform_group",
	    "current_path",
	    "current_role",
	    "current_row",
	    "current_schema",
	    "current_time",
	    "current_timestamp",
	    "current_path",
	    "current_role",
	    "current_transform_group_for_type",
	    "current_user",
	    "cursor",
	    "cycle",
	    "date",
	    "day",
	    "deallocate",
	    "dec",
	    "decimal",
	    "decfloat",
	    "declare",
	    "default",
	    "define",
	    "delete",
	    "dense_rank",
	    "deref",
	    "describe",
	    "deterministic",
	    "disconnect",
	    "distinct",
	    "double",
	    "drop",
	    "dynamic",
	    "each",
	    "element",
	    "else",
	    "empty",
	    "end",
	    "end_frame",
	    "end_partition",
	    "end-exec",
	    "equals",
	    "escape",
	    "every",
	    "except",
	    "exec",
	    "execute",
	    "exists",
	    "exp",
	    "external",
	    "extract",
	    "false",
	    "fetch",
	    "filter",
	    "first_value",
	    "float",
	    "floor",
	    "for",
	    "foreign",
	    "frame_row",
	    "free",
	    "from",
	    "full",
	    "function",
	    "fusion",
	    "get",
	    "global",
	    "grant",
	    "group",
	    "grouping",
	    "groups",
	    "having",
	    "hold",
	    "hour",
	    "identity",
	    "in",
	    "indicator",
	    "initial",
	    "inner",
	    "inout",
	    "insensitive",
	    "insert",
	    "int",
	    "integer",
	    "intersect",
	    "intersection",
	    "interval",
	    "into",
	    "is",
	    "join",
	    "json_array",
	    "json_arrayagg",
	    "json_exists",
	    "json_object",
	    "json_objectagg",
	    "json_query",
	    "json_table",
	    "json_table_primitive",
	    "json_value",
	    "lag",
	    "language",
	    "large",
	    "last_value",
	    "lateral",
	    "lead",
	    "leading",
	    "left",
	    "like",
	    "like_regex",
	    "listagg",
	    "ln",
	    "local",
	    "localtime",
	    "localtimestamp",
	    "log",
	    "log10",
	    "lower",
	    "match",
	    "match_number",
	    "match_recognize",
	    "matches",
	    "max",
	    "member",
	    "merge",
	    "method",
	    "min",
	    "minute",
	    "mod",
	    "modifies",
	    "module",
	    "month",
	    "multiset",
	    "national",
	    "natural",
	    "nchar",
	    "nclob",
	    "new",
	    "no",
	    "none",
	    "normalize",
	    "not",
	    "nth_value",
	    "ntile",
	    "null",
	    "nullif",
	    "numeric",
	    "octet_length",
	    "occurrences_regex",
	    "of",
	    "offset",
	    "old",
	    "omit",
	    "on",
	    "one",
	    "only",
	    "open",
	    "or",
	    "order",
	    "out",
	    "outer",
	    "over",
	    "overlaps",
	    "overlay",
	    "parameter",
	    "partition",
	    "pattern",
	    "per",
	    "percent",
	    "percent_rank",
	    "percentile_cont",
	    "percentile_disc",
	    "period",
	    "portion",
	    "position",
	    "position_regex",
	    "power",
	    "precedes",
	    "precision",
	    "prepare",
	    "primary",
	    "procedure",
	    "ptf",
	    "range",
	    "rank",
	    "reads",
	    "real",
	    "recursive",
	    "ref",
	    "references",
	    "referencing",
	    "regr_avgx",
	    "regr_avgy",
	    "regr_count",
	    "regr_intercept",
	    "regr_r2",
	    "regr_slope",
	    "regr_sxx",
	    "regr_sxy",
	    "regr_syy",
	    "release",
	    "result",
	    "return",
	    "returns",
	    "revoke",
	    "right",
	    "rollback",
	    "rollup",
	    "row",
	    "row_number",
	    "rows",
	    "running",
	    "savepoint",
	    "scope",
	    "scroll",
	    "search",
	    "second",
	    "seek",
	    "select",
	    "sensitive",
	    "session_user",
	    "set",
	    "show",
	    "similar",
	    "sin",
	    "sinh",
	    "skip",
	    "smallint",
	    "some",
	    "specific",
	    "specifictype",
	    "sql",
	    "sqlexception",
	    "sqlstate",
	    "sqlwarning",
	    "sqrt",
	    "start",
	    "static",
	    "stddev_pop",
	    "stddev_samp",
	    "submultiset",
	    "subset",
	    "substring",
	    "substring_regex",
	    "succeeds",
	    "sum",
	    "symmetric",
	    "system",
	    "system_time",
	    "system_user",
	    "table",
	    "tablesample",
	    "tan",
	    "tanh",
	    "then",
	    "time",
	    "timestamp",
	    "timezone_hour",
	    "timezone_minute",
	    "to",
	    "trailing",
	    "translate",
	    "translate_regex",
	    "translation",
	    "treat",
	    "trigger",
	    "trim",
	    "trim_array",
	    "true",
	    "truncate",
	    "uescape",
	    "union",
	    "unique",
	    "unknown",
	    "unnest",
	    "update   ",
	    "upper",
	    "user",
	    "using",
	    "value",
	    "values",
	    "value_of",
	    "var_pop",
	    "var_samp",
	    "varbinary",
	    "varchar",
	    "varying",
	    "versioning",
	    "when",
	    "whenever",
	    "where",
	    "width_bucket",
	    "window",
	    "with",
	    "within",
	    "without",
	    "year",
	  ];

	  // these are reserved words we have identified to be functions
	  // and should only be highlighted in a dispatch-like context
	  // ie, array_agg(...), etc.
	  const RESERVED_FUNCTIONS = [
	    "abs",
	    "acos",
	    "array_agg",
	    "asin",
	    "atan",
	    "avg",
	    "cast",
	    "ceil",
	    "ceiling",
	    "coalesce",
	    "corr",
	    "cos",
	    "cosh",
	    "count",
	    "covar_pop",
	    "covar_samp",
	    "cume_dist",
	    "dense_rank",
	    "deref",
	    "element",
	    "exp",
	    "extract",
	    "first_value",
	    "floor",
	    "json_array",
	    "json_arrayagg",
	    "json_exists",
	    "json_object",
	    "json_objectagg",
	    "json_query",
	    "json_table",
	    "json_table_primitive",
	    "json_value",
	    "lag",
	    "last_value",
	    "lead",
	    "listagg",
	    "ln",
	    "log",
	    "log10",
	    "lower",
	    "max",
	    "min",
	    "mod",
	    "nth_value",
	    "ntile",
	    "nullif",
	    "percent_rank",
	    "percentile_cont",
	    "percentile_disc",
	    "position",
	    "position_regex",
	    "power",
	    "rank",
	    "regr_avgx",
	    "regr_avgy",
	    "regr_count",
	    "regr_intercept",
	    "regr_r2",
	    "regr_slope",
	    "regr_sxx",
	    "regr_sxy",
	    "regr_syy",
	    "row_number",
	    "sin",
	    "sinh",
	    "sqrt",
	    "stddev_pop",
	    "stddev_samp",
	    "substring",
	    "substring_regex",
	    "sum",
	    "tan",
	    "tanh",
	    "translate",
	    "translate_regex",
	    "treat",
	    "trim",
	    "trim_array",
	    "unnest",
	    "upper",
	    "value_of",
	    "var_pop",
	    "var_samp",
	    "width_bucket",
	  ];

	  // these functions can
	  const POSSIBLE_WITHOUT_PARENS = [
	    "current_catalog",
	    "current_date",
	    "current_default_transform_group",
	    "current_path",
	    "current_role",
	    "current_schema",
	    "current_transform_group_for_type",
	    "current_user",
	    "session_user",
	    "system_time",
	    "system_user",
	    "current_time",
	    "localtime",
	    "current_timestamp",
	    "localtimestamp"
	  ];

	  // those exist to boost relevance making these very
	  // "SQL like" keyword combos worth +1 extra relevance
	  const COMBOS = [
	    "create table",
	    "insert into",
	    "primary key",
	    "foreign key",
	    "not null",
	    "alter table",
	    "add constraint",
	    "grouping sets",
	    "on overflow",
	    "character set",
	    "respect nulls",
	    "ignore nulls",
	    "nulls first",
	    "nulls last",
	    "depth first",
	    "breadth first"
	  ];

	  const FUNCTIONS = RESERVED_FUNCTIONS;

	  const KEYWORDS = [...RESERVED_WORDS, ...NON_RESERVED_WORDS].filter((keyword) => {
	    return !RESERVED_FUNCTIONS.includes(keyword);
	  });

	  const VARIABLE = {
	    className: "variable",
	    begin: /@[a-z0-9]+/,
	  };

	  const OPERATOR = {
	    className: "operator",
	    begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
	    relevance: 0,
	  };

	  const FUNCTION_CALL = {
	    begin: concat$2(/\b/, either$1(...FUNCTIONS), /\s*\(/),
	    keywords: {
	      built_in: FUNCTIONS
	    }
	  };

	  // keywords with less than 3 letters are reduced in relevancy
	  function reduceRelevancy(list, {exceptions, when} = {}) {
	    const qualifyFn = when;
	    exceptions = exceptions || [];
	    return list.map((item) => {
	      if (item.match(/\|\d+$/) || exceptions.includes(item)) {
	        return item;
	      } else if (qualifyFn(item)) {
	        return `${item}|0`;
	      } else {
	        return item;
	      }
	    });
	  }

	  return {
	    name: 'SQL',
	    case_insensitive: true,
	    // does not include {} or HTML tags `</`
	    illegal: /[{}]|<\//,
	    keywords: {
	      $pattern: /\b[\w\.]+/,
	      keyword:
	        reduceRelevancy(KEYWORDS, { when: (x) => x.length < 3 }),
	      literal: LITERALS,
	      type: TYPES,
	      built_in: POSSIBLE_WITHOUT_PARENS
	    },
	    contains: [
	      {
	        begin: either$1(...COMBOS),
	        keywords: {
	          $pattern: /[\w\.]+/,
	          keyword: KEYWORDS.concat(COMBOS),
	          literal: LITERALS,
	          type: TYPES
	        },
	      },
	      {
	        className: "type",
	        begin: either$1(...MULTI_WORD_TYPES)
	      },
	      FUNCTION_CALL,
	      VARIABLE,
	      STRING,
	      QUOTED_IDENTIFIER,
	      hljs.C_NUMBER_MODE,
	      hljs.C_BLOCK_COMMENT_MODE,
	      COMMENT_MODE,
	      OPERATOR
	    ]
	  };
	}

	var sql_1 = sql;

	const IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
	const KEYWORDS = [
	  "as", // for exports
	  "in",
	  "of",
	  "if",
	  "for",
	  "while",
	  "finally",
	  "var",
	  "new",
	  "function",
	  "do",
	  "return",
	  "void",
	  "else",
	  "break",
	  "catch",
	  "instanceof",
	  "with",
	  "throw",
	  "case",
	  "default",
	  "try",
	  "switch",
	  "continue",
	  "typeof",
	  "delete",
	  "let",
	  "yield",
	  "const",
	  "class",
	  // JS handles these with a special rule
	  // "get",
	  // "set",
	  "debugger",
	  "async",
	  "await",
	  "static",
	  "import",
	  "from",
	  "export",
	  "extends"
	];
	const LITERALS = [
	  "true",
	  "false",
	  "null",
	  "undefined",
	  "NaN",
	  "Infinity"
	];

	const TYPES = [
	  "Intl",
	  "DataView",
	  "Number",
	  "Math",
	  "Date",
	  "String",
	  "RegExp",
	  "Object",
	  "Function",
	  "Boolean",
	  "Error",
	  "Symbol",
	  "Set",
	  "Map",
	  "WeakSet",
	  "WeakMap",
	  "Proxy",
	  "Reflect",
	  "JSON",
	  "Promise",
	  "Float64Array",
	  "Int16Array",
	  "Int32Array",
	  "Int8Array",
	  "Uint16Array",
	  "Uint32Array",
	  "Float32Array",
	  "Array",
	  "Uint8Array",
	  "Uint8ClampedArray",
	  "ArrayBuffer"
	];

	const ERROR_TYPES = [
	  "EvalError",
	  "InternalError",
	  "RangeError",
	  "ReferenceError",
	  "SyntaxError",
	  "TypeError",
	  "URIError"
	];

	const BUILT_IN_GLOBALS = [
	  "setInterval",
	  "setTimeout",
	  "clearInterval",
	  "clearTimeout",

	  "require",
	  "exports",

	  "eval",
	  "isFinite",
	  "isNaN",
	  "parseFloat",
	  "parseInt",
	  "decodeURI",
	  "decodeURIComponent",
	  "encodeURI",
	  "encodeURIComponent",
	  "escape",
	  "unescape"
	];

	const BUILT_IN_VARIABLES = [
	  "arguments",
	  "this",
	  "super",
	  "console",
	  "window",
	  "document",
	  "localStorage",
	  "module",
	  "global" // Node.js
	];

	const BUILT_INS = [].concat(
	  BUILT_IN_GLOBALS,
	  BUILT_IN_VARIABLES,
	  TYPES,
	  ERROR_TYPES
	);

	/**
	 * @param {string} value
	 * @returns {RegExp}
	 * */

	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function source$1(re) {
	  if (!re) return null;
	  if (typeof re === "string") return re;

	  return re.source;
	}

	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function lookahead$1(re) {
	  return concat$1('(?=', re, ')');
	}

	/**
	 * @param {...(RegExp | string) } args
	 * @returns {string}
	 */
	function concat$1(...args) {
	  const joined = args.map((x) => source$1(x)).join("");
	  return joined;
	}

	/*
	Language: JavaScript
	Description: JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.
	Category: common, scripting
	Website: https://developer.mozilla.org/en-US/docs/Web/JavaScript
	*/

	/** @type LanguageFn */
	function javascript(hljs) {
	  /**
	   * Takes a string like "<Booger" and checks to see
	   * if we can find a matching "</Booger" later in the
	   * content.
	   * @param {RegExpMatchArray} match
	   * @param {{after:number}} param1
	   */
	  const hasClosingTag = (match, { after }) => {
	    const tag = "</" + match[0].slice(1);
	    const pos = match.input.indexOf(tag, after);
	    return pos !== -1;
	  };

	  const IDENT_RE$1 = IDENT_RE;
	  const FRAGMENT = {
	    begin: '<>',
	    end: '</>'
	  };
	  const XML_TAG = {
	    begin: /<[A-Za-z0-9\\._:-]+/,
	    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
	    /**
	     * @param {RegExpMatchArray} match
	     * @param {CallbackResponse} response
	     */
	    isTrulyOpeningTag: (match, response) => {
	      const afterMatchIndex = match[0].length + match.index;
	      const nextChar = match.input[afterMatchIndex];
	      // nested type?
	      // HTML should not include another raw `<` inside a tag
	      // But a type might: `<Array<Array<number>>`, etc.
	      if (nextChar === "<") {
	        response.ignoreMatch();
	        return;
	      }
	      // <something>
	      // This is now either a tag or a type.
	      if (nextChar === ">") {
	        // if we cannot find a matching closing tag, then we
	        // will ignore it
	        if (!hasClosingTag(match, { after: afterMatchIndex })) {
	          response.ignoreMatch();
	        }
	      }
	    }
	  };
	  const KEYWORDS$1 = {
	    $pattern: IDENT_RE,
	    keyword: KEYWORDS,
	    literal: LITERALS,
	    built_in: BUILT_INS
	  };

	  // https://tc39.es/ecma262/#sec-literals-numeric-literals
	  const decimalDigits = '[0-9](_?[0-9])*';
	  const frac = `\\.(${decimalDigits})`;
	  // DecimalIntegerLiteral, including Annex B NonOctalDecimalIntegerLiteral
	  // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
	  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
	  const NUMBER = {
	    className: 'number',
	    variants: [
	      // DecimalLiteral
	      { begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))` +
	        `[eE][+-]?(${decimalDigits})\\b` },
	      { begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },

	      // DecimalBigIntegerLiteral
	      { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },

	      // NonDecimalIntegerLiteral
	      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
	      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
	      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },

	      // LegacyOctalIntegerLiteral (does not include underscore separators)
	      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
	      { begin: "\\b0[0-7]+n?\\b" },
	    ],
	    relevance: 0
	  };

	  const SUBST = {
	    className: 'subst',
	    begin: '\\$\\{',
	    end: '\\}',
	    keywords: KEYWORDS$1,
	    contains: [] // defined later
	  };
	  const HTML_TEMPLATE = {
	    begin: 'html`',
	    end: '',
	    starts: {
	      end: '`',
	      returnEnd: false,
	      contains: [
	        hljs.BACKSLASH_ESCAPE,
	        SUBST
	      ],
	      subLanguage: 'xml'
	    }
	  };
	  const CSS_TEMPLATE = {
	    begin: 'css`',
	    end: '',
	    starts: {
	      end: '`',
	      returnEnd: false,
	      contains: [
	        hljs.BACKSLASH_ESCAPE,
	        SUBST
	      ],
	      subLanguage: 'css'
	    }
	  };
	  const TEMPLATE_STRING = {
	    className: 'string',
	    begin: '`',
	    end: '`',
	    contains: [
	      hljs.BACKSLASH_ESCAPE,
	      SUBST
	    ]
	  };
	  const JSDOC_COMMENT = hljs.COMMENT(
	    /\/\*\*(?!\/)/,
	    '\\*/',
	    {
	      relevance: 0,
	      contains: [
	        {
	          className: 'doctag',
	          begin: '@[A-Za-z]+',
	          contains: [
	            {
	              className: 'type',
	              begin: '\\{',
	              end: '\\}',
	              relevance: 0
	            },
	            {
	              className: 'variable',
	              begin: IDENT_RE$1 + '(?=\\s*(-)|$)',
	              endsParent: true,
	              relevance: 0
	            },
	            // eat spaces (not newlines) so we can find
	            // types or variables
	            {
	              begin: /(?=[^\n])\s/,
	              relevance: 0
	            }
	          ]
	        }
	      ]
	    }
	  );
	  const COMMENT = {
	    className: "comment",
	    variants: [
	      JSDOC_COMMENT,
	      hljs.C_BLOCK_COMMENT_MODE,
	      hljs.C_LINE_COMMENT_MODE
	    ]
	  };
	  const SUBST_INTERNALS = [
	    hljs.APOS_STRING_MODE,
	    hljs.QUOTE_STRING_MODE,
	    HTML_TEMPLATE,
	    CSS_TEMPLATE,
	    TEMPLATE_STRING,
	    NUMBER,
	    hljs.REGEXP_MODE
	  ];
	  SUBST.contains = SUBST_INTERNALS
	    .concat({
	      // we need to pair up {} inside our subst to prevent
	      // it from ending too early by matching another }
	      begin: /\{/,
	      end: /\}/,
	      keywords: KEYWORDS$1,
	      contains: [
	        "self"
	      ].concat(SUBST_INTERNALS)
	    });
	  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
	  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
	    // eat recursive parens in sub expressions
	    {
	      begin: /\(/,
	      end: /\)/,
	      keywords: KEYWORDS$1,
	      contains: ["self"].concat(SUBST_AND_COMMENTS)
	    }
	  ]);
	  const PARAMS = {
	    className: 'params',
	    begin: /\(/,
	    end: /\)/,
	    excludeBegin: true,
	    excludeEnd: true,
	    keywords: KEYWORDS$1,
	    contains: PARAMS_CONTAINS
	  };

	  return {
	    name: 'Javascript',
	    aliases: ['js', 'jsx', 'mjs', 'cjs'],
	    keywords: KEYWORDS$1,
	    // this will be extended by TypeScript
	    exports: { PARAMS_CONTAINS },
	    illegal: /#(?![$_A-z])/,
	    contains: [
	      hljs.SHEBANG({
	        label: "shebang",
	        binary: "node",
	        relevance: 5
	      }),
	      {
	        label: "use_strict",
	        className: 'meta',
	        relevance: 10,
	        begin: /^\s*['"]use (strict|asm)['"]/
	      },
	      hljs.APOS_STRING_MODE,
	      hljs.QUOTE_STRING_MODE,
	      HTML_TEMPLATE,
	      CSS_TEMPLATE,
	      TEMPLATE_STRING,
	      COMMENT,
	      NUMBER,
	      { // object attr container
	        begin: concat$1(/[{,\n]\s*/,
	          // we need to look ahead to make sure that we actually have an
	          // attribute coming up so we don't steal a comma from a potential
	          // "value" container
	          //
	          // NOTE: this might not work how you think.  We don't actually always
	          // enter this mode and stay.  Instead it might merely match `,
	          // <comments up next>` and then immediately end after the , because it
	          // fails to find any actual attrs. But this still does the job because
	          // it prevents the value contain rule from grabbing this instead and
	          // prevening this rule from firing when we actually DO have keys.
	          lookahead$1(concat$1(
	            // we also need to allow for multiple possible comments inbetween
	            // the first key:value pairing
	            /(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/,
	            IDENT_RE$1 + '\\s*:'))),
	        relevance: 0,
	        contains: [
	          {
	            className: 'attr',
	            begin: IDENT_RE$1 + lookahead$1('\\s*:'),
	            relevance: 0
	          }
	        ]
	      },
	      { // "value" container
	        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
	        keywords: 'return throw case',
	        contains: [
	          COMMENT,
	          hljs.REGEXP_MODE,
	          {
	            className: 'function',
	            // we have to count the parens to make sure we actually have the
	            // correct bounding ( ) before the =>.  There could be any number of
	            // sub-expressions inside also surrounded by parens.
	            begin: '(\\(' +
	            '[^()]*(\\(' +
	            '[^()]*(\\(' +
	            '[^()]*' +
	            '\\)[^()]*)*' +
	            '\\)[^()]*)*' +
	            '\\)|' + hljs.UNDERSCORE_IDENT_RE + ')\\s*=>',
	            returnBegin: true,
	            end: '\\s*=>',
	            contains: [
	              {
	                className: 'params',
	                variants: [
	                  {
	                    begin: hljs.UNDERSCORE_IDENT_RE,
	                    relevance: 0
	                  },
	                  {
	                    className: null,
	                    begin: /\(\s*\)/,
	                    skip: true
	                  },
	                  {
	                    begin: /\(/,
	                    end: /\)/,
	                    excludeBegin: true,
	                    excludeEnd: true,
	                    keywords: KEYWORDS$1,
	                    contains: PARAMS_CONTAINS
	                  }
	                ]
	              }
	            ]
	          },
	          { // could be a comma delimited list of params to a function call
	            begin: /,/, relevance: 0
	          },
	          {
	            className: '',
	            begin: /\s/,
	            end: /\s*/,
	            skip: true
	          },
	          { // JSX
	            variants: [
	              { begin: FRAGMENT.begin, end: FRAGMENT.end },
	              {
	                begin: XML_TAG.begin,
	                // we carefully check the opening tag to see if it truly
	                // is a tag and not a false positive
	                'on:begin': XML_TAG.isTrulyOpeningTag,
	                end: XML_TAG.end
	              }
	            ],
	            subLanguage: 'xml',
	            contains: [
	              {
	                begin: XML_TAG.begin,
	                end: XML_TAG.end,
	                skip: true,
	                contains: ['self']
	              }
	            ]
	          }
	        ],
	        relevance: 0
	      },
	      {
	        className: 'function',
	        beginKeywords: 'function',
	        end: /[{;]/,
	        excludeEnd: true,
	        keywords: KEYWORDS$1,
	        contains: [
	          'self',
	          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1 }),
	          PARAMS
	        ],
	        illegal: /%/
	      },
	      {
	        // prevent this from getting swallowed up by function
	        // since they appear "function like"
	        beginKeywords: "while if switch catch for"
	      },
	      {
	        className: 'function',
	        // we have to count the parens to make sure we actually have the correct
	        // bounding ( ).  There could be any number of sub-expressions inside
	        // also surrounded by parens.
	        begin: hljs.UNDERSCORE_IDENT_RE +
	          '\\(' + // first parens
	          '[^()]*(\\(' +
	            '[^()]*(\\(' +
	              '[^()]*' +
	            '\\)[^()]*)*' +
	          '\\)[^()]*)*' +
	          '\\)\\s*\\{', // end parens
	        returnBegin:true,
	        contains: [
	          PARAMS,
	          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1 }),
	        ]
	      },
	      // hack: prevents detection of keywords in some circumstances
	      // .keyword()
	      // $keyword = x
	      {
	        variants: [
	          { begin: '\\.' + IDENT_RE$1 },
	          { begin: '\\$' + IDENT_RE$1 }
	        ],
	        relevance: 0
	      },
	      { // ES6 class
	        className: 'class',
	        beginKeywords: 'class',
	        end: /[{;=]/,
	        excludeEnd: true,
	        illegal: /[:"[\]]/,
	        contains: [
	          { beginKeywords: 'extends' },
	          hljs.UNDERSCORE_TITLE_MODE
	        ]
	      },
	      {
	        begin: /\b(?=constructor)/,
	        end: /[{;]/,
	        excludeEnd: true,
	        contains: [
	          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1 }),
	          'self',
	          PARAMS
	        ]
	      },
	      {
	        begin: '(get|set)\\s+(?=' + IDENT_RE$1 + '\\()',
	        end: /\{/,
	        keywords: "get set",
	        contains: [
	          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1 }),
	          { begin: /\(\)/ }, // eat to avoid empty params
	          PARAMS
	        ]
	      },
	      {
	        begin: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
	      }
	    ]
	  };
	}

	/*
	Language: TypeScript
	Author: Panu Horsmalahti <panu.horsmalahti@iki.fi>
	Contributors: Ike Ku <dempfi@yahoo.com>
	Description: TypeScript is a strict superset of JavaScript
	Website: https://www.typescriptlang.org
	Category: common, scripting
	*/

	/** @type LanguageFn */
	function typescript(hljs) {
	  const IDENT_RE$1 = IDENT_RE;
	  const NAMESPACE = {
	    beginKeywords: 'namespace', end: /\{/, excludeEnd: true
	  };
	  const INTERFACE = {
	    beginKeywords: 'interface', end: /\{/, excludeEnd: true,
	    keywords: 'interface extends'
	  };
	  const USE_STRICT = {
	    className: 'meta',
	    relevance: 10,
	    begin: /^\s*['"]use strict['"]/
	  };
	  const TYPES = [
	    "any",
	    "void",
	    "number",
	    "boolean",
	    "string",
	    "object",
	    "never",
	    "enum"
	  ];
	  const TS_SPECIFIC_KEYWORDS = [
	    "type",
	    "namespace",
	    "typedef",
	    "interface",
	    "public",
	    "private",
	    "protected",
	    "implements",
	    "declare",
	    "abstract",
	    "readonly"
	  ];
	  const KEYWORDS$1 = {
	    $pattern: IDENT_RE,
	    keyword: KEYWORDS.concat(TS_SPECIFIC_KEYWORDS),
	    literal: LITERALS,
	    built_in: BUILT_INS.concat(TYPES)
	  };
	  const DECORATOR = {
	    className: 'meta',
	    begin: '@' + IDENT_RE$1,
	  };

	  const swapMode = (mode, label, replacement) => {
	    const indx = mode.contains.findIndex(m => m.label === label);
	    if (indx === -1) { throw new Error("can not find mode to replace"); }
	    mode.contains.splice(indx, 1, replacement);
	  };

	  const tsLanguage = javascript(hljs);

	  // this should update anywhere keywords is used since
	  // it will be the same actual JS object
	  Object.assign(tsLanguage.keywords, KEYWORDS$1);

	  tsLanguage.exports.PARAMS_CONTAINS.push(DECORATOR);
	  tsLanguage.contains = tsLanguage.contains.concat([
	    DECORATOR,
	    NAMESPACE,
	    INTERFACE,
	  ]);

	  // TS gets a simpler shebang rule than JS
	  swapMode(tsLanguage, "shebang", hljs.SHEBANG());
	  // JS use strict rule purposely excludes `asm` which makes no sense
	  swapMode(tsLanguage, "use_strict", USE_STRICT);

	  const functionDeclaration = tsLanguage.contains.find(m => m.className === "function");
	  functionDeclaration.relevance = 0; // () => {} is more typical in TypeScript

	  Object.assign(tsLanguage, {
	    name: 'TypeScript',
	    aliases: ['ts']
	  });

	  return tsLanguage;
	}

	var typescript_1 = typescript;

	/**
	 * @param {string} value
	 * @returns {RegExp}
	 * */
	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function source(re) {
	  if (!re) return null;
	  if (typeof re === "string") return re;

	  return re.source;
	}

	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function lookahead(re) {
	  return concat('(?=', re, ')');
	}

	/**
	 * @param {RegExp | string } re
	 * @returns {string}
	 */
	function optional(re) {
	  return concat('(', re, ')?');
	}

	/**
	 * @param {...(RegExp | string) } args
	 * @returns {string}
	 */
	function concat(...args) {
	  const joined = args.map((x) => source(x)).join("");
	  return joined;
	}

	/**
	 * Any of the passed expresssions may match
	 *
	 * Creates a huge this | this | that | that match
	 * @param {(RegExp | string)[] } args
	 * @returns {string}
	 */
	function either(...args) {
	  const joined = '(' + args.map((x) => source(x)).join("|") + ")";
	  return joined;
	}

	/*
	Language: HTML, XML
	Website: https://www.w3.org/XML/
	Category: common
	Audit: 2020
	*/

	/** @type LanguageFn */
	function xml(hljs) {
	  // Element names can contain letters, digits, hyphens, underscores, and periods
	  const TAG_NAME_RE = concat(/[A-Z_]/, optional(/[A-Z0-9_.-]*:/), /[A-Z0-9_.-]*/);
	  const XML_IDENT_RE = /[A-Za-z0-9._:-]+/;
	  const XML_ENTITIES = {
	    className: 'symbol',
	    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
	  };
	  const XML_META_KEYWORDS = {
	    begin: /\s/,
	    contains: [
	      {
	        className: 'meta-keyword',
	        begin: /#?[a-z_][a-z1-9_-]+/,
	        illegal: /\n/
	      }
	    ]
	  };
	  const XML_META_PAR_KEYWORDS = hljs.inherit(XML_META_KEYWORDS, {
	    begin: /\(/,
	    end: /\)/
	  });
	  const APOS_META_STRING_MODE = hljs.inherit(hljs.APOS_STRING_MODE, {
	    className: 'meta-string'
	  });
	  const QUOTE_META_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, {
	    className: 'meta-string'
	  });
	  const TAG_INTERNALS = {
	    endsWithParent: true,
	    illegal: /</,
	    relevance: 0,
	    contains: [
	      {
	        className: 'attr',
	        begin: XML_IDENT_RE,
	        relevance: 0
	      },
	      {
	        begin: /=\s*/,
	        relevance: 0,
	        contains: [
	          {
	            className: 'string',
	            endsParent: true,
	            variants: [
	              {
	                begin: /"/,
	                end: /"/,
	                contains: [ XML_ENTITIES ]
	              },
	              {
	                begin: /'/,
	                end: /'/,
	                contains: [ XML_ENTITIES ]
	              },
	              {
	                begin: /[^\s"'=<>`]+/
	              }
	            ]
	          }
	        ]
	      }
	    ]
	  };
	  return {
	    name: 'HTML, XML',
	    aliases: [
	      'html',
	      'xhtml',
	      'rss',
	      'atom',
	      'xjb',
	      'xsd',
	      'xsl',
	      'plist',
	      'wsf',
	      'svg'
	    ],
	    case_insensitive: true,
	    contains: [
	      {
	        className: 'meta',
	        begin: /<![a-z]/,
	        end: />/,
	        relevance: 10,
	        contains: [
	          XML_META_KEYWORDS,
	          QUOTE_META_STRING_MODE,
	          APOS_META_STRING_MODE,
	          XML_META_PAR_KEYWORDS,
	          {
	            begin: /\[/,
	            end: /\]/,
	            contains: [
	              {
	                className: 'meta',
	                begin: /<![a-z]/,
	                end: />/,
	                contains: [
	                  XML_META_KEYWORDS,
	                  XML_META_PAR_KEYWORDS,
	                  QUOTE_META_STRING_MODE,
	                  APOS_META_STRING_MODE
	                ]
	              }
	            ]
	          }
	        ]
	      },
	      hljs.COMMENT(
	        /<!--/,
	        /-->/,
	        {
	          relevance: 10
	        }
	      ),
	      {
	        begin: /<!\[CDATA\[/,
	        end: /\]\]>/,
	        relevance: 10
	      },
	      XML_ENTITIES,
	      {
	        className: 'meta',
	        begin: /<\?xml/,
	        end: /\?>/,
	        relevance: 10
	      },
	      {
	        className: 'tag',
	        /*
	        The lookahead pattern (?=...) ensures that 'begin' only matches
	        '<style' as a single word, followed by a whitespace or an
	        ending braket. The '$' is needed for the lexeme to be recognized
	        by hljs.subMode() that tests lexemes outside the stream.
	        */
	        begin: /<style(?=\s|>)/,
	        end: />/,
	        keywords: {
	          name: 'style'
	        },
	        contains: [ TAG_INTERNALS ],
	        starts: {
	          end: /<\/style>/,
	          returnEnd: true,
	          subLanguage: [
	            'css',
	            'xml'
	          ]
	        }
	      },
	      {
	        className: 'tag',
	        // See the comment in the <style tag about the lookahead pattern
	        begin: /<script(?=\s|>)/,
	        end: />/,
	        keywords: {
	          name: 'script'
	        },
	        contains: [ TAG_INTERNALS ],
	        starts: {
	          end: /<\/script>/,
	          returnEnd: true,
	          subLanguage: [
	            'javascript',
	            'handlebars',
	            'xml'
	          ]
	        }
	      },
	      // we need this for now for jSX
	      {
	        className: 'tag',
	        begin: /<>|<\/>/
	      },
	      // open tag
	      {
	        className: 'tag',
	        begin: concat(
	          /</,
	          lookahead(concat(
	            TAG_NAME_RE,
	            // <tag/>
	            // <tag>
	            // <tag ...
	            either(/\/>/, />/, /\s/)
	          ))
	        ),
	        end: /\/?>/,
	        contains: [
	          {
	            className: 'name',
	            begin: TAG_NAME_RE,
	            relevance: 0,
	            starts: TAG_INTERNALS
	          }
	        ]
	      },
	      // close tag
	      {
	        className: 'tag',
	        begin: concat(
	          /<\//,
	          lookahead(concat(
	            TAG_NAME_RE, />/
	          ))
	        ),
	        contains: [
	          {
	            className: 'name',
	            begin: TAG_NAME_RE,
	            relevance: 0
	          },
	          {
	            begin: />/,
	            relevance: 0
	          }
	        ]
	      }
	    ]
	  };
	}

	var xml_1 = xml;

	/*
	Language: Vim Script
	Author: Jun Yang <yangjvn@126.com>
	Description: full keyword and built-in from http://vimdoc.sourceforge.net/htmldoc/
	Website: https://www.vim.org
	Category: scripting
	*/
	function vim(hljs) {
	  return {
	    name: 'Vim Script',
	    keywords: {
	      $pattern: /[!#@\w]+/,
	      keyword:
	        // express version except: ! & * < = > !! # @ @@
	        'N|0 P|0 X|0 a|0 ab abc abo al am an|0 ar arga argd arge argdo argg argl argu as au aug aun b|0 bN ba bad bd be bel bf bl bm bn bo bp br brea breaka breakd breakl bro bufdo buffers bun bw c|0 cN cNf ca cabc caddb cad caddf cal cat cb cc ccl cd ce cex cf cfir cgetb cgete cg changes chd che checkt cl cla clo cm cmapc cme cn cnew cnf cno cnorea cnoreme co col colo com comc comp con conf cope ' +
	        'cp cpf cq cr cs cst cu cuna cunme cw delm deb debugg delc delf dif diffg diffo diffp diffpu diffs diffthis dig di dl dell dj dli do doautoa dp dr ds dsp e|0 ea ec echoe echoh echom echon el elsei em en endfo endf endt endw ene ex exe exi exu f|0 files filet fin fina fini fir fix fo foldc foldd folddoc foldo for fu go gr grepa gu gv ha helpf helpg helpt hi hid his ia iabc if ij il im imapc ' +
	        'ime ino inorea inoreme int is isp iu iuna iunme j|0 ju k|0 keepa kee keepj lN lNf l|0 lad laddb laddf la lan lat lb lc lch lcl lcs le lefta let lex lf lfir lgetb lgete lg lgr lgrepa lh ll lla lli lmak lm lmapc lne lnew lnf ln loadk lo loc lockv lol lope lp lpf lr ls lt lu lua luad luaf lv lvimgrepa lw m|0 ma mak map mapc marks mat me menut mes mk mks mksp mkv mkvie mod mz mzf nbc nb nbs new nm nmapc nme nn nnoreme noa no noh norea noreme norm nu nun nunme ol o|0 om omapc ome on ono onoreme opt ou ounme ow p|0 ' +
	        'profd prof pro promptr pc ped pe perld po popu pp pre prev ps pt ptN ptf ptj ptl ptn ptp ptr pts pu pw py3 python3 py3d py3f py pyd pyf quita qa rec red redi redr redraws reg res ret retu rew ri rightb rub rubyd rubyf rund ru rv sN san sa sal sav sb sbN sba sbf sbl sbm sbn sbp sbr scrip scripte scs se setf setg setl sf sfir sh sim sig sil sl sla sm smap smapc sme sn sni sno snor snoreme sor ' +
	        'so spelld spe spelli spellr spellu spellw sp spr sre st sta startg startr star stopi stj sts sun sunm sunme sus sv sw sy synti sync tN tabN tabc tabdo tabe tabf tabfir tabl tabm tabnew ' +
	        'tabn tabo tabp tabr tabs tab ta tags tc tcld tclf te tf th tj tl tm tn to tp tr try ts tu u|0 undoj undol una unh unl unlo unm unme uns up ve verb vert vim vimgrepa vi viu vie vm vmapc vme vne vn vnoreme vs vu vunme windo w|0 wN wa wh wi winc winp wn wp wq wqa ws wu wv x|0 xa xmapc xm xme xn xnoreme xu xunme y|0 z|0 ~ ' +
	        // full version
	        'Next Print append abbreviate abclear aboveleft all amenu anoremenu args argadd argdelete argedit argglobal arglocal argument ascii autocmd augroup aunmenu buffer bNext ball badd bdelete behave belowright bfirst blast bmodified bnext botright bprevious brewind break breakadd breakdel breaklist browse bunload ' +
	        'bwipeout change cNext cNfile cabbrev cabclear caddbuffer caddexpr caddfile call catch cbuffer cclose center cexpr cfile cfirst cgetbuffer cgetexpr cgetfile chdir checkpath checktime clist clast close cmap cmapclear cmenu cnext cnewer cnfile cnoremap cnoreabbrev cnoremenu copy colder colorscheme command comclear compiler continue confirm copen cprevious cpfile cquit crewind cscope cstag cunmap ' +
	        'cunabbrev cunmenu cwindow delete delmarks debug debuggreedy delcommand delfunction diffupdate diffget diffoff diffpatch diffput diffsplit digraphs display deletel djump dlist doautocmd doautoall deletep drop dsearch dsplit edit earlier echo echoerr echohl echomsg else elseif emenu endif endfor ' +
	        'endfunction endtry endwhile enew execute exit exusage file filetype find finally finish first fixdel fold foldclose folddoopen folddoclosed foldopen function global goto grep grepadd gui gvim hardcopy help helpfind helpgrep helptags highlight hide history insert iabbrev iabclear ijump ilist imap ' +
	        'imapclear imenu inoremap inoreabbrev inoremenu intro isearch isplit iunmap iunabbrev iunmenu join jumps keepalt keepmarks keepjumps lNext lNfile list laddexpr laddbuffer laddfile last language later lbuffer lcd lchdir lclose lcscope left leftabove lexpr lfile lfirst lgetbuffer lgetexpr lgetfile lgrep lgrepadd lhelpgrep llast llist lmake lmap lmapclear lnext lnewer lnfile lnoremap loadkeymap loadview ' +
	        'lockmarks lockvar lolder lopen lprevious lpfile lrewind ltag lunmap luado luafile lvimgrep lvimgrepadd lwindow move mark make mapclear match menu menutranslate messages mkexrc mksession mkspell mkvimrc mkview mode mzscheme mzfile nbclose nbkey nbsart next nmap nmapclear nmenu nnoremap ' +
	        'nnoremenu noautocmd noremap nohlsearch noreabbrev noremenu normal number nunmap nunmenu oldfiles open omap omapclear omenu only onoremap onoremenu options ounmap ounmenu ownsyntax print profdel profile promptfind promptrepl pclose pedit perl perldo pop popup ppop preserve previous psearch ptag ptNext ' +
	        'ptfirst ptjump ptlast ptnext ptprevious ptrewind ptselect put pwd py3do py3file python pydo pyfile quit quitall qall read recover redo redir redraw redrawstatus registers resize retab return rewind right rightbelow ruby rubydo rubyfile rundo runtime rviminfo substitute sNext sandbox sargument sall saveas sbuffer sbNext sball sbfirst sblast sbmodified sbnext sbprevious sbrewind scriptnames scriptencoding ' +
	        'scscope set setfiletype setglobal setlocal sfind sfirst shell simalt sign silent sleep slast smagic smapclear smenu snext sniff snomagic snoremap snoremenu sort source spelldump spellgood spellinfo spellrepall spellundo spellwrong split sprevious srewind stop stag startgreplace startreplace ' +
	        'startinsert stopinsert stjump stselect sunhide sunmap sunmenu suspend sview swapname syntax syntime syncbind tNext tabNext tabclose tabedit tabfind tabfirst tablast tabmove tabnext tabonly tabprevious tabrewind tag tcl tcldo tclfile tearoff tfirst throw tjump tlast tmenu tnext topleft tprevious ' + 'trewind tselect tunmenu undo undojoin undolist unabbreviate unhide unlet unlockvar unmap unmenu unsilent update vglobal version verbose vertical vimgrep vimgrepadd visual viusage view vmap vmapclear vmenu vnew ' +
	        'vnoremap vnoremenu vsplit vunmap vunmenu write wNext wall while winsize wincmd winpos wnext wprevious wqall wsverb wundo wviminfo xit xall xmapclear xmap xmenu xnoremap xnoremenu xunmap xunmenu yank',
	      built_in: // built in func
	        'synIDtrans atan2 range matcharg did_filetype asin feedkeys xor argv ' +
	        'complete_check add getwinposx getqflist getwinposy screencol ' +
	        'clearmatches empty extend getcmdpos mzeval garbagecollect setreg ' +
	        'ceil sqrt diff_hlID inputsecret get getfperm getpid filewritable ' +
	        'shiftwidth max sinh isdirectory synID system inputrestore winline ' +
	        'atan visualmode inputlist tabpagewinnr round getregtype mapcheck ' +
	        'hasmapto histdel argidx findfile sha256 exists toupper getcmdline ' +
	        'taglist string getmatches bufnr strftime winwidth bufexists ' +
	        'strtrans tabpagebuflist setcmdpos remote_read printf setloclist ' +
	        'getpos getline bufwinnr float2nr len getcmdtype diff_filler luaeval ' +
	        'resolve libcallnr foldclosedend reverse filter has_key bufname ' +
	        'str2float strlen setline getcharmod setbufvar index searchpos ' +
	        'shellescape undofile foldclosed setqflist buflisted strchars str2nr ' +
	        'virtcol floor remove undotree remote_expr winheight gettabwinvar ' +
	        'reltime cursor tabpagenr finddir localtime acos getloclist search ' +
	        'tanh matchend rename gettabvar strdisplaywidth type abs py3eval ' +
	        'setwinvar tolower wildmenumode log10 spellsuggest bufloaded ' +
	        'synconcealed nextnonblank server2client complete settabwinvar ' +
	        'executable input wincol setmatches getftype hlID inputsave ' +
	        'searchpair or screenrow line settabvar histadd deepcopy strpart ' +
	        'remote_peek and eval getftime submatch screenchar winsaveview ' +
	        'matchadd mkdir screenattr getfontname libcall reltimestr getfsize ' +
	        'winnr invert pow getbufline byte2line soundfold repeat fnameescape ' +
	        'tagfiles sin strwidth spellbadword trunc maparg log lispindent ' +
	        'hostname setpos globpath remote_foreground getchar synIDattr ' +
	        'fnamemodify cscope_connection stridx winbufnr indent min ' +
	        'complete_add nr2char searchpairpos inputdialog values matchlist ' +
	        'items hlexists strridx browsedir expand fmod pathshorten line2byte ' +
	        'argc count getwinvar glob foldtextresult getreg foreground cosh ' +
	        'matchdelete has char2nr simplify histget searchdecl iconv ' +
	        'winrestcmd pumvisible writefile foldlevel haslocaldir keys cos ' +
	        'matchstr foldtext histnr tan tempname getcwd byteidx getbufvar ' +
	        'islocked escape eventhandler remote_send serverlist winrestview ' +
	        'synstack pyeval prevnonblank readfile cindent filereadable changenr ' +
	        'exp'
	    },
	    illegal: /;/,
	    contains: [
	      hljs.NUMBER_MODE,
	      {
	        className: 'string',
	        begin: '\'',
	        end: '\'',
	        illegal: '\\n'
	      },

	      /*
	      A double quote can start either a string or a line comment. Strings are
	      ended before the end of a line by another double quote and can contain
	      escaped double-quotes and post-escaped line breaks.

	      Also, any double quote at the beginning of a line is a comment but we
	      don't handle that properly at the moment: any double quote inside will
	      turn them into a string. Handling it properly will require a smarter
	      parser.
	      */
	      {
	        className: 'string',
	        begin: /"(\\"|\n\\|[^"\n])*"/
	      },
	      hljs.COMMENT('"', '$'),

	      {
	        className: 'variable',
	        begin: /[bwtglsav]:[\w\d_]*/
	      },
	      {
	        className: 'function',
	        beginKeywords: 'function function!',
	        end: '$',
	        relevance: 0,
	        contains: [
	          hljs.TITLE_MODE,
	          {
	            className: 'params',
	            begin: '\\(',
	            end: '\\)'
	          }
	        ]
	      },
	      {
	        className: 'symbol',
	        begin: /<[\w-]+>/
	      }
	    ]
	  };
	}

	var vim_1 = vim;

	//import './code.scss'

	core.registerLanguage('javascript', javascript_1);
	core.registerLanguage('c-like', cLike_1);
	core.registerLanguage('c', c_1);
	core.registerLanguage('cmake', cmake_1);
	core.registerLanguage('cpp', cpp_1);
	core.registerLanguage('csharp', csharp_1);
	core.registerLanguage('dart', dart_1);
	core.registerLanguage('diff', diff_1);
	core.registerLanguage('dockerfile', dockerfile_1);
	core.registerLanguage('glsl', glsl_1);
	core.registerLanguage('go', go_1);
	core.registerLanguage('gradle', gradle_1);
	core.registerLanguage('http', http_1);
	core.registerLanguage('java', java_1);
	core.registerLanguage('json', json_1);
	core.registerLanguage('kotlin', kotlin_1);
	core.registerLanguage('latex', latex_1);
	core.registerLanguage('lua', lua_1);
	core.registerLanguage('makefile', makefile_1);
	core.registerLanguage('markdown', markdown_1);
	core.registerLanguage('php', php_1);
	core.registerLanguage('powershell', powershell_1);
	core.registerLanguage('python', python_1);
	core.registerLanguage('sql', sql_1);
	core.registerLanguage('typescript', typescript_1);
	core.registerLanguage('xml', xml_1);
	core.registerLanguage('bash', bash_1);
	core.registerLanguage('vim', vim_1);

	function normalizeIndent(str) {
		// trim empty lines from start & end
		str = str.replace(/^\s?\n|\n\s?$/g, '');
	 
		const lines = str.split('\n');
		const indentLen = /^\s*/.exec(lines[0])[0].length;
		return lines.map(l => l.slice(indentLen)).join('\n');
	}

	function normalizeAllIndent() {
		const codes = document.querySelectorAll('pre>code');
		codes.forEach(code => {
			code.innerHTML = normalizeIndent(code.innerHTML);
		});
	}

	DOMReady().then(() => {
		normalizeAllIndent();
		core.highlightAll();
	});

	function renderMath() {
		const content = document.body.innerText;

		if(content.includes('$$') ||
			(content.includes('\\(') && content.includes('\\)')) ||
			(content.includes('\\[') && content.includes('\\]'))) {
				console.log('Loading MathJax...');
				loadScript('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js');
			}
	}

	function setHash(str) {
		if(history.pushState) {
			history.pushState(null, null, '#'+str);
		}
		else {
			window.location.hash = '#'+str;
		}
	}

	let count = 0;
	let current = 0;
	let mode = '';

	const touch = {};

	function touchStart(event) {
		if(event.changedTouches.length == 1) {
			touch.x = event.changedTouches[0].clientX;
			touch.y = event.changedTouches[0].clientY;
		}
	}

	function touchEnd(event) {
		const v = {};
		if(event.changedTouches.length == 1) {
			v.x = event.changedTouches[0].clientX - touch.x;
			v.y = event.changedTouches[0].clientY - touch.y;

			if(Math.abs(v.x) > 4*Math.abs(v.y)) {
				if(v.x > 0) {
					previousSlide();
				}
				else {
					nextSlide();
				}
			}
		}
	}

	function addTouchNavigation() {
		document.addEventListener('touchstart', touchStart);
		document.addEventListener('touchend', touchEnd);
	}

	function removeTouchNavigation() {
		document.removeEventListener('touchstart', touchStart);
		document.removeEventListener('touchend', touchEnd);
	}

	function initNavigation() {
		document.addEventListener('keydown', event => {
			if (['ArrowRight', 'ArrowDown', 'KeyS', 'KeyD', 'Space'].includes(event.code)) {
				event.preventDefault();
				nextSlide();
			}
			else if(['ArrowLeft', 'ArrowUp', 'KeyW', 'KeyA'].includes(event.code)) {
				event.preventDefault();
				previousSlide();
			}
			else if (event.key === 'm') {
				event.preventDefault();
				toggleView();
			}
		});

		document.querySelector('h1').addEventListener('click', () => {
			toggleView();
		});

		window.addEventListener('orientationchange', event => {
			setModeBasedOnOrientation();
		});
	}

	function setClass(slideNumber, className) {
		const slide = document.getElementById('slide-'+slideNumber);
		if(slide.classList.contains(className)) return

		const classAttrib = slide.attributes["class"];
		if(classAttrib) {
			const classes = classAttrib.value;
			const deckClasses = classes.match(/deck-.+/);
			if(deckClasses) {
				for(let cl of deckClasses) {
					slide.classList.remove(cl);
				}
			}
		}

		slide.classList.add(className);
	}

	function setClasses() {
		for(let i=1; i <= count; i++) {
			if(i < current-1) {
				setClass(i, 'deck-before');
			}
			else if(i == current-1) {
				setClass(i, 'deck-previous');
			}
			else if(i == current) {
				setClass(i, 'deck-current');
			}
			else if(i == current+1) {
				setClass(i, 'deck-next');
			}
			else {
				setClass(i, 'deck-after');
			}
		}
	}

	function setModeBasedOnOrientation() {
		if(screen.orientation.type.startsWith('portrait')) {
			documentMode();
		}
		else {
			deckMode();
		}
	}

	function initDeck() {
		document.querySelector('meta[name="viewport"]').setAttribute('content', "initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no");

		current = 1;
		if(window.location.hash.length > 0 && window.location.hash.startsWith('#slide-')) {
			current = parseInt(window.location.hash.slice('#slide-'.length), 10);
		}
		else {
			setHash('slide-'+current);
		}
		
		const slides = document.querySelectorAll('body>section');
		
		let i = 1;
		slides.forEach(slide => {
			slide.id = 'slide-'+i;
			i++;
		});

		count = slides.length;

		setClasses();
		renderMath();
		initNavigation();
		setModeBasedOnOrientation();
	}

	function currentSlide() {
		return current
	}

	function getSlideCount() {
		return count
	}

	function nextSlide() {
		setCurrent(current+1);
	}

	function previousSlide() {
		setCurrent(current-1);
	}

	function setCurrent(i) {
		if(i < 1) i = 1;
		if(i > count) i = count;
		if(i == current) return
		current = i;
		setClasses();
		setHash('slide-'+i);
	}

	function toggleView() {
		if(mode === 'document') {
			deckMode();
		}
		else {
			documentMode();
		}
	}

	function documentMode() {
		document.body.classList.remove('mode-deck');
		document.body.classList.add('mode-document');
		mode = 'document';
		removeTouchNavigation();
	}

	function deckMode() {
		document.body.classList.add('mode-deck');
		document.body.classList.remove('mode-document');
		mode = 'deck';
		addTouchNavigation();
	}

	DOMReady().then(() => {
		initDeck();
	});

	exports.currentSlide = currentSlide;
	exports.deckMode = deckMode;
	exports.documentMode = documentMode;
	exports.getSlideCount = getSlideCount;
	exports.initDeck = initDeck;
	exports.nextSlide = nextSlide;
	exports.previousSlide = previousSlide;
	exports.setCurrent = setCurrent;
	exports.toggleView = toggleView;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

}({}));

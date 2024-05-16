#!/usr/bin/env python3

import panflute as pf
from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import get_lexer_by_name
from pygments.lexers.special import TextLexer
from pygments.util import ClassNotFound


def action(elem, doc):
    if isinstance(elem, pf.CodeBlock):
        lang = elem.classes[0]
        try:
            lexer = get_lexer_by_name(lang, stripall=True)
        except ClassNotFound:
            lexer = TextLexer()
        formatter = HtmlFormatter(cssclass="pygments")
        result = highlight(elem.text, lexer, formatter)
        return pf.RawBlock(result, format="html")


def main(doc=None):
    return pf.run_filter(action, doc=doc)


if __name__ == "__main__":
    main()

from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import get_lexer_by_name
import panflute as pf


def loadfile(path):
    with open(path) as file:
        content = file.read()
    return content


def hl(src, lines=[]):
    lexer = get_lexer_by_name("python", stripall=True)
    formatter = HtmlFormatter(hl_lines=lines, cssclass="pygments")
    result = highlight(src, lexer, formatter)
    return result


def ram(vars, title="RAM"):
    res = ""
    for key, value in vars.items():
        res += f'<div class="var"><div class="name">{key}</div><div class="content">{value}</div></div>'

    res = f'<div class="ram"><h5>{title}</h5>{res}</div>'

    return res


def code_step(src, lines, vars, terminal=" "):
    left = hl(src, lines=lines)
    right = ram(vars) + f'<div class="terminal">{terminal}</div>'
    return f'<div class="row"><div class="span6 middle" style="font-size: 0.9em;">{left}</div><div class="span6 middle">{right}</div></div>'


def slide(title, content):
    title_block = pf.Header(pf.Str(title), level=2)
    content_block = pf.RawBlock(text=content, format="html")
    return [title_block, content_block]

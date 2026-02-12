from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import get_lexer_by_name
import panflute as pf


def ref(name):
    return f'<em class="ref">&lt;{name}&gt;</em>'


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
        if isinstance(value, dict):
            res += ram(value, f"<em>{key}</em>")
        elif isinstance(value, list):
            s = f'<div class="name">{key}</div>'
            for i, item in enumerate(value):
                s += f'<div class="content">{item}<div class="index">{i}</div></div>'
            res += f'<div class="var">{s}</div>'
        else:
            res += f'<div class="var"><div class="name">{key}</div><div class="content">{value}</div></div>'

    res = f'<div class="ram"><h5>{title}</h5>{res}</div>'

    return res


def code_step(src, lines, vars, terminal=" ", code_size=0.9, term_size=1.0):
    left = hl(src, lines=lines)
    right = (
        ram(vars)
        + f'<div class="terminal" style="font-size: {term_size}em">{terminal}</div>'
    )
    return f'<div class="row code-step"><div class="span6 middle" style="font-size: {code_size}em;">{left}</div><div class="span6 middle">{right}</div></div>'


def slide(title, content):
    title_block = pf.Header(pf.RawInline(text=title, format="html"), level=2)
    content_block = pf.RawBlock(text=content, format="html")
    return [title_block, content_block]


def recipe(steps: list[str], hl_lines: list[int] = []) -> str:
    res = ""
    for i, step in enumerate(steps):
        cl = ""
        if i in hl_lines:
            cl = 'class="hl"'
        res += f"<li {cl}>{step}</li>"
    return f'<ol class="recipe">{res}</ol>'


def work_plan(imgs: list[str]):
    res = ""
    for i, img in enumerate(imgs):
        cls = "small"
        if i == 0:
            cls = "big"
        res += f'<img src="{img}" class="{cls}">'

    res = f'<div class="work-plan"><h5>Plan de travail</h5>{res}</div>'

    return res


def table(imgs: list[str]):
    res = ""
    for img in imgs:
        res += f'<img src="{img}">'

    res = f'<div class="eat-table"><h5>Table</h5>{res}</div>'

    return res


def recipe_step(steps: list[str], hl_lines: list[int], wp: list[str], tbl: list[str]):
    left = recipe(steps, hl_lines=hl_lines)
    right = work_plan(wp) + table(tbl)
    return f'<div class="row"><div class="span6 middle">{left}</div><div class="span6 middle">{right}</div></div>'

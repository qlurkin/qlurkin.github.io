#!/usr/bin/env python3

import re
from base64 import b64encode
from os import remove
from uuid import uuid4 as uuid

import panflute as pf
import typst


def compile(formula: str, display: bool) -> str:
    basename = str(uuid())
    margin = "(x: 0pt, y: 8pt)"
    if display:
        margin = "0pt"
        formula = f" {formula} "
    content = f"#set text(16pt)\n\n#set page(width: auto, height: auto, margin: {margin}, fill: none)\n\n${formula}$\n"
    typ_filename = f"{basename}.typ"
    with open(typ_filename, "w", encoding="utf8") as file:
        file.write(content)
    svg_bytes = typst.compile(typ_filename, format="svg")
    svg_str = svg_bytes.decode("utf8")
    pattern = re.compile(r'height="(.+)pt"')
    match = pattern.search(svg_str)
    if match is not None:
        height = float(match.group(1))
    else:
        height = 23.562
    em = height / 15
    style = f"display: inline-block; height: {em}em; margin: -{0.5 * 16 / 15}em 0;"
    class_name = "typst-formula-inline"
    if display:
        class_name = "typst-formula-display"
        style = f"display: block; height: {em}em; margin: 1em auto;"
    base64 = "data:image/svg+xml;base64," + b64encode(svg_bytes).decode("utf8")
    remove(typ_filename)
    return f'<img class="{class_name}" style="{style}" src="{base64}">'


def action(elem, doc: pf.Doc):
    if "typst" in doc.metadata:
        if isinstance(elem, pf.Math):
            display = elem.format == "DisplayMath"
            result = compile(elem.text, display)
            return pf.RawInline(result, format="html")


def main(doc=None):
    return pf.run_filter(action, doc=doc)


if __name__ == "__main__":
    main()

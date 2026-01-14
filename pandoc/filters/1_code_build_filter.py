#!/usr/bin/env python3

import re
import subprocess as sp
from base64 import b64encode
import io
import contextlib
import os
import sys

import panflute as pf


def plantuml(elem, doc):
    src = elem.text
    pattern = re.compile(r"^title (.+)$", re.MULTILINE)
    match = pattern.search(src)
    caption = None
    if match is not None:
        caption = match.group(1)
        src = src[: match.start()] + src[match.end() :]
    proc = sp.Popen(
        ["plantuml", "-svg", "-pipe"],
        stdin=sp.PIPE,
        stdout=sp.PIPE,
        universal_newlines=True,
    )
    out, err = proc.communicate(src)
    base64 = "data:image/svg+xml;base64," + b64encode(out.encode("utf8")).decode("utf8")
    caption_html = ""
    if caption is not None:
        caption_html = f"<figcaption>{caption}</figcaption>"

    html = f'<figure><img class="plantuml" src="{base64}">{caption_html}</figure>'
    return pf.RawBlock(html, format="html")


def build_python(elem, doc):
    src = elem.text
    buffer = io.StringIO()
    current_dir = os.getcwd()
    dir_added = False
    if current_dir not in sys.path:
        dir_added = True
        sys.path.insert(0, current_dir)

    with contextlib.redirect_stdout(buffer):
        exec(src)

    if dir_added:
        sys.path.remove(current_dir)

    output = buffer.getvalue()

    return pf.RawBlock(output, format="html")


def action(elem, doc):
    if isinstance(elem, pf.CodeBlock):
        lang = elem.classes[0]
        if "build" in elem.classes:
            if lang == "plantuml":
                return plantuml(elem, doc)
            if lang == "python":
                return build_python(elem, doc)


def main(doc=None):
    return pf.run_filter(action, doc=doc)


if __name__ == "__main__":
    main()

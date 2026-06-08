#!/usr/bin/env python3


import panflute as pf


def prepare(doc):
    doc.js_script_id = 0


def action(elem, doc):
    if isinstance(elem, pf.CodeBlock):
        lang = elem.classes[0]
        if "script" in elem.classes:
            if lang == "javascript" or lang == "js":
                id = f"js-script-{doc.js_script_id}"
                doc.js_script_id += 1
                html = f'<div id="{id}"></div><script type="module">\nconst id="{id}"\n{elem.text}\n</script>'
                return pf.RawBlock(html, format="html")


def main(doc=None):
    return pf.run_filter(action, prepare=prepare, doc=doc)


if __name__ == "__main__":
    main()

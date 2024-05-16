#!/usr/bin/env python3

import panflute as pf


def ensure_metalist(doc, key):
    val = doc.get_metadata(key, None)
    if val is None:
        doc.metadata[key] = pf.MetaList()
    elif not isinstance(doc.metadata[key], pf.MetaList):
        doc.metadata[key] = pf.MetaList(doc.metadata[key])


def prepare(doc):
    ty = doc.get_metadata("type", "document")
    ensure_metalist(doc, "css")

    if ty == "document":
        doc.metadata["css"].append("/document.css")
    elif ty == "deck":
        doc.metadata["css"].append("/deck.css")
        ensure_metalist(doc, "header-includes")
        doc.metadata["header-includes"].append(
            pf.MetaInlines(
                pf.RawInline(
                    '<script src="/deck_only.js" defer></script>', format="html"
                )
            )
        )

        # with open("build.log", "w") as file:
        #     file.write(str(doc.metadata["header-includes"]) + "\n")


def action(elem, doc):
    pass


def main(doc=None):
    return pf.run_filter(action, prepare=prepare, doc=doc)


if __name__ == "__main__":
    main()

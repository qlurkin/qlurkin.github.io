import subprocess as sp
from pathlib import Path

from .build import build
from .markdown import prepare_pandoc_cmd


def find_title(path):
    return f"title {path}"


def index(
    *paths: str | Path,
    metadata: dict = {},
    template: str | Path | None = None,
    filters_dir: str | Path | None = None,
):
    cmd = prepare_pandoc_cmd(metadata, template, filters_dir)

    cmd += ["-o", "index.html"]

    doc = ""

    for path in paths:
        doc += f"- [{find_title(path)}]({path}/)\n"

    print(f"INDEX {Path.cwd()}")
    proc = sp.Popen(cmd, stdin=sp.PIPE, stdout=sp.PIPE, universal_newlines=True)
    proc.communicate(doc)


def build_and_index(
    *paths: str | Path,
    metadata: dict = {},
    template: str | Path | None = None,
    filters_dir: str | Path | None = None,
):
    build(*paths)
    index(
        *paths,
        metadata=metadata,
        template=template,
        filters_dir=filters_dir,
    )

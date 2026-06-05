import os
import subprocess as sp
from pathlib import Path

from .config import config


def resolve_prop(
    prop_name: str, prop_value: str | Path | None, root: Path, conf: dict
) -> Path | None:
    if prop_value is None:
        if prop_name in conf:
            prop_value = conf[prop_name]

    if prop_value is not None:
        prop_value = Path(prop_value)
        if not prop_value.is_absolute():
            prop_value = root / prop_value

    return prop_value


def markdown(
    path: str | Path,
    template: str | Path | None = None,
    filters_dir: str | Path | None = None,
):
    root, conf = config()

    template = resolve_prop("template", template, root, conf)
    filters_dir = resolve_prop("filters_dir", filters_dir, root, conf)

    path = Path(path)
    dest = path.parent / (path.stem + ".html")

    cmd = [
        "pandoc",
        "-f",
        "markdown",
        "-t",
        "html",
        "-s",
        "--section-divs",
        "--mathml",
    ]

    if template is not None:
        cmd += ["--template", str(template)]

    if filters_dir is not None:
        for filter in sorted(os.listdir(filters_dir)):
            cmd += [
                "--filter",
                str(filters_dir / filter),
            ]

    cmd += ["-o", str(dest), str(path)]

    sp.run(cmd)
    print(f"MD {path} -> {dest}")

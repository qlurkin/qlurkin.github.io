import os
import subprocess as sp
from pathlib import Path

from .config import config


def metadata_to_cmd_arg(key, value):
    if isinstance(value, bool):
        value = "true" if value else "false"
    return f"--metadata={key}:{value}"


def resolve_config_path(
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


def prepare_pandoc_cmd(
    metadata: dict[str, str | bool] = {},
    template: str | Path | None = None,
    filters_dir: str | Path | None = None,
) -> list[str]:
    root, conf = config()

    template = resolve_config_path("template", template, root, conf)
    filters_dir = resolve_config_path("filters_dir", filters_dir, root, conf)

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

    for key, value in metadata.items():
        cmd.append(metadata_to_cmd_arg(key, value))

    return cmd


def markdown(
    path: str | Path,
    metadata: dict[str, str | bool] = {},
    template: str | Path | None = None,
    filters_dir: str | Path | None = None,
):
    path = Path(path)
    dest = path.parent / (path.stem + ".html")

    cmd = prepare_pandoc_cmd(
        metadata=metadata, template=template, filters_dir=filters_dir
    )
    cmd += ["-o", str(dest), str(path)]

    print(f"MD {path.resolve()}")
    sp.run(cmd)

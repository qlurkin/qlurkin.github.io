import os
import tomllib
from pathlib import Path


def config():
    root_dir = Path.cwd()
    while "build_py.toml" not in os.listdir(root_dir):
        prev = root_dir
        root_dir = prev.parent
        if prev == root_dir:
            return Path.cwd(), {}

    with open(root_dir / "build_py.toml", "rb") as file:
        content = tomllib.load(file)

    return root_dir, content


ROOT_DIR, CONFIG = config()


if __name__ == "__main__":
    print(config())

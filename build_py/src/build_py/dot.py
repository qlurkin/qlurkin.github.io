import subprocess as sp
from pathlib import Path


def dot(path: str | Path):
    path = Path(path)
    dest = path.parent / (path.stem + ".svg")
    cmd = ["dot", "-Tsvg", f"-o{dest}", str(path)]
    sp.run(cmd)
    print(f"DOT {path.resolve()}")

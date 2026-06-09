import subprocess as sp
from pathlib import Path


def plantuml(path: str | Path):
    path = Path(path)
    dest = path.parent / (path.stem + ".svg")
    print(f"PLANTUML {path.resolve()}")
    with open(dest, "w", encoding="utf8") as file:
        cmd = ["plantuml", "--svg", str(path)]
        sp.run(cmd, stdout=file)

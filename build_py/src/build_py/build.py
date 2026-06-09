import subprocess as sp
from pathlib import Path


def build(*paths: str | Path):
    procs = []
    for path in paths:
        path = Path(path)
        print(f"BUILD {(path / 'build.py').resolve()}")
        procs.append(sp.Popen(["python", "build.py"], cwd=path))
    for proc in procs:
        proc.wait()

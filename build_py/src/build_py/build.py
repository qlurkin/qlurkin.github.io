import subprocess as sp
from pathlib import Path
from threading import Thread


def build_one(path: str | Path):
    path = Path(path)
    sp.run(["python", "build.py"], cwd=path)
    print(f"BUILD {path.resolve()}")


def build(*paths: str | Path):
    threads = []
    for path in paths:
        threads.append(Thread(target=build_one, args=(path,)))
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()

import subprocess as sp
from pathlib import Path
from threading import Thread
from typing import Iterable


def build_one(path: str | Path):
    sp.run(["python", "build.py"], cwd=path)


def build(paths: str | Iterable):
    if isinstance(paths, str):
        paths = [paths]

    threads = []
    for path in paths:
        threads.append(Thread(target=build_one, args=(path,)))
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()

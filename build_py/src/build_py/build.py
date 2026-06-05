import subprocess as sp
from pathlib import Path
from threading import Thread


def build_one(path: str | Path):
    sp.run(["python", "build.py"], cwd=path)


def build(*paths: str):
    threads = []
    for path in paths:
        threads.append(Thread(target=build_one, args=(path,)))
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()

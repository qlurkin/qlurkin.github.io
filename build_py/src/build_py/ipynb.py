import json
from pathlib import Path


def ipynb(path: str | Path):
    path = Path(path)
    print(f"IPYNB {path.resolve()}")
    with open(path, encoding="utf8") as file:
        nb = json.load(file)
    for cell in nb["cells"]:
        if cell["cell_type"] == "code":
            cell["outputs"] = []
            cell["execution_count"] = None
    with open(path, "w", encoding="utf8") as file:
        json.dump(nb, file, ensure_ascii=False, indent=2)

import zipfile
from pathlib import Path


def zip(zip_path: str | Path, *files: str | Path):
    zip_path = Path(zip_path)
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
        for file in files:
            file = Path(file)
            if file.is_file():
                z.write(file, arcname=file.name)
            else:
                print(f"Ignored: {file}")
    print(f"ZIP {zip_path.resolve()}")

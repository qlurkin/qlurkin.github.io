from pathlib import Path

from .config import config

HTML = """
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>{}</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <script>
      {}
    </script>
  </body>
</html>
"""


def redirect(target: str, title: str):
    print(f"REDIRECT {Path.cwd()}")
    if target.startswith("http"):
        link = target
        js = f"window.location.href = '{link}'"
    else:
        root, conf = config()
        server_root = root / conf["server_root"]
        link = Path(target).resolve().relative_to(server_root)
        js = f"window.location.pathname = '/{link}'"
    html = HTML.format(title, js)
    with open("index.html", "w", encoding="utf8") as file:
        file.write(html)

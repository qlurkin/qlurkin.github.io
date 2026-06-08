from http.server import HTTPServer, SimpleHTTPRequestHandler
from tomllib import load
from pathlib import Path

with open("build_py.toml", "rb") as file:
    config = load(file)

PORT = 3000
DOSSIER = Path(config["server_root"]).resolve()

handler = SimpleHTTPRequestHandler

server = HTTPServer(
    ("0.0.0.0", PORT),
    lambda *args, **kwargs: handler(*args, directory=DOSSIER, **kwargs),
)

print(f"Server : http://localhost:{PORT}")
print(f"From : {DOSSIER}")

server.serve_forever()

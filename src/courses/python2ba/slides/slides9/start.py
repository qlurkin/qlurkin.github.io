from http import server
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 8000

try:
    with HTTPServer(('', PORT), SimpleHTTPRequestHandler) as httpd:
        print('Serving at port', PORT)
        httpd.serve_forever()
except KeyboardInterrupt:
    print('\nBey')

from http.server import BaseHTTPRequestHandler, HTTPServer, SimpleHTTPRequestHandler

port = 8000

class myHandler(SimpleHTTPRequestHandler):
    def __init__(self, request, client_address, server):
        super().__init__(request, client_address, server, directory='./docs')

def run(server_class=HTTPServer, handler_class=myHandler):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()

try:
    print('listen on port {}'.format(port))
    print('Ctrl-C to quit')
    run()
except KeyboardInterrupt:
    print('\nBey')
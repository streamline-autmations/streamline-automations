import http.server

PORT = 3000

print(f"Starting development server on port {PORT}...")

httpd = http.server.HTTPServer(("", PORT), http.server.SimpleHTTPRequestHandler)
httpd.serve_forever()
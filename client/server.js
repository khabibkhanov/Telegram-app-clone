const http = require('http')
const fs = require('fs')
const path = require('path')
const host = 'localhost'
const PORT = 7000

const server = http.createServer((req, res) => {
	if(req.url === '/' && req.method === 'GET') {
		fs.readFile(path.join('assets', 'index.html'), 'UTF-8', (err, data) => {
			res.writeHead(200, { 'Content-Type': 'text/html' })
			return res.end(data)
		})
	} else if(req.url === '/login' && req.method === 'GET') {
		fs.readFile(path.join('assets', 'pages', 'login.html'), 'UTF-8', (err, data) => {
			res.writeHead(200, { 'Content-Type': 'text/html' })
			return res.end(data)
		})
	} else if(req.url === '/register' && req.method === 'GET') {
		fs.readFile(path.join('assets', 'pages', 'register.html'), 'UTF-8', (err, data) => {
			res.writeHead(200, { 'Content-Type': 'text/html' })
			return res.end(data)
		})
	} else if(req.url === '/message' && req.method === 'GET') {
		fs.readFile(path.join('assets', 'index.html'), 'UTF-8', (err, data) => {
			res.writeHead(200, { 'Content-Type': 'text/html' })
			return res.end(data)
		})
	} else {
		const filePath = req.url
		const reqMimeType = path.extname(filePath)
		if(!reqMimeType) return;

		const mimeTypes = {
			'.css': 'text/css',
			'.html': 'text/html',
			'.js': 'text/javascript'
		}

		const contentType = mimeTypes[reqMimeType] || 'application/octet-stream'

		fs.readFile(path.join('assets', filePath), (err, data) => {
			res.writeHead(200, { 'Content-Type': contentType })
			return res.end(data)
		})
	}
})

server.listen( PORT, () => console.log('Server is running on http://' + host + ':' + PORT))

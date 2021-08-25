const messageModel = require('./model.js')

const GET = (req, res) => {
	try {
		res.writeHead(200, { 'Content-Type': 'application/json', 'Set-Cookie': 'mycookie=test' })
		return res.end( messageModel.fetchAll() )
	} catch(error) {
		res.statusCode = 400
		return res.end('An error occured!')
	}
}

const POST = (req, res) => {
	try {
		let buffer = ''
		req.on('data', (data) => buffer += data)
		req.on('end', () => {
			let newMessage = messageModel.insert( JSON.parse( buffer.toString() ) )
			res.writeHead( 201, { 'Content-Type': 'application/json' })
			return res.end(JSON.stringify({ message: 'The data created!', body: newMessage }))
		})
	} catch(error) {
		res.statusCode = 400
		return res.end('An error occured!')
	}
}

const DELETE = (req, res) => {
	try {
		let buffer = ''
		req.on('data', (data) => buffer += data)
		req.on('end', () => {
			let deleted = messageModel.del( JSON.parse( buffer.toString() ) )
			res.writeHead( 200, { 'Content-Type': 'application/json' })
			return res.end(JSON.stringify({ message: 'The data deleted!', body: deleted }))
		})
	} catch(error) {
		res.statusCode = 400
		return res.end(JSON.stringify({ message: error.message }))
	}
}


module.exports = { GET, POST, DELETE }
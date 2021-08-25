const http = require('http')
const { host, PORT } = require('./config.js')
const Express = require('./lib/express.js')

// load modules
const authController = require('./modules/auth/controller.js')
const messageController = require('./modules/messages/controller')

const server = http.createServer( (req, res) => {
	// CORS cross-origin-acsess-control
	res.setHeader("Access-Control-Allow-Origin", "*")
  	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  	res.setHeader("Access-Control-Allow-Methods", "*")
	if(req.method === 'OPTIONS') return res.end('200')

	const app = new Express(req, res)

	app.post('/register', authController.REGISTER)
	app.post('/login', authController.LOGIN)

	app.get('/message', messageController.GET)
	app.post('/message', messageController.POST)

})

server.listen(PORT, () => console.log("Server is running on http://" + host + ":" + PORT))

let host = 'http://localhost:5000'

async function request (url, method, body) {
	
	let response = await fetch(host + url, {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
	let parsedResponse = await response.json()
	return parsedResponse
}

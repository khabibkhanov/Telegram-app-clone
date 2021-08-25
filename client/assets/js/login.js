let token = window.localStorage.getItem('token')
if (token) window.location = '/'

authForm.onsubmit = async (event) => {
	event.preventDefault()

	let newUser = {
		username: username.value,
		password: password.value
	}

	let response = await request('/login', 'POST', newUser)	
	if(response.username) {
		window.localStorage.setItem('token', response.token)
		window.localStorage.setItem('username', response.username)
		window.location = '/'
	} else {
		error.textContent = response.message
	}
}
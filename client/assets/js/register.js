let token = window.localStorage.getItem('token')
if (token) window.location = '/' 

authForm.onsubmit = async (event) => {
	event.preventDefault()

	let newUser = {
		username: username.value,
		password: password.value,
		email: email.value
	}

	let response = await request('/register', 'POST', newUser)
	if(response) {
		console.log(response);
		if ( response.token === undefined ) {
			error.textContent = response.message
			} else {
			window.localStorage.setItem('token', response.token)
			window.localStorage.setItem('username', response.username)
			window.location = '/'
		}
	}
}
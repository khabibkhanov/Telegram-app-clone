let token = window.localStorage.getItem('token')
if(!token) window.location = '/login'
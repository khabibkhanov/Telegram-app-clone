let localUsername = window.localStorage.getItem('username')

async function sendMessage () {
    let messages = await request('/message', 'GET')
    chat.innerHTML = null

    for(let mes of messages) {

        console.log(mes);
        let speechBuble = document.createElement('div')
        let usernameHolder = document.createElement('h4')
        let messageHolder = document.createElement('p')
        let dateHolder = document.createElement('div')
        let date = document.createElement('span')
        
        if (localUsername == mes.username) {
            speechBuble.setAttribute('class', `chats me`)
        } else {
            speechBuble.setAttribute('class', `chats`)
        }
        
        usernameHolder.setAttribute('class', 'username')
        messageHolder.setAttribute('class', 'message')
        dateHolder.setAttribute('class', 'date-holder')
        date.setAttribute('class', 'date')
        
        usernameHolder.textContent = mes.username
        messageHolder.textContent = mes.message
        date.textContent = mes.date
        
        dateHolder.append(date)
        speechBuble.append(usernameHolder)
        speechBuble.append(messageHolder)
        speechBuble.append(dateHolder)
        chat.append(speechBuble)
    }
}

sendForm.onsubmit = async (event) => {
	event.preventDefault()
	let obj = {
        username: localUsername,
        message: messageText.value
	}

	let response = await request('/message', 'POST', obj)
    // console.log(response);
    if(response) {
        sendMessage()
	}

    sendForm.reset()
}


logOut.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location = '/login'
})

sendMessage()
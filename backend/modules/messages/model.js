const fs = require('fs')
const path = require('path')

const fetchAll = () => {
	try {
		let data = fs.readFileSync(path.join(process.cwd(), 'database', 'messages.json'))
		console.log(data);
		return data
	} catch( error ) {
		return error
	}
}

const insert = (expanse) => {
	try {
		const { username, message } = expanse
		let data = fs.readFileSync(path.join(process.cwd(), 'database', 'messages.json'), 'UTF-8')
		console.log(data);
		let newExpanse
		let date = new Date()
		let hours = date.getHours()
		let minutes = date.getMinutes()
		date = `${hours}:${minutes}`
		if(!data) {
			data = []
			newExpanse = { id: 1, username, message, date: date }
		} else {
			data = JSON.parse(data)
			let id = data.length ? data[data.length - 1].id + 1 : 1
			newExpanse = { id: id, username, message, date: date }
		}
		data.push(newExpanse)
		fs.writeFileSync(path.join(process.cwd(), 'database', 'messages.json'), JSON.stringify(data, null, 4))
		return newExpanse
	} catch(error) {
		throw error
	}
}

const del = (obj) => {
	try {
		let { id } = obj
		let data = fs.readFileSync(path.join(process.cwd(), 'database', 'messages.json'), 'UTF-8')
		if(data) {
			data = JSON.parse(data)
			let filtered = data.filter( el => el.id != id)
			if(filtered.length < data.length) {
				fs.writeFileSync(path.join(process.cwd(), 'database', 'messages.json'), JSON.stringify(filtered, null, 4))
				return filtered
			} else {
				throw 'There is an error in deleting the element!'
			}
		} else throw 'The database is empty!'
	} catch(error) {
		throw error
	}
}


module.exports = {
	fetchAll,
	insert,
	del
}
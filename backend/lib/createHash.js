const crypto = require('crypto')

module.exports = function (data) {
	return hash = crypto.createHash('md5').update(data).digest('hex')
}
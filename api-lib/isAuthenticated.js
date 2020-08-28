const axios = require('axios')
const on = require('await-handler')

const isAuthenticated = (next) => async (req, res) => {
	const [error, authResponse] = await on(
		axios.get('https://accounts.livechatinc.com/info', {
			headers: {
				Authorization: req.headers.authorization,
			},
		})
	)

	if (error) {
		res.status(401).end()
		return
	}

	res.user = authResponse.data

	return next(req, res)
}

module.exports = isAuthenticated

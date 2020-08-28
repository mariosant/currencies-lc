const redis = require('redis')
const isAuthenticated = require('../api-lib/isAuthenticated')

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env

const fn = async (req, res) => {
	const client = redis.createClient({
		host: REDIS_HOST,
		port: REDIS_PORT,
		password: REDIS_PASSWORD,
	})

	const preferencesId = `${res.user.entity_id}_preferences`
	const preferences = await client.get(preferencesId) || {}

	client.quit()

	res.json({ data: preferences })
}

module.exports = isAuthenticated(fn)

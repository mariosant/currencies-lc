const redis = require('redis')
const isAuthenticated = require('../api-lib/isAuthenticated')

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env

const fn = async (req, res) => {
	const client = redis.createClient({
		host: REDIS_HOST,
		port: REDIS_PORT,
		password: REDIS_PASSWORD,
    })
    
    const {body} = req

	const preferencesId = `${res.user.entity_id}_preferences`
    await client.set(preferencesId, body)
    
    client.quit()

	res.json(body)
}

module.exports = isAuthenticated(fn)

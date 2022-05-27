const axios = require('axios')

const FIXER_KEY = process.env['FIXER_KEY']
const ratesUrl = `http://data.fixer.io/api/latest?access_key=${FIXER_KEY}&base=EUR`

const getData = () => axios.get(ratesUrl)

module.exports = async (req, res) => {
	const { data } = await getData()

	res.setHeader('Cache-Control', 's-maxage=7200')

	res.json({
		...data,
		timestamp: data.timestamp * 1000,
	})
}

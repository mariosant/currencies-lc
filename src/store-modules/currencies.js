import { nanoid } from 'nanoid'
import reject from 'ramda/es/reject'
import propEq from 'ramda/es/propEq'
import findIndex from 'ramda/es/findIndex'
import update from 'ramda/es/update'
import ky from 'ky'

const currencies = (store) => {
	// Base currency is always EUR

	store.on('@init', () => {
		store.dispatch('currencies/fetch')

		setInterval(() => store.dispatch('currencies/fetch'), 10 * 60 * 1000)

		return {
			rates: [
				{ name: 'EUR', rate: 1.0 },
				{ name: 'USD', rate: 1 },
			],
			updatedAt: Date.now(),
		}
	})

	store.on('currencies/set', (_, { rates, updatedAt }) => ({
		rates,
		updatedAt,
	}))

	store.on('currencies/fetch', async () => {
		const data = await ky.get('/api/rates').json()

		const rates = Object.entries(data.rates).map(([name, rate]) => ({
			name,
			rate,
		}))

		store.dispatch('currencies/set', {
			rates: rates,
			updatedAt: data.timestamp,
		})
	})
}

export default currencies

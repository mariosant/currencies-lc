import { nanoid } from 'nanoid'
import reject from 'ramda/es/reject'
import propEq from 'ramda/es/propEq'
import findIndex from 'ramda/es/findIndex'
import update from 'ramda/es/update'
import remove from 'ramda/es/remove'

const card = (store) => {
	// Base currency is always EUR

	store.on('@init', () => ({
		card: {
			amount: 1,
			currencies: ['EUR', 'USD'],
		},
	}))

	store.on('card/add', ({ card }) => {
		return {
			card: {
				...card,
				currencies: [...card.currencies, 'USD'],
			},
		}
	})

	store.on('card/remove', ({ card }, index) => {
		if (card.currencies.length === 1) {
			return
		}

		return {
			card: {
				...card,
				currencies: remove(index, 1, card.currencies),
			},
		}
	})

	store.on('card/amount', ({ card, rates }, { amount, currency }) => {
		const { rate } = rates.find(({ name }) => name === currency)

		return {
			card: {
				...card,
				amount: amount / rate,
			},
		}
	})

	store.on('card/currency', ({ card }, { index, currency }) => {
		return {
			card: {
				...card,
				currencies: update(index, currency, card.currencies),
			},
		}
	})
}

export default card

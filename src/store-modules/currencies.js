import { nanoid } from 'nanoid'
import reject from 'ramda/es/reject'
import propEq from 'ramda/es/propEq'
import findIndex from 'ramda/es/findIndex'
import update from 'ramda/es/update'

const currencies = (store) => {
	// Base currency is always EUR

	store.on('@init', () => ({
		rates: [
			{ name: 'EUR', rate: 1.0 },
			{ name: 'USD', rate: 1.3 },
			{ name: 'GBP', rate: 0.8 },
			{ name: 'CAD', rate: 1.6 },
			{ name: 'YEN', rate: 1.1 },
		],
		cards: [
			{
				amount: 10,
				currencies: ['EUR', 'USD'],
				id: nanoid(),
			},
        ],
        updatedAt: Date.now()
	}))

	store.on('cards/add', ({ cards }) => {
		const card = {
			amount: 1,
			currencies: ['EUR', 'USD'],
			id: nanoid(),
		}

		return {
			cards: [...cards, card],
		}
	})

	store.on('cards/remove', ({ cards }, cardId) => ({
		cards: reject(propEq('id', cardId), cards),
	}))

	store.on('cards/duplicate', ({ cards }, cardId) => {
		const card = {
			...cards.find(propEq('id', cardId)),
			id: nanoid(),
		}

		return {
			cards: [...cards, card],
		}
	})

	store.on('cards/amount', ({ cards, rates }, { id, amount, currency }) => {
		const cardIndex = findIndex(propEq('id', id), cards)
        const { rate } = rates.find(({ name }) => name === currency)

		const card = {
			...cards[cardIndex],
			amount: amount / rate,
		}

		return {
			cards: update(cardIndex, card, cards),
		}
    })
    
    store.on('cards/currency', ({cards}, {id, index, currency}) => {
		const cardIndex = findIndex(propEq('id', id), cards)
        const currencies = cards[cardIndex].currencies

        const card = {
			...cards[cardIndex],
			currencies: update(index, currency, currencies)
        }
        
        return {
			cards: update(cardIndex, card, cards),
		}
    })
}

export default currencies

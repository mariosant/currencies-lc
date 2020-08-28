import { createElement } from 'react'
import { createStoreon } from 'storeon'
import { StoreContext } from 'storeon/react'
import { persistState } from '@storeon/localstorage'
import card from './store-modules/card.js'
import currencies from './store-modules/currencies.js'
import auth from './store-modules/auth.js'
import logrocket from './store-modules/logrocket.js'

const { SNOWPACK_PUBLIC_PRODUCTION } = import.meta.env

const plugins = [logrocket, auth, card, currencies, persistState(['card'])]

const store = createStoreon(plugins)

window.store = store

export default store

export const StoreProvider = ({ children }) =>
	createElement(StoreContext.Provider, { value: store }, children)

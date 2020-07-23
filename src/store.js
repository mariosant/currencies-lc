import { createElement } from 'react'
import { createStoreon } from 'storeon'
import { StoreContext } from 'storeon/react'
import { storeonLogger } from 'storeon/devtools'
import card from './store-modules/card.js'
import currencies from './store-modules/currencies.js'

const { SNOWPACK_PUBLIC_PRODUCTION } = import.meta.env

const plugins = [!SNOWPACK_PUBLIC_PRODUCTION && storeonLogger, card, currencies]

const store = createStoreon(plugins)

window.store = store

export default store

export const StoreProvider = ({ children }) =>
	createElement(StoreContext.Provider, { value: store }, children)

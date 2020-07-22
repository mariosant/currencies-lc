import { createElement } from 'react'
import { createStoreon } from 'storeon'
import { StoreContext } from 'storeon/react'
import { storeonLogger } from 'storeon/devtools'
import currencies from './store-modules/currencies.js'

const {
	SNOWPACK_PUBLIC_AUTH0_CLIENT_ID,
	SNOWPACK_PUBLIC_AUTH0_DOMAIN,
} = import.meta.env

const store = createStoreon([storeonLogger, currencies])

window.store = store

export default store

export const StoreProvider = ({ children }) =>
	createElement(StoreContext.Provider, { value: store }, children)

import LogRocket from 'logrocket'
import when from 'ramda/es/when'
import propOr from 'ramda/es/propOr'

const {
	SNOWPACK_PUBLIC_LOGROCKET_APP_ID,
	SNOWPACK_PUBLIC_PRODUCTION,
} = import.meta.env

LogRocket.init(SNOWPACK_PUBLIC_LOGROCKET_APP_ID)

const logRocket = (store) => {
	store.on('@changed', (state, changeSet) => {
		when(
			propOr(false, 'auth'),
			({ auth }) =>
				LogRocket.identify(auth.entity_id, {
					license: auth.license,
				}),
			changeSet
		)
	})

	store.on('error', (state, error) => {
		LogRocket.captureException(error)
	})

	store.on('@dispatch', (state, data) => {
		const log = SNOWPACK_PUBLIC_PRODUCTION ? LogRocket.log : console.log

		if (data[0] === '@changed') {
			const keys = Object.keys(data[1]).join(', ')
			log('changed', keys, state)
		} else {
			log('action', String(data[0]), data[1])
		}
	})
}

export default logRocket

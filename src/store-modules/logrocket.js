import LogRocket from 'logrocket';
import when from 'ramda/es/when';
import propOr from 'ramda/es/propOr';

const { SNOWPACK_PUBLIC_LOGROCKET_APP_ID } = import.meta.env
const logRocket = (store) => {
	LogRocket.init(SNOWPACK_PUBLIC_LOGROCKET_APP_ID)

	store.on(
		'@changed',
		(state, changeSet) => {
			when(
				propOr(false, 'auth'),
				({auth}) => LogRocket.identify(auth.entity_id, {
					license: auth.license
				}),
				changeSet
			)
		}
	)
}

export default logRocket

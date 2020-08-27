import { accountsSdk } from '@livechat/accounts-sdk'
const { SNOWPACK_PUBLIC_LC_CLIENT_ID } = import.meta.env

const auth = (store) => {
	const authInstance = accountsSdk.init({
		client_id: SNOWPACK_PUBLIC_LC_CLIENT_ID,
		onIdentityFetched: (error, data) => {
			if (error) {
				store.dispatch('error', error)
			} else {
				store.dispatch('auth/set', data)
			}
		},
	})

	store.on('@init', () => {
		return {}
	})

	store.on('auth/set', (state, auth) => {
		return {
			auth,
		}
	})
}

export default auth

import ClientOauth2 from 'client-oauth2'
import ky from 'ky'

const { SNOWPACK_PUBLIC_LC_CLIENT_ID } = import.meta.env
const accountsUri = 'https://accounts.livechatinc.com'

const redirectToAccounts = () => {
	window.location.href = `${authInstance.token.getUri()}`
}

const getAuthToken = () => {
	const authInstance = new ClientOauth2({
		clientId: SNOWPACK_PUBLIC_LC_CLIENT_ID,
		redirectUri: origin,
		accessTokenUri: accountsUri,
		authorizationUri: accountsUri,
	})

	return authInstance.token
		.getToken(document.URL)
		.then(({ data, expires }) =>
			ky
				.get(`${accountsUri}/info`, {
					headers: {
						Authorization: `Bearer ${data.access_token}`,
					},
				})
				.json()
		)
		.catch(() => {
			redirectToAccounts()
		})
}

const auth = (store) => {
	store.on('@init', () => {
		getAuthToken().then((response) => {
			store.dispatch('auth/set', response)
		})

		return {}
	})

	store.on('auth/set', (_state, auth) => {
		return {
			auth,
		}
	})
}

export default auth

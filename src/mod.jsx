import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { StoreProvider } from './store.js'
import App from './App.jsx'
import theme from './theme.js'

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<>
				<CSSReset />
				<StoreProvider>
					<App />
				</StoreProvider>
			</>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
	import.meta.hot.accept()
}

import React, { useEffect } from 'react'
import { useStoreon } from 'storeon/react'
import { Box, Flex, Stack, Text, Heading } from '@chakra-ui/core'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { StoreProvider } from './store.js'
import theme from './theme.js'
import AppContainer from './components/app-container.jsx'
import CurrencyCard from './components/currency-card.jsx'
import AddButton from './components/add-button.jsx'
import Link from './components/link.jsx'
import Pending from './components/pending.jsx'

const AppHeader = (props) => (
	<Heading as="h1" size="lg" px={3} {...props}>
		{props.children}
	</Heading>
)

const FooterText = (props) => (
	<Text fontSize="sm" color="gray.400" {...props}>
		{props.children}
	</Text>
)

const Layout = ({ children }) => (
	<AppContainer>
		<Stack spacing={5}>{children}</Stack>
		<Box>
			<FooterText>
				<Link href="https://www.livechat.com/community/" isExternal>
					Join our community
				</Link>{' '}
				for feedback & support
			</FooterText>
		</Box>
	</AppContainer>
)

const App = () => {
	const { auth, card, rates, dispatch } = useStoreon('auth', 'card', 'rates')
	const addCard = () => dispatch('card/add')

	return auth && rates ? (
		<Layout>
			<AppHeader>Currencies</AppHeader>
			<CurrencyCard card={card} />
			<Box textAlign="center">
				<AddButton onClick={addCard} />
			</Box>
		</Layout>
	) : (
		<Layout>
			<AppHeader>Currencies</AppHeader>
			<Pending />
		</Layout>
	)
}

export default () => (
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<>
				<CSSReset />
				<StoreProvider>
					<App />
				</StoreProvider>
			</>
		</ThemeProvider>
	</React.StrictMode>
)

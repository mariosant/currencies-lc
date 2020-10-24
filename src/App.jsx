import * as React from 'react'
import { useStoreon } from 'storeon/react'
import {
	Flex,
	Stack,
	Text,
	Heading,
	Button,
} from '@chakra-ui/core'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { StoreProvider } from './store.js'
import theme from './theme.js'
import AppContainer from './components/app-container.jsx'
import CurrencyCard from './components/currency-card.jsx'
import Link from './components/link.jsx'
import Pending from './components/pending.jsx'

const AppHeader = (props) => (
	<Heading as="h1" size="lg" {...props}>
		{props.children}
	</Heading>
)

const FooterText = (props) => (
	<Text color="gray.400" textAlign="center" {...props}>
		{props.children}
	</Text>
)

const Layout = ({ children }) => (
	<AppContainer>
		<Stack spacing={5}>{children}</Stack>
		<FooterText>
			⚡ by{' '}
			<Link href="https://mariosant.dev" isExternal>
				mariosant
			</Link>
		</FooterText>
	</AppContainer>
)

const App = () => {
	const { auth, card, rates, dispatch } = useStoreon('auth', 'card', 'rates')
	const addCard = () => dispatch('card/add')

	return auth && rates ? (
		<Layout>
			<Flex px={3} justifyContent="space-between" alignItems="baseline">
				<AppHeader>Currencies</AppHeader>

				<Button onClick={addCard} variant="link" variantColor="blue">
					+ Add Currency
				</Button>
			</Flex>
			<CurrencyCard card={card} />
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

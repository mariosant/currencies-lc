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

const App = () => {
	const { card, rates, dispatch } = useStoreon('card', 'rates')

	const addCard = () => dispatch('card/add')

	return (
		<AppContainer>
			<Stack spacing={5}>
				<AppHeader>Currencies</AppHeader>
				<CurrencyCard card={card} />
				<Box textAlign="center">
					<AddButton onClick={addCard} />
				</Box>
			</Stack>
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

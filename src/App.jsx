import React, { useEffect } from 'react'
import { useStoreon } from 'storeon/react'
import { Box, Flex, Stack, IconButton, Text, Link } from '@chakra-ui/core'
import colors from '@livechat/design-system-colors'
import CurrencyCard from './components/currency-card'

const { blue50 } = colors

const App = () => {
	const { cards, rates, dispatch } = useStoreon('cards', 'rates')

	const Cards = cards.map((card) => {
		return <CurrencyCard key={card.id} card={card} />
	})

	useEffect(() => {
		dispatch('currencies/fetch')
	}, [])

	return (
		<Flex
			flexDir="column"
			justifyContent="space-between"
			p={3}
			bg={blue50}
			minHeight="100vh"
		>
			<Stack spacing={3}>
				{Cards}
				<Box textAlign="center">
					<IconButton
						isRound
						size="lg"
						icon="small-add"
						bg="white"
						onClick={() => dispatch('cards/add')}
					/>
				</Box>
			</Stack>
			<Box>
				<Text fontSize="sm" color="gray.500">
					Join our <Link href="https://spectrum.chat/currencies-for-lc" target="_blank">Spectrum community</Link> for feedback & support
				</Text>
			</Box>
		</Flex>
	)
}

export default App

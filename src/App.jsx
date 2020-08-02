import React, { useEffect } from 'react'
import { useStoreon } from 'storeon/react'
import { Box, Flex, Stack, IconButton, Text, Link } from '@chakra-ui/core'
import colors from '@livechat/design-system-colors'
import CurrencyCard from './components/currency-card'

const { blue50 } = colors

const App = () => {
	const { card, rates, dispatch } = useStoreon('card', 'rates')

	return (
		<Flex
			flexDir="column"
			justifyContent="space-between"
			p={3}
			bg="bodyBackground"
			minHeight="100vh"
		>
			<Stack spacing={5}>
				<CurrencyCard card={card} />
				<Box textAlign="center">
					<IconButton
						isRound
						size="md"
						icon="small-add"
						bg="white"
						color="gray.500"
						variant="outline"
						onClick={() => dispatch('card/add')}
					/>
				</Box>
			</Stack>
			<Box>
				<Text fontSize="sm" color="gray.400">
					Join our{' '}
					<Link href="https://spectrum.chat/currencies-for-lc" target="_blank">
						Spectrum community
					</Link>{' '}
					for feedback & support
				</Text>
			</Box>
		</Flex>
	)
}

export default App

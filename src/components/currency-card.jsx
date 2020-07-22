import React from 'react'
import { useStoreon } from 'storeon/react'
import {
	Box,
	Button,
	Flex,
	IconButton,
	Input,
	Select,
	Stack,
	Divider,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/core'
import NumberFormat from 'react-number-format'
import colors from '@livechat/design-system-colors'
import propEq from 'ramda/es/propEq'
import find from 'ramda/es/find'
import prop from 'ramda/es/prop'
import pipe from 'ramda/es/pipe'
import TimeAgo from 'react-timeago'

const { gray500, gray200 } = colors

const CurrencyInput = ({
	currency,
	value,
	onCurrencyChange,
	onValueChange,
	...props
}) => {
	const { rates } = useStoreon('rates')

	return (
		<Stack spacing={1} {...props}>
			<Flex justifyContent="space-between">
				<Menu>
					<MenuButton
						as={Button}
						rightIcon="chevron-down"
						fontSize="12px"
						variant="unstyled"
						height="20px"
					>
						{currency}
					</MenuButton>
					<MenuList>
						{rates.map(({ name }) => (
							<MenuItem key={name} onClick={() => onCurrencyChange(name)}>
								{name}
							</MenuItem>
						))}
					</MenuList>
				</Menu>
			</Flex>

			<NumberFormat
				fixedDecimalScale
				decimalScale={2}
				customInput={Input}
				variant="flushed"
				size="lg"
				value={value}
				boxSizing="border-box"
				border="none"
				fontSize={36}
				p={0}
				onChange={onValueChange}
			/>
		</Stack>
	)
}

const getRate = (rates) => (currency) =>
	pipe(find(propEq('name', currency)), prop('rate'))(rates)

const CurrencyCard = ({ card, ...props }) => {
	const { rates, updatedAt, dispatch } = useStoreon('rates', 'updatedAt')

	const removeCard = () => dispatch('cards/remove', card.id)
	const duplicateCard = () => dispatch('cards/duplicate', card.id)

	const onValueChange = (currency) => ({ target }) =>
		dispatch('cards/amount', {
			currency,
			id: card.id,
			amount: Number(target.value),
		})

	const onCurrencyChange = (index) => (currency) =>
		dispatch('cards/currency', {
			index,
			currency,
			id: card.id,
		})

	const getCurrencyRate = getRate(rates)

	return (
		<Box
			position="relative"
			bg="white"
			p={3}
			border={`1px solid ${gray200}`}
			borderRadius={4}
			{...props}
		>
			<Menu mb={3}>
				<MenuButton
					as={IconButton}
					variant="ghost"
					fontSize="12px"
					icon="settings"
					p={2}
					position="absolute"
					right="0.5rem"
					top="0.5rem"
					zIndex={9999999999}
				></MenuButton>
				<MenuList>
					<MenuItem onClick={duplicateCard}>Duplicate</MenuItem>
					<MenuItem onClick={removeCard}>Delete</MenuItem>
				</MenuList>
			</Menu>
			<Stack spacing={3}>
				{card.currencies.map((currency, i) => (
					<CurrencyInput
						key={currency}
						currency={currency}
						value={getCurrencyRate(currency) * card.amount}
						onValueChange={onValueChange(currency)}
						onCurrencyChange={onCurrencyChange(i)}
					/>
				))}
			</Stack>

			<Divider />

			<Text fontSize="sm" color={gray500}>
				Last updated <TimeAgo date={updatedAt} />
			</Text>
		</Box>
	)
}

export default CurrencyCard

import React from 'react'
import { useStoreon } from 'storeon/react'
import useTimeAgo from '@rooks/use-time-ago'
import {
	Box,
	Flex,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Divider,
	Text,
} from '@chakra-ui/core'
import NumberFormat from 'react-number-format'
import colors from '@livechat/design-system-colors'
import propEq from 'ramda/es/propEq'
import find from 'ramda/es/find'
import prop from 'ramda/es/prop'
import pipe from 'ramda/es/pipe'
import CurrencyPicker from './currency-picker'

const { gray500 } = colors

const CurrencyInput = ({
	currency,
	value,
	onCurrencyChange,
	onValueChange,
	onRemove,
	...props
}) => {
	const { rates } = useStoreon('card', 'rates')

	return (
		<Stack spacing={1} {...props}>
			<Flex justifyContent="space-between">
				<CurrencyPicker
					rates={rates}
					onChange={onCurrencyChange}
					currency={currency}
				/>
			</Flex>

			<InputGroup>
				<NumberFormat
					fixedDecimalScale
					decimalScale={2}
					customInput={Input}
					variant="flushed"
					size="lg"
					value={value}
					boxSizing="border-box"
					border="none"
					fontSize="3xl"
					p={0}
					onChange={onValueChange}
				/>
				<InputRightElement>
					<IconButton
						icon="close"
						size="sm"
						variant="ghost"
						variantColor="red"
						onClick={onRemove}
					/>
				</InputRightElement>
			</InputGroup>
		</Stack>
	)
}

const getRate = (rates) => (currency) =>
	pipe(find(propEq('name', currency)), prop('rate'))(rates)

const CurrencyCard = ({ card, ...props }) => {
	const { rates, updatedAt, dispatch } = useStoreon('rates', 'updatedAt')

	const onValueChange = (currency) => ({ target }) =>
		dispatch('card/amount', {
			currency,
			amount: Number(target.value),
		})

	const onCurrencyChange = (index) => (currency) =>
		dispatch('card/currency', {
			index,
			currency,
		})

	const onRemove = (index) => () => dispatch('card/remove', index)

	const getCurrencyRate = getRate(rates)

    const timeAgo = useTimeAgo(updatedAt);
	return (
		<Box
			position="relative"
			bg="white"
			p={3}
			border="1px"
			borderRadius="lg"
			{...props}
		>
			<Stack spacing={3}>
				{card.currencies.map((currency, i) => (
					<CurrencyInput
						key={currency + i}
						currency={currency}
						value={getCurrencyRate(currency) * card.amount}
						onValueChange={onValueChange(currency)}
						onCurrencyChange={onCurrencyChange(i)}
						onRemove={onRemove(i)}
					/>
				))}
			</Stack>

			<Divider />
            
			<Text fontSize="sm" color="gray.500">
				Last updated {timeAgo}
			</Text>
		</Box>
	)
}

export default CurrencyCard

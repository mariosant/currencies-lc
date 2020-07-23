import React from 'react'
import { useStoreon } from 'storeon/react'
import {
	Box,
	MenuButton,
	Menu,
	Button,
	MenuList,
	MenuItem,
	MenuDivider,
	Input,
} from '@chakra-ui/core'
import { take, toLower } from 'ramda'

const CurrencyPicker = ({ rates, currency, onChange }) => {
	const favorites = ['EUR', 'USD', 'GBP', 'CAD']

	return (
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
			<MenuList maxHeight={350} overflowY="auto">
				{favorites.map((rate) => (
					<MenuItem key={rate} onClick={() => onChange(rate)}>
						{rate}
					</MenuItem>
				))}
				<MenuDivider borderColor="#ccc" />
				{rates.map(({ name }) => (
					<MenuItem key={name} onClick={() => onChange(name)}>
						{name}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	)
}

export default CurrencyPicker

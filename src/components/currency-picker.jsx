import React from 'react'
import { useStoreon } from 'storeon/react'
import {
	MenuButton,
	Menu,
	Button,
	MenuList,
	MenuItem,
	MenuDivider,
} from '@chakra-ui/core'

const favorites = ['EUR', 'USD', 'GBP', 'CAD']

const CurrencyPicker = ({ availableCurrencies, currency, onChange }) => {
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
				{availableCurrencies.map((currency) => (
					<MenuItem key={currency} onClick={() => onChange(currency)}>
						{currency}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	)
}

export default CurrencyPicker

import React from 'react'
import { IconButton } from '@chakra-ui/core'

const AddButton = (props) => (
	<IconButton
		isRound
		size="md"
		icon="small-add"
		bg="white"
		color="gray.500"
		variant="outline"
		{...props}
	/>
)

export default AddButton

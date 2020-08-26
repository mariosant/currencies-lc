import React, { useEffect } from 'react'
import { Flex } from '@chakra-ui/core'

const AppContainer = (props) => (
	<Flex
		flexDir="column"
		justifyContent="space-between"
		py={5}
		px={3}
		bg="bodyBackground"
		minHeight="100vh"
		{...props}
	>
		{props.children}
	</Flex>
)

export default AppContainer

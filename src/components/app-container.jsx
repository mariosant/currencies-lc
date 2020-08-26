import React, { useEffect } from 'react'
import { Flex } from '@chakra-ui/core'

const AppContainer = (props) => (
	<Flex
		flexDir="column"
		justifyContent="space-between"
		paddingTop="14px"
		paddingBottom={3}
		px={2}
		bg="bodyBackground"
		minHeight="100vh"
		{...props}
	>
		{props.children}
	</Flex>
)

export default AppContainer

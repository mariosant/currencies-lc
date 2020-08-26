import React from 'react'
import { Link } from '@chakra-ui/core'

const CustomLink = (props) => (
	<Link textDecoration="underline" {...props}>
		{props.children}
	</Link>
)

export default CustomLink

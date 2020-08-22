import React from 'react'
import { Box } from '@chakra-ui/core'

const Card = (props) => <Box
    position="relative"
    bg="white"
    p={3}
    border="1px"
    borderRadius="lg"
    {...props}
>{props.children}</Box>

export default Card

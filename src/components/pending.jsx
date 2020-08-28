import React from 'react'
import { Stack, Skeleton, Divider, Flex } from '@chakra-ui/core'
import Card from './card'

const Pending = () => (
	<Card>
		<Stack spacing={8}>
			<Stack spacing={3}>
				<Skeleton height={3} width={80} />
				<Flex justifyContent="space-between">
					<Skeleton height={5} width={100} />
					<Skeleton height={5} width={5} />
				</Flex>
			</Stack>
			<Stack spacing={2}>
				<Skeleton height={3} width={80} />
				<Flex justifyContent="space-between">
					<Skeleton height={5} width={100} />
					<Skeleton height={5} width={5} />
				</Flex>
			</Stack>
		</Stack>

		<Divider my={3} />

		<Skeleton height={3} width={100} />
	</Card>
)

export default Pending

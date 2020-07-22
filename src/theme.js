import { theme as defaultTheme } from '@chakra-ui/core'

const theme = {
	...defaultTheme,
	fonts: {
		heading: '"Source Sans Pro", sans-serif',
		body: '"Source Sans Pro", sans-serif',
		mono: 'Menlo, monospace',
	},
	fontWeights: {
		normal: 400,
		medium: 600,
		bold: 700,
	},
}

export default theme

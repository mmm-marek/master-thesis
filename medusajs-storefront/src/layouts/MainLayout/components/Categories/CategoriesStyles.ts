import Link from 'next/link'
import styled from 'styled-components'

import { textMdSemibold } from '@/styles/helpers'

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 8px;
	width: 100%;
	max-width: 440px;
`

export const CategoryLink = styled(Link)`
	${textMdSemibold};
	text-transform: uppercase;
	color: white;

	&:hover {
		text-decoration: underline;
		color: white;
	}
`

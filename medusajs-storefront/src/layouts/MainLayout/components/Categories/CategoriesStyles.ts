import Link from 'next/link'
import styled, { css } from 'styled-components'

import { textMdSemibold } from '@/styles/helpers'

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 8px;
	width: 100%;
	max-width: 340px;
`

export const CategoryLink = styled(Link)`
	${({ theme }) => css`
		${textMdSemibold};
		text-transform: capitalize;
		color: ${theme.tokens['color-base-content-primary']};

		&:hover {
			text-decoration: underline;
			color: ${theme.tokens['color-base-content-primary']};
		}
	`}
`

import styled, { css } from 'styled-components'

import { breakpoints, headingSmSemibold } from '@/styles/helpers'

export const Heading = styled.h1`
	${({ theme }) => css`
		${headingSmSemibold};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const CartItemsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

export const CartWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 32px;
	margin-bottom: 16px;

	@media (min-width: ${breakpoints.md}px) {
		grid-template-columns: 2fr 1fr;
	}
`

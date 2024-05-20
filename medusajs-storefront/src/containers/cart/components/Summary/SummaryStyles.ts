import styled, { css } from 'styled-components'

import { headingSmSemibold, textLgSemibold, textMdMedium } from '@/styles/helpers'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

export const Heading = styled.h2`
	${({ theme }) => css`
		${headingSmSemibold};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const SummaryItem = styled.div`
	${({ theme }) => css`
		display: flex;
		justify-content: space-between;
		color: ${theme.tokens['color-base-content-secondary']};
		${textMdMedium};
	`}
`

export const Total = styled.div`
	${({ theme }) => css`
		display: flex;
		justify-content: space-between;
		border-top: 1px solid ${theme.tokens['color-base-surface-tertiary']};
		border-bottom: 1px solid ${theme.tokens['color-base-surface-tertiary']};
		padding: 16px 0;
		color: ${theme.tokens['color-base-content-primary']};
		${textLgSemibold};
	`}
`

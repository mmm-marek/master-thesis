import styled, { css } from 'styled-components'

import { headingSmSemibold, textMdMedium, textXxlSemibold } from '@/styles/helpers'

export const Wrapper = styled.div`
	${({ theme }) => css`
		display: flex;
		flex-direction: column;
		gap: 16px;
		border-radius: 16px;
		background: ${theme.tokens['color-base-surface-secondary']};
		padding: 16px;
		height: fit-content;
	`}
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
		${textXxlSemibold};
	`}
`

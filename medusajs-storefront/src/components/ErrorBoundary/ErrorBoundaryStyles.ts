import styled, { css } from 'styled-components'

import { headingXsSemibold, textMdRegular } from '@/styles/helpers'

export const ErrorBoundaryWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	min-height: 300px;
`

export const Content = styled.div`
	${({ theme }) => css`
		display: flex;
		flex-direction: column;
		gap: ${theme.spacing[12]};
		align-items: center;
		justify-content: center;
	`}
`

export const Title = styled.h1`
	${({ theme }) => css`
		margin-bottom: ${theme.spacingRem[4]};
		text-align: center;
		${headingXsSemibold};
		color: ${theme['color-base-content-primary']};
	`}
`

export const Description = styled.p`
	${({ theme }) => css`
		${textMdRegular};
		text-align: center;
		color: ${theme['color-base-content-tertiary']};
	`}
`

import styled, { css } from 'styled-components'

import { headingXsSemibold } from '@/styles/helpers'

export const ErrorBoundaryExampleContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	min-height: 300px;
`

export const Title = styled.h1`
	${({ theme }) => css`
		margin-bottom: ${theme.spacingRem[4]};
		text-align: center;
		${headingXsSemibold};
		color: ${theme['color-base-content-primary']};
	`}
`

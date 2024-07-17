import styled, { css } from 'styled-components'

import { headingSmSemibold, textMdSemibold } from '@/styles/helpers'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	align-items: center;
	justify-content: center;
`

export const Title = styled.h1`
	${({ theme }) => css`
		color: ${theme.tokens['color-base-content-primary']};
		${headingSmSemibold};
	`}
`

export const Description = styled.p`
	${({ theme }) => css`
		color: ${theme.tokens['color-base-content-secondary']};
		${textMdSemibold};
	`}
`

export const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-items: center;
`

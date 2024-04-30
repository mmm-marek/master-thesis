import styled from 'styled-components'

import { breakpoints, headingSmSemibold, headingXsSemibold, headingXxlBold, textMdRegular } from '@/styles/helpers'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing[32]};
	align-items: center;
	justify-content: center;
	margin: 0 auto;
	padding: ${({ theme }) => theme.spacing[16]};
	max-width: 360px;
	min-height: 100vh;
`

export const StatusCode = styled.h1`
	${headingXxlBold};
	color: ${({ theme }) => theme.tokens['color-base-action-primary-default']};
`

export const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing[4]};
	align-items: center;
`

export const Title = styled.h2`
	margin-bottom: ${({ theme }) => theme.spacingRem[4]};
	${headingXsSemibold};
	text-align: center;
	color: ${({ theme }) => theme.tokens['color-base-content-primary']};

	@media (min-width: ${breakpoints.md}px) {
		${headingSmSemibold};
	}
`

export const Message = styled.p`
	${textMdRegular};
	text-align: center;
	color: ${({ theme }) => theme.tokens['color-base-content-tertiary']};
`

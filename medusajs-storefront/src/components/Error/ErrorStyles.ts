import styled from 'styled-components'

import { headingSmSemibold, textMdMedium } from '@/styles/helpers'

export const ErrorContainer = styled.div<{ $height: string }>`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacingRem[12]};
	align-items: center;
	justify-content: center;
	padding: ${({ theme }) => theme.spacingRem[16]};
	height: ${({ $height }) => $height};
`

export const ErrorHeading = styled.h1`
	${headingSmSemibold};
	text-align: center;
	color: ${({ theme }) => theme.tokens['color-base-content-primary']};
`

export const ErrorText = styled.p`
	${textMdMedium};
	text-align: center;
	color: ${({ theme }) => theme.tokens['color-base-content-secondary']};
`

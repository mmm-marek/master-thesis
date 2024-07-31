import styled from 'styled-components'

import { breakpoints, headingXsSemibold, textMdRegular, textXxlSemibold } from '@/styles/helpers'

export const Header = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing[16]};
	margin-bottom: ${({ theme }) => theme.spacing[24]};

	@media (min-width: ${breakpoints.md}px) {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-bottom: ${({ theme }) => theme.spacing[32]};
	}
`

export const TitleWrapper = styled.div``

export const Title = styled.h1`
	margin: 0;
	${textXxlSemibold};
	color: ${({ theme }) => theme.tokens['color-base-content-primary']};

	@media (min-width: ${breakpoints.md}px) {
		${headingXsSemibold};
	}
`

export const Description = styled.span`
	max-width: 600px;
	${textMdRegular};
	color: ${({ theme }) => theme.tokens['color-base-content-tertiary']};
`

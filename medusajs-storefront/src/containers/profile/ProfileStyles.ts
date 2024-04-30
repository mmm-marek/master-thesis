import styled from 'styled-components'

import { breakpoints, textMdSemibold } from '@/styles/helpers'

export const MainContainer = styled.div`
	border: ${(p) => `${p.theme.borderWidth.xs} solid ${p.theme.tokens['color-base-content-quintarny']}`};
	border-radius: ${(p) => p.theme.borderRadius[12]};
	background: ${(p) => p.theme.tokens['color-base-surface-primary']};
	padding: ${(p) => p.theme.spacing[16]};

	@media (min-width: ${breakpoints.md}px) {
		padding: ${(p) => p.theme.spacing[24]};
	}
`

export const TitleWrapper = styled.div`
	display: flex;
	gap: ${(p) => p.theme.spacing[16]};
	align-items: center;
	margin-bottom: ${(p) => p.theme.spacing[16]};
	${textMdSemibold};
	color: ${(p) => p.theme.tokens['color-base-content-primary']};

	svg {
		flex-shrink: 0;
		width: 1.5rem;
		height: auto;
		color: ${(p) => p.theme.tokens['color-base-action-primary-default']};
	}

	@media (min-width: ${breakpoints.md}px) {
		margin-bottom: ${(p) => p.theme.spacing[24]};
	}
`

export const Title = styled.h2`
	margin-bottom: 0;
	${textMdSemibold};
	color: ${(p) => p.theme.tokens['color-base-content-primary']};
`

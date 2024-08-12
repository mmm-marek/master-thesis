import styled, { css } from 'styled-components'

import { breakpoints, headingSmSemibold, textXxlSemibold } from '@/styles/helpers'

export const Container = styled.div`
	${({ theme }) => css`
		display: grid;
		margin-bottom: 64px;

		& .ant-collapse-header {
			margin-left: -16px;
		}

		@media (min-width: ${breakpoints.md}px) {
			grid-template-columns: 1fr 1fr;
			gap: ${theme.spacing[64]};
		}
	`}
`

export const CollapseItemLabel = styled.div<{ $disabled?: boolean }>`
	${({ theme, $disabled }) => css`
		transition: color 0.3s ease;
		color: ${$disabled ? theme.tokens['color-base-content-quaternary'] : theme.tokens['color-base-content-primary']};
		${textXxlSemibold};
	`}
`

export const Heading = styled.h1`
	${({ theme }) => css`
		margin-bottom: 8px;
		color: ${theme.tokens['color-base-content-primary']};
		${headingSmSemibold};
	`}
`

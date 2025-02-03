import { Tab, TabList } from 'react-aria-components'
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

export const StyledTab = styled(Tab)`
	${({ theme }) => css`
		transition: color 0.3s ease;
		border: 1px solid transparent;
		cursor: pointer;
		color: ${theme.tokens['color-base-content-primary']};
		${textXxlSemibold};

		&[data-disabled] {
			color: ${theme.tokens['color-base-content-quaternary']};
		}

		&[data-focused],
		&[data-focus-visible],
		&[data-selected] {
			border-bottom: 1px solid ${theme.tokens['color-base-action-primary-active']};
		}
	`}
`

export const Heading = styled.h1`
	${({ theme }) => css`
		margin-bottom: 8px;
		color: ${theme.tokens['color-base-content-primary']};
		${headingSmSemibold};
	`}
`

export const StyledTabsList = styled(TabList)`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	margin-bottom: 0.5rem;
`

import { Breadcrumb as AriaBreadcrumb, Breadcrumbs as AriaBreadcrumbs, Link as AriaLink } from 'react-aria-components'
import styled, { css } from 'styled-components'

import { textSmRegular } from '@/styles/helpers'

export const Breadcrumbs = styled(AriaBreadcrumbs)`
	display: flex;
	gap: 8px;
	align-items: center;
	padding: 8px 0;
	list-style: none;
`

export const Breadcrumb = styled(AriaBreadcrumb)`
	display: flex;
	gap: 8px;
	align-items: center;
`

export const Link = styled(AriaLink)`
	${({ theme }) => css`
		transition: color 300ms ease;
		cursor: pointer;
		text-decoration: none;
		color: ${theme.tokens['color-base-content-primary']};
		${textSmRegular};

		&[data-current] {
			color: ${theme.tokens['color-base-content-secondary']};
			pointer-events: none;
		}

		&[data-hovered] {
			color: ${theme.tokens['color-base-action-primary-hover']};
		}
	`}
`

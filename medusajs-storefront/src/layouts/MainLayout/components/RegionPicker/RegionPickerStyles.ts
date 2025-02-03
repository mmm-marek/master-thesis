import { Button as AriaButton, ListBox as AriaListBox, ListBoxItem as AriaListBoxItem } from 'react-aria-components'
import styled, { css } from 'styled-components'

import { textXsRegular } from '@/styles/helpers'

export const Button = styled(AriaButton)`
	${({ theme }) => css`
		border: none;
		background: none;
		text-decoration: underline;
		color: ${theme.tokens['color-inverse-content-primary']};
		${textXsRegular};

		&[data-hovered] {
			cursor: pointer;
			color: ${theme.tokens['color-inverse-content-secondary']};
		}
	`};
`

export const ListBox = styled(AriaListBox)`
	${({ theme }) => css`
		display: flex;
		flex-direction: column;
		gap: 8px;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
		background: ${theme.tokens['color-base-surface-primary']};
		padding: 16px;
	`};
`

export const ListBoxItem = styled(AriaListBoxItem)`
	${({ theme }) => css`
		border-radius: 4px;
		background: ${theme.tokens['color-base-surface-secondary']};
		padding: 2px 4px;
		color: ${theme.tokens['color-base-content-primary']};
		${textXsRegular};

		&[data-selected] {
			background: ${theme.tokens['color-base-action-primary-default']};
			color: ${theme.tokens['color-inverse-content-primary']};
		}

		&[data-hovered] {
			background: ${theme.tokens['color-base-surface-tertiary']};
			cursor: pointer;
		}
	`};
`

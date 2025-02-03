import { FieldError as AriaFieldError, Label as AriaLabel, TextArea as AriaTextArea, TextField as AriaTextField } from 'react-aria-components'
import styled, { css } from 'styled-components'

import { textSmRegular, textXsRegular } from '@/styles/helpers'

export const TextField = styled(AriaTextField)`
	display: flex;
	flex-direction: column;
	gap: 4px;
`

export const Label = styled(AriaLabel)`
	${({ theme }) => css`
		position: relative;
		width: fit-content;
		color: ${theme.tokens['color-base-content-primary']};
		${textSmRegular};
	`}
`

export const TextArea = styled(AriaTextArea)`
	${({ theme }) => css`
		transition: background 300ms ease;
		border: none;
		border-radius: 24px;
		background: ${theme.tokens['color-base-action-secondary-default']};
		padding: 0.75rem 1.25rem;
		width: 100%;
		${textSmRegular};

		&[data-hovered] {
			background: ${theme.tokens['color-base-action-secondary-hover']};
		}

		&[data-focused] {
			background: ${theme.tokens['color-base-action-secondary-default']};
		}

		&[data-focus-visible] {
			background: ${theme.tokens['color-base-action-secondary-default']};
		}

		&[data-disabled] {
			opacity: 0.75;
			pointer-events: none;
		}

		&[data-invalid] {
			outline: 1px solid ${theme.tokens['color-base-action-destructive-active']};
		}
	`}
`

export const FieldError = styled(AriaFieldError)`
	${({ theme }) => css`
		color: ${theme.tokens['color-base-action-destructive-active']};
		${textXsRegular};
	`}
`

export const Asterisk = styled.span`
	position: absolute;
	top: 2px;
	right: -8px;
	color: ${({ theme }) => theme.tokens['color-base-action-destructive-active']};
	${textXsRegular};
`

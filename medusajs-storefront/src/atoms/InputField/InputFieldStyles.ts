import { FieldError as AriaFieldError, Input as AriaInput, Label as AriaLabel, TextField as AriaTextField, Button } from 'react-aria-components'
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

export const Input = styled(AriaInput)`
	${({ theme }) => css`
		transition: background 300ms ease;
		border: none;
		border-radius: ${theme.borderRadius.circle};
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

export const PasswordToggle = styled(Button)`
	${({ theme }) => css`
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
		border: none;
		background: none;
		cursor: pointer;
		padding: 0;
		width: 24px;
		height: 24px;
		color: ${theme.tokens['color-base-content-secondary']};
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

export const InputWrapper = styled.div`
	position: relative;
	width: 100%;
`

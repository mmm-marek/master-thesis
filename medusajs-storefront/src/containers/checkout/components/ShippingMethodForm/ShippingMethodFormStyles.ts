import { Radio as AriaRadio, RadioGroup as AriaRadioGroup } from 'react-aria-components'
import styled, { css } from 'styled-components'

import { textMdSemibold, textSmRegular } from '@/styles/helpers'

export const RadioGroup = styled(AriaRadioGroup)`
	display: flex;
	flex-direction: column;
	gap: 12px;
`

export const Radio = styled(AriaRadio)`
	${({ theme }) => css`
		display: flex;
		gap: 8px;
		align-items: start;
		border-bottom: 1px solid ${theme.tokens['color-base-action-secondary-default']};
		padding-bottom: 8px;

		&::before {
			display: block;
			transition: all 200ms;
			margin-top: 2px;
			border: 2px solid ${theme.tokens['color-base-surface-secondary']};
			border-radius: 20px;
			background: ${theme.tokens['color-base-surface-quaternary']};
			width: 20px;
			height: 20px;
			content: '';
		}

		&[data-pressed]::before {
			border-color: ${theme.tokens['color-base-action-primary-active']};
		}

		&[data-selected] {
			&::before {
				border-width: 6px;
				border-color: ${theme.tokens['color-base-action-primary-default']};
			}

			&[data-pressed]::before {
				border-color: ${theme.tokens['color-base-action-primary-active']};
			}
		}

		&[data-focus-visible]::before {
			outline: 2px solid ${theme.tokens['color-base-action-primary-hover']};
			outline-offset: 2px;
		}
	`}
`

export const AddressWrapper = styled.div`
	display: flex;
	flex-direction: column;
`

export const AddressName = styled.div`
	${({ theme }) => css`
		color: ${theme.tokens['color-base-content-primary']};
		${textMdSemibold};
	`}
`

export const AddressDescription = styled.div`
	${({ theme }) => css`
		color: ${theme.tokens['color-base-content-secondary']};
		${textSmRegular};
	`}
`

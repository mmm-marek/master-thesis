import { Checkbox as AriaCheckbox } from 'react-aria-components'
import styled, { css } from 'styled-components'

import { textSmRegular } from '@/styles/helpers'

export const SvgWrapper = styled.div`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 200ms;
		border: 1px solid ${theme.tokens['color-base-surface-quaternary']};
		border-radius: 4px;
		width: 18px;
		height: 18px;
	`}
`

export const Checkbox = styled(AriaCheckbox)`
	${({ theme }) => css`
		display: flex;
		gap: 0.571rem;
		align-items: center;
		color: ${theme.tokens['color-base-content-primary']};
		${textSmRegular};

		&[data-pressed] ${SvgWrapper} {
			border-color: ${theme.tokens['color-base-action-secondary-active']};
		}

		&[data-focus-visible] ${SvgWrapper} {
			outline: 2px solid ${theme.tokens['color-base-action-primary-hover']};
			outline-offset: 2px;
		}

		&[data-selected] {
			${SvgWrapper} {
				border-color: ${theme.tokens['color-base-action-primary-active']};
			}

			&[data-pressed] ${SvgWrapper} {
				border-color: ${theme.tokens['color-base-action-primary-hover']};
			}
		}
	`}
`

import { Button as AriaButton } from 'react-aria-components'
import styled, { css } from 'styled-components'

import { ButtonSize, ButtonVariant } from './types'

export const Button = styled(AriaButton)<{ $size: ButtonSize; $variant: ButtonVariant }>`
	${({ theme, $size, $variant }) => css`
		&[data-hovered] {
		}

		&[data-pressed] {
		}

		&[data-focused] {
		}

		&[data-focus-visible] {
		}

		&[data-disabled] {
		}

		&[data-pending] {
		}
	`}
`

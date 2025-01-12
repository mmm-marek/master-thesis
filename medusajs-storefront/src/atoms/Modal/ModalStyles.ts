import { Modal as AriaModal } from 'react-aria-components'
import styled, { css } from 'styled-components'

import { breakpoints } from '@/styles/helpers'

export const Modal = styled(AriaModal)`
	${({ theme }) => css`
		border-radius: 16px;
		background: ${theme.tokens['color-base-surface-primary']};
		padding: 1rem;
		min-width: 300px;

		@media (min-width: ${breakpoints.md}px) {
			min-width: 500px;
		}
	`}
`

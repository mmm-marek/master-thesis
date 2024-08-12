import styled, { css } from 'styled-components'

import { textXxlSemibold } from '@/styles/helpers'

export const Container = styled.div`
	${({ theme }) => css`
		display: grid;
		grid-template-columns: 3fr 1fr;
		gap: ${theme.spacing[16]};
		max-width: 800px;
	`}
`

export const CollapseItemLabel = styled.div<{ $disabled?: boolean }>`
	${({ theme, $disabled }) => css`
		transition: color 0.3s ease;
		color: ${$disabled ? theme.tokens['color-base-content-quaternary'] : theme.tokens['color-base-content-primary']};
		${textXxlSemibold};
	`}
`

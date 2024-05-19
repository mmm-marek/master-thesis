import styled, { css } from 'styled-components'

import { headingSmSemibold } from '@/styles/helpers'

export const Heading = styled.h1`
	${({ theme }) => css`
		${headingSmSemibold};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

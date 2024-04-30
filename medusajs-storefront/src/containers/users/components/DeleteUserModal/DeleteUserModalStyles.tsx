import styled from 'styled-components'

import { textMdBold, textMdMedium } from '@/styles/helpers'

export const Description = styled.p`
	${textMdMedium}
	color: ${({ theme }) => theme.tokens['color-base-content-tertiary']};
`

export const Email = styled.span`
	${textMdBold}
`

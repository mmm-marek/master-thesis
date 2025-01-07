import styled, { css } from 'styled-components'

import { textSmRegular } from '@/styles/helpers'

export const Form = styled.form``

export const CheckboxWrapper = styled.div`
	margin-top: -8px;
	margin-bottom: 16px;
`

export const ShippingText = styled.span`
	${({ theme }) => css`
		${textSmRegular};
		color: ${theme.tokens['color-base-content-tertiary']};
	`};
`

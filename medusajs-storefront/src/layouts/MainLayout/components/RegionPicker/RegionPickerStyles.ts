import styled, { css } from 'styled-components'

import { textXsRegular } from '@/styles/helpers'

export const RegionPickerTrigger = styled.div`
	${({ theme }) => css`
		text-decoration: underline;
		${textXsRegular};
		color: ${theme.tokens['color-inverse-content-primary']};

		&:hover {
			color: ${theme.tokens['color-inverse-content-secondary']};
		}
	`};
`

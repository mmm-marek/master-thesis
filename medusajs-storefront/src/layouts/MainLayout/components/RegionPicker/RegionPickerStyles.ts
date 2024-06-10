import styled, { css } from 'styled-components'

import { textXsRegular } from '@/styles/helpers'

export const RegionPickerTrigger = styled.div`
	${({ theme }) => css`
		text-decoration: underline;
		color: ${theme.tokens['color-inverse-content-primary']};
		${textXsRegular};

		&:hover {
			color: ${theme.tokens['color-inverse-content-secondary']};
		}
	`};
`

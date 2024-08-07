import styled, { css } from 'styled-components'

import { headingXsSemibold, textSmMedium } from '@/styles/helpers'

export const FormWrapper = styled.form`
	${({ theme }) => css`
		display: flex;
		flex-direction: column;
		width: 100%;

		& .ant-rate {
			color: ${theme.tokens['color-base-action-primary-default']};
		}
	`}
`

export const Title = styled.h3`
	${({ theme }) => css`
		margin-bottom: 8px;
		color: ${theme.tokens['color-base-content-primary']};
		${headingXsSemibold}
	`}
`

export const ButtonsWrapper = styled.div`
	display: flex;
	gap: 8px;
	margin-left: auto;
`

export const RatingWrapper = styled.div`
	${({ theme }) => css`
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-bottom: 16px;
		${textSmMedium};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

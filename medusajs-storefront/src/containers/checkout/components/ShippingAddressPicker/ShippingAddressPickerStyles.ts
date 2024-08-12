import styled, { css } from 'styled-components'

import { textMdRegular, textSmRegular } from '@/styles/helpers'

export const ContentWrapper = styled.span`
	display: flex;
	flex-direction: column;
`

export const CardsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
`

export const AddressWrapper = styled.span`
	display: flex;
	flex-direction: column;
`

export const AddressName = styled.span`
	${({ theme }) => css`
		${textMdRegular};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const Address = styled.span`
	${({ theme }) => css`
		${textSmRegular};
		color: ${theme.tokens['color-base-content-secondary']};
	`}
`

export const OptionLabel = styled.label`
	${({ theme }) => css`
		border: 1px solid ${theme.tokens['color-base-surface-quaternary']};
		border-radius: 16px;
		padding: 16px;
		height: 130px;

		& .ant-radio {
			align-self: start !important;
			margin-top: 4px;
		}
	`}
`

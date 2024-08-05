import styled, { css } from 'styled-components'

import { headingXsSemibold, textLgRegular, textMdRegular, textSmRegular, textXxlSemibold } from '@/styles/helpers'

export const Title = styled.h2`
	${({ theme }) => css`
		margin-bottom: 8px;
		color: ${theme.tokens['color-base-content-primary']};
		${headingXsSemibold};
	`}
`

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

export const OrderWrapper = styled.div`
	${({ theme }) => css`
		display: flex;
		flex-direction: column;
		gap: 8px;
		border-bottom: 1px solid ${theme.tokens['color-base-surface-quaternary']};
		padding-bottom: 16px;
	`}
`

export const OrderTitle = styled.h3`
	${({ theme }) => css`
		display: flex;
		gap: 8px;
		align-items: center;
		color: ${theme.tokens['color-base-content-primary']};
		${textLgRegular};
	`}
`

export const OrderId = styled.span`
	${({ theme }) => css`
		color: ${theme.tokens['color-base-content-quaternary']};
	`}
`

export const Price = styled.p`
	${({ theme }) => css`
		color: ${theme.tokens['color-base-content-primary']};
		${textXxlSemibold};
	`}
`

export const ProductTitle = styled.p`
	${({ theme }) => css`
		display: flex;
		gap: 8px;
		align-items: center;
		color: ${theme.tokens['color-base-content-tertiary']};
		${textMdRegular};
	`}
`

export const Quantity = styled.span`
	${({ theme }) => css`
		${textSmRegular};
		color: ${theme.tokens['color-base-content-quaternary']};
	`}
`

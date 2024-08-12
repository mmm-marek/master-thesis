import styled, { css } from 'styled-components'

import { textMdRegular, textSmRegular, textXxlSemibold } from '@/styles/helpers'

export const Title = styled.h2`
	${({ theme }) => css`
		padding-top: 12px;
		${textXxlSemibold};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 100%;
`

export const Divider = styled.div`
	${({ theme }) => css`
		border-bottom: 1px solid ${theme.tokens['color-base-surface-quaternary']};
	`}
`

export const LineItemHeader = styled.div`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		${textMdRegular};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const Quantity = styled.div`
	${({ theme }) => css`
		color: ${theme.tokens['color-base-content-secondary']};
	`}
`

export const Variant = styled.div`
	${({ theme }) => css`
		${textSmRegular};
		color: ${theme.tokens['color-base-content-secondary']};
	`}
`

export const CartItemsList = styled.ul`
	margin: 0;
	padding: 0;
	list-style-type: none;
`

export const SummaryName = styled.p`
	${({ theme }) => css`
		${textMdRegular};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const SummaryInfo = styled.p`
	${({ theme }) => css`
		${textSmRegular};
		color: ${theme.tokens['color-base-content-secondary']};
	`}
`

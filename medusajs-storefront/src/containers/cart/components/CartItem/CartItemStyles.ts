import styled, { css } from 'styled-components'

import { textLgBold, textMdMedium, textMdSemibold } from '@/styles/helpers'

export const Wrapper = styled.div`
	${({ theme }) => css`
		display: flex;
		gap: 16px;
		border-bottom: 1px solid ${theme.tokens['color-base-surface-tertiary']};
	`}
`

export const ImageWrapper = styled.div`
	position: relative;
	width: 164px;
	height: 164px;
`

export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

export const Title = styled.p`
	${({ theme }) => css`
		${textLgBold};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const Variant = styled.p`
	${({ theme }) => css`
		color: ${theme.tokens['color-base-content-quaternary']};
		${textMdMedium};
	`}
`

export const QuantityLabel = styled.p`
	${({ theme }) => css`
		color: ${theme.tokens['color-base-content-tertiary']};
		${textMdMedium};
	`}
`

export const QuantityControls = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
`

export const Quantity = styled.p`
	${({ theme }) => css`
		color: ${theme.tokens['color-base-content-tertiary']};
		${textMdSemibold};
	`}
`

export const QuantityWrapper = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
	margin-bottom: 16px;
`

export const ContentWrapper = styled.div`
	flex: 1;
`

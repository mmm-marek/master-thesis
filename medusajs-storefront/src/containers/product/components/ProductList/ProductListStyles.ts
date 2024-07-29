import styled, { css } from 'styled-components'

import { textMdSemibold, textSmMedium } from '@/styles/helpers'

export const ProductsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 16px;
`

export const Product = styled.article`
	${({ theme }) => css`
		border-radius: 16px;
		background: ${theme.tokens['color-base-surface-tertiary']};
		overflow: hidden;
	`}
`

export const ImageWrapper = styled.div`
	width: 100%;
	height: 300px;

	& img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
`

export const ProductTextContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 16px;
`

export const ProductDescription = styled.p`
	${({ theme }) => css`
		${textSmMedium};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const ProductTitle = styled.h2`
	${({ theme }) => css`
		${textMdSemibold};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

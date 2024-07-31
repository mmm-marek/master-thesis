import styled, { css } from 'styled-components'

import { textMdMedium } from '@/styles/helpers'

export const Product = styled.article`
	${({ theme }) => css`
		position: relative;
		border-radius: 16px;
		background: ${theme.tokens['color-base-surface-primary']};
		cursor: pointer;
		overflow: hidden;
	`}
`

export const ImageWrapper = styled.div`
	background-color: white;
	width: 100%;
	height: 300px;

	& img {
		object-fit: contain;
		width: 100%;
		height: 100%;
	}
`

export const ProductTitle = styled.h2`
	${({ theme }) => css`
		position: absolute;
		bottom: 12px;
		left: 12px;
		z-index: 100;
		border: 1px solid ${theme.tokens['color-base-surface-tertiary']};
		border-radius: 16px;
		background: ${theme.tokens['color-base-surface-primary']};
		padding: 4px 8px;
		width: fit-content;
		color: ${theme.tokens['color-base-content-primary']};
		${textMdMedium};
	`}
`

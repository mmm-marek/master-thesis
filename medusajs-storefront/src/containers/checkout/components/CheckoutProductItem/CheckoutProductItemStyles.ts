import styled, { css } from 'styled-components'

import { skeletonBase } from '@/styles/GlobalStyles'
import { textMdRegular, textSmRegular } from '@/styles/helpers'

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

export const ProductTitleSkeleton = styled.div`
	width: 70%;
	height: 20px;
	${skeletonBase}
`

export const QuantitySkeleton = styled.div`
	width: 24px;
	height: 20px;
	${skeletonBase}
`

export const VariantSkeleton = styled.div`
	margin-top: 4px;
	width: 50%;
	height: 16px;
	${skeletonBase}
`

import Image from 'next/image'
import styled, { css } from 'styled-components'

import { skeletonBase } from '@/styles/GlobalStyles'
import { textLgBold, textMdMedium, textMdSemibold, textXxlSemibold } from '@/styles/helpers'

export const Wrapper = styled.div`
	${({ theme }) => css`
		display: flex;
		gap: 16px;
		border-bottom: 1px solid ${theme.tokens['color-base-surface-tertiary']};
		padding-bottom: 8px;
	`}
`

export const Thumbnail = styled(Image)`
	width: 164px;
	height: auto;
`

export const Header = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
	justify-content: space-between;
`

export const Title = styled.p`
	${({ theme }) => css`
		${textLgBold};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const Price = styled.p`
	${({ theme }) => css`
		${textXxlSemibold};
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

export const ThumbnailSkeleton = styled.div`
	width: 164px;
	height: 164px;
	${skeletonBase}
`

export const TitleSkeleton = styled.div`
	width: 60%;
	height: 24px;
	${skeletonBase}
`

export const PriceSkeleton = styled.div`
	width: 70px;
	height: 28px;
	${skeletonBase}
`

export const VariantSkeleton = styled.div`
	margin: 8px 0;
	width: 40%;
	height: 20px;
	${skeletonBase}
`

export const QuantityWrapperSkeleton = styled.div`
	margin-bottom: 16px;
	width: 120px;
	height: 32px;
	${skeletonBase}
`

export const ButtonSkeleton = styled.div`
	width: 32px;
	height: 32px;
	${skeletonBase}
`

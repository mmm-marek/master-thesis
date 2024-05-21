import styled, { css } from 'styled-components'

import { headingSmSemibold, headingXsSemibold, textSmRegular } from '@/styles/helpers'

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: 24px;
`

export const ImageWrapper = styled.div`
	height: 500px;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`

export const CarouselWrapper = styled.div`
	width: 500px;
	max-width: 500px;
`

export const VariantGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
	gap: 16px;
`

export const VariantButton = styled.button<{ $selected: boolean }>`
	${({ theme, $selected }) => css`
		transition:
			background 0.2s,
			color 0.2s;
		border: 1px solid ${theme.tokens['color-base-action-primary-default']};
		border-radius: ${theme.borderRadius[4]};
		background: none;
		cursor: pointer;
		padding: 8px 24px;
		width: 100%;
		${textSmRegular};

		&:hover {
			background: ${theme.tokens['color-base-action-primary-hover']};
			color: ${theme.tokens['color-inverse-content-primary']};
		}

		${$selected &&
		css`
			background: ${theme.tokens['color-base-action-primary-default']};
			color: ${theme.tokens['color-inverse-content-primary']};
		`}
	`}
`

export const Price = styled.p`
	${({ theme }) => css`
		color: ${theme.tokens['color-base-content-primary']};
		${headingXsSemibold};
	`}
`

export const Description = styled.p`
	${({ theme }) => css`
		${textSmRegular};
		color: ${theme.tokens['color-base-content-secondary']};
	`}
`

export const Title = styled.h1`
	${({ theme }) => css`
		${headingSmSemibold};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

export const PriceWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`

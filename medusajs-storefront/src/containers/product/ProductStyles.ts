import styled, { css } from 'styled-components'

import { textSmRegular } from '@/styles/helpers'

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
	gap: 16px;
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

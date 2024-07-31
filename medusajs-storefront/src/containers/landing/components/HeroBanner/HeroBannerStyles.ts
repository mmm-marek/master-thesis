import Image from 'next/image'
import styled, { css } from 'styled-components'

import { breakpoints, headingXxlBold, textMdMedium, textXxlSemibold } from '@/styles/helpers'

export const Container = styled.div`
	${({ theme }) => css`
		position: relative;
		border-radius: 24px;
		width: 100%;
		height: 260px;
		overflow: hidden;

		&::after {
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0.8;
			z-index: 1;
			background: ${theme.tokens['color-base-surface-primary']};
			width: 100%;
			height: 100%;
			content: '';
		}

		@media (min-width: ${breakpoints.lg}px) {
			height: 400px;

			&::after {
				background: linear-gradient(90deg, ${theme.tokens['color-base-surface-primary']} 20%, rgb(0 0 0 / 0%) 100%);
			}
		}
	`}
`

export const ImageStyled = styled(Image)`
	position: absolute;
	border-radius: 24px;
	min-height: 260px;
	object-fit: cover;

	@media (min-width: ${breakpoints.lg}px) {
		bottom: -90px;
	}
`

export const Title = styled.h1`
	${({ theme }) => css`
		${textXxlSemibold}
		color: ${theme.tokens['color-base-content-primary']};

		@media (min-width: ${breakpoints.lg}px) {
			${headingXxlBold};
		}
	`}
`

export const Description = styled.p`
	${({ theme }) => css`
		${textMdMedium};
		max-width: 450px;
		color: ${theme.tokens['color-base-content-secondary']};
	`}
`

export const TextWrapper = styled.div`
	display: flex;
	position: absolute;
	flex-direction: column;
	gap: 8px;
	justify-content: end;
	z-index: 200;
	padding: 24px;
	height: 100%;

	@media (min-width: ${breakpoints.lg}px) {
		max-width: 70%;
	}
`

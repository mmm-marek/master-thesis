import Image from 'next/image'
import styled, { css } from 'styled-components'

import { headingXxlBold, textMdMedium } from '@/styles/helpers'

export const Container = styled.div`
	position: relative;
	border-radius: 24px;
	width: 100%;
	height: 400px;
	overflow: hidden;

	&::after {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.9;
		z-index: 1;
		background: linear-gradient(to right, rgb(255 255 255 / 100%), rgb(0 0 0 / 0%));
		width: 100%;
		height: 100%;
		content: '';
	}
`

export const ImageStyled = styled(Image)`
	position: absolute;
	bottom: -90px;
	border-radius: 24px;
	object-fit: cover;
	object-position: 50% 80%;
`

export const Title = styled.h1`
	${({ theme }) => css`
		color: ${theme.tokens['color-base-content-primary']};
		${headingXxlBold};
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
	z-index: 200;
	padding: 24px;
	max-width: 60%;
`

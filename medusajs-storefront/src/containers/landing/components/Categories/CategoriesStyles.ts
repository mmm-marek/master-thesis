import Image from 'next/image'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import { breakpoints, textMdMedium, textSmMedium } from '@/styles/helpers'

export const Container = styled.div`
	display: grid;
	grid-gap: 16px;

	@media (min-width: ${breakpoints.md}px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: ${breakpoints.lg}px) {
		grid-template-rows: 1fr 1fr;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
`

export const IllustrationImage = styled(Image)`
	display: none;

	@media (min-width: ${breakpoints.lg}px) {
		display: block;
		grid-row: span 2;
		grid-column: span 2;
		border-radius: 16px;
	}
`

export const CategoryCard = styled.div`
	${({ theme }) => css`
		display: flex;
		position: relative;
		flex-direction: column;
		justify-content: end;
		border-radius: 16px;
		background: ${theme.tokens['color-base-surface-tertiary']};
		padding: 16px;
		height: 188px;
		overflow: hidden;
	`}

	@media (min-width: ${breakpoints.lg}px) {
		&:nth-of-type(1) {
			grid-column: span 2;
		}
	}
`

export const CategoryLink = styled(Link)`
	${({ theme }) => css`
		position: relative;
		z-index: 1;
		text-transform: capitalize;
		text-decoration: none;
		color: ${theme.tokens['color-base-content-primary']};
		${textMdMedium};
	`}
`

export const Description = styled.p`
	${({ theme }) => css`
		position: relative;
		z-index: 1;
		${textSmMedium};
		color: ${theme.tokens['color-base-content-tertiary']};
	`}
`

export const IconWrapper = styled.div`
	position: absolute;
	top: -16px;
	right: -32px;
	rotate: -25deg;
`

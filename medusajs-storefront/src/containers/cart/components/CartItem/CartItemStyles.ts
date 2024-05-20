import styled, { css } from 'styled-components'

import { textLgSemibold } from '@/styles/helpers'

export const Wrapper = styled.div`
	${({ theme }) => css`
		display: flex;
		gap: 16px;
		border-bottom: 1px solid ${theme.tokens['color-base-surface-tertiary']};
		padding-bottom: 24px;
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
		${textLgSemibold};
		color: ${theme.tokens['color-base-text-primary']};
	`}
`

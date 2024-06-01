import styled, { css } from 'styled-components'

import { headingSmSemibold, textMdRegular, textSmMedium } from '@/styles/helpers'

export const RegisterCTAWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 32px;
	align-items: end;
	justify-content: start;
`

export const HeaderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	width: 100%;
`

export const RegisterCTAHeader = styled.h2`
	${({ theme }) => css`
		color: ${theme.tokens['color-base-content-primary']};
		${headingSmSemibold};
	`}
`

export const RegisterCTAParagraph = styled.p`
	${({ theme }) => css`
		${textMdRegular};
		color: ${theme.tokens['color-base-content-tertiary']};
	`}
`

export const RegisterList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin: 0;
	padding: 0;
	width: 100%;
	list-style: none;
`

export const RegisterListItem = styled.li`
	${({ theme }) => css`
		display: flex;
		gap: 8px;
		align-items: center;
		color: ${theme.tokens['color-base-content-secondary']};
		${textSmMedium};
	`}
`

export const Bullet = styled.span`
	display: inline-block;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.tokens['color-base-action-primary-default']};
	width: 8px;
	height: 8px;
`

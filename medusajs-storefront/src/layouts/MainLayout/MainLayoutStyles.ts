import Link from 'next/link'
import styled, { css } from 'styled-components'

import Button from '@/atoms/Button/Button'
import { breakpoints, textXsRegular } from '@/styles/helpers'

export const ActionsWrapper = styled.div`
	${({ theme }) => css`
		background: ${theme.tokens['color-base-content-top']};
		width: 100%;
	`};
`

export const Actions = styled.div`
	display: flex;
	gap: 12px;
	align-items: center;
	justify-content: end;
	padding: 8px 16px;
`

export const ActionLink = styled(Link)`
	${({ theme }) => css`
		${textXsRegular};
		color: ${theme.tokens['color-inverse-content-primary']};

		&:hover {
			color: ${theme.tokens['color-inverse-content-secondary']};
		}
	`};
`

export const ActionButton = styled.button`
	${({ theme }) => css`
		border: none;
		background: none;
		cursor: pointer;
		color: ${theme.tokens['color-inverse-content-primary']};
		${textXsRegular};

		&:hover {
			color: ${theme.tokens['color-inverse-content-secondary']};
		}
	`};
`

export const ActionDivider = styled.div`
	background: ${({ theme }) => theme.tokens['color-inverse-content-quaternary']};
	width: 1px;
	height: 18px;
`

export const CappedContainer = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 1180px;
`

export const Header = styled.header`
	${({ theme }) => css`
		border-bottom: 1px solid ${theme.tokens['color-base-surface-tertiary']};
		background: ${theme.tokens['color-base-surface-primary']};
	`};
`

export const Content = styled.main<{ $verticalPadding?: boolean }>`
	${({ theme, $verticalPadding }) => css`
		background: ${theme.tokens['color-base-surface-primary']};
		padding-block: ${$verticalPadding ? '16px' : '0'};
		padding-inline: 16px;

		@media (min-width: ${breakpoints.lg}px) {
			padding-block: ${$verticalPadding ? '24px' : '0'};
		}
	`};
`

export const Footer = styled.footer`
	${({ theme }) => css`
		flex: 1;
		border-top: 1px solid ${theme.tokens['color-base-surface-tertiary']};
		background: ${theme.tokens['color-base-content-top']};
	`};
`

export const HeaderContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 4px 16px 0;
	height: 64px;
`

export const LinksWrapper = styled.div`
	display: flex;
	gap: 16px;
	align-items: center;
	justify-content: end;
	width: 180px;
`

export const LogoLink = styled(Link)`
	${({ theme }) => css`
		svg {
			color: ${theme.tokens['color-base-content-top']};
		}
	`};
`

export const Layout = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100dvh;
`

export const SignInButton = styled(Button)`
	margin-bottom: 6px;
`

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
	padding-block: 8px;
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

export const Content = styled.main<{ $hasBreadcrumbs?: boolean }>`
	${({ theme, $hasBreadcrumbs }) => css`
		background: ${theme.tokens['color-base-surface-primary']};
		padding-top: ${$hasBreadcrumbs ? '0' : '16px'};
		padding-bottom: 16px;
		padding-inline: 16px;

		@media (min-width: ${breakpoints.lg}px) {
			padding-top: ${$hasBreadcrumbs ? '0' : '24px'};
			padding-bottom: 24px;
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
	padding: 4px 0 0;
	height: 64px;
`

export const Spacer = styled.div`
	padding-inline: 16px;
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

export const CartWrapper = styled.div`
	position: relative;
`

export const CartBadge = styled.span`
	${({ theme }) => css`
		display: flex;
		position: absolute;
		top: -8px;
		right: -8px;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: ${theme.tokens['color-base-action-destructive-default']};
		min-width: 16px;
		color: white;
		${textXsRegular};
	`};
`

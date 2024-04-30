import styled, { css } from 'styled-components'

import Button from '@/atoms/Button/Button'
import { multipleLineTruncate, textMdSemibold } from '@/styles/helpers'

export const NavbarWrapper = styled.nav`
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 0;
	background-color: ${({ theme }) => theme.tokens['color-base-surface-primary']};
	padding: ${({ theme }) => `${theme.spacing[32]} 0 ${theme.spacing[16]} 0`};
	width: 100%;
	max-width: 260px;
	height: 100%;
`

export const LogotypeContainer = styled.div<{ $display: 'block' | 'none' }>`
	display: ${({ $display }) => $display};
	width: 144px;
	height: 15px;

	svg {
		color: ${({ theme }) => theme.tokens['color-base-content-top']};
	}
`

export const LogoImageContainer = styled.div`
	width: 42px;
	height: 42px;
`

export const LogoWrapper = styled.div`
	display: flex;
	gap: ${({ theme }) => theme.spacing[12]};
	align-items: center;
	justify-content: center;
	margin-bottom: ${({ theme }) => theme.spacing[48]};
	padding: ${({ theme }) => theme.spacing[8]} 0;
`

export const ProfileWrapper = styled.div<{ $collapsed: boolean }>`
	display: flex;
	flex-direction: ${({ $collapsed }) => ($collapsed ? 'column' : 'row')};
	gap: ${({ $collapsed, theme }) => ($collapsed ? theme.spacing[8] : theme.spacing[12])};
	align-items: center;
	padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[16]};
`

export const ContentWrapper = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
`

export const MenuWrapper = styled.div<{ $collapsed?: boolean }>`
	flex: 1;
	padding: ${({ theme, $collapsed }) => `${theme.spacing[4]} ${$collapsed ? theme.spacing[8] : theme.spacing[16]}`};
	max-height: calc(100vh - 250px);
	overflow-y: auto;
`

export const LogoutButton = styled(Button)`
	&.ant-btn {
		flex-shrink: 0;
		margin-left: auto;

		svg {
			width: 24px;
			height: 24px;
			color: ${({ theme }) => theme.tokens['color-base-content-tertiary']};
		}
	}
`

export const ProfileButton = styled(Button)<{ $collapsed: boolean }>`
	&.ant-btn.ant-btn-default {
		display: flex;
		gap: ${({ theme }) => theme.spacing[12]};
		justify-content: flex-start;
		padding-inline-start: ${({ theme }) => theme.spacing[8]};
		max-width: 180px;
		height: fit-content;
		min-height: 48px;
		${textMdSemibold}

		span:last-of-type {
			${multipleLineTruncate(2)}
		}

		${({ $collapsed }) =>
			$collapsed &&
			css`
				padding: 0;

				& span:last-of-type {
					display: none;
				}
			`}
	}
`

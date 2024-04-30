import { Layout as AntdLayout } from 'antd'
import styled, { css } from 'styled-components'

import Logo from '@/assets/icons/logo.svg'
import Button from '@/atoms/Button/Button'
import { breakpoints, multipleLineTruncate, textSmSemibold, transition } from '@/styles/helpers'

const { Header: AntdHeader } = AntdLayout

export const MenuContainer = styled.div`
	margin-top: ${({ theme }) => theme.spacing[16]};
`

export const ProfileWrapper = styled.div`
	display: flex;
	gap: ${({ theme }) => theme.spacing[12]};
	align-items: center;
	margin-top: ${({ theme }) => theme.spacing[4]};
	border-top: ${({ theme }) => `${theme.borderWidth.xs} solid ${theme.tokens['color-base-content-quintarny']}`};
	padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[16]};
`

export const ProfileButton = styled(Button)`
	&.ant-btn.ant-btn-default {
		display: flex;
		gap: ${({ theme }) => theme.spacing[12]};
		justify-content: flex-start;
		padding: 0 ${({ theme }) => theme.spacing[12]} 0 ${({ theme }) => theme.spacing[8]};
		max-width: calc(100% - 40px);
		height: fit-content;
		min-height: 48px;
		white-space: normal;
		${textSmSemibold};

		span:last-of-type {
			${multipleLineTruncate(2)}
		}
	}
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

export const Header = styled(AntdHeader)<{ $isVisible: boolean; $collapsed: boolean }>`
	${({ theme, $collapsed, $isVisible }) => css`
		&.ant-layout-header {
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			transform: translateY(${$isVisible ? '0' : '-120%'});
			z-index: 9999;
			border-bottom: ${theme.borderWidth.xs} solid ${theme.tokens['color-base-content-quintarny']};
			background: ${theme.tokens['color-base-surface-primary']};
			padding: 0;
			height: fit-content;

			${transition};

			${() => {
				if ($isVisible && !$collapsed) {
					return css`
						box-shadow: 0 0 0 9999px ${theme.tokens['color-additional-black']}70;
					`
				}
				return ''
			}};
		}

		@media (min-width: ${breakpoints.md}px) {
			&.ant-layout-header {
				display: none;
			}
		}
	`}
`

export const TriggerContainer = styled.div<{ $collapsed: boolean }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[16]} 0;
	padding-bottom: ${({ $collapsed, theme }) => ($collapsed ? theme.spacing[16] : '0')};
`

export const LogoContainer = styled.div`
	display: flex;
	gap: ${({ theme }) => theme.spacing[12]};
	align-items: center;

	& svg {
		width: 144px;
		height: 15px;
	}
`

export const ImageContainer = styled.div`
	width: 32px;
	height: 32px;
`

export const TriggerButton = styled(Button)`
	&.ant-btn {
		& svg {
			color: ${({ theme }) => theme.tokens['color-base-content-tertiary']};
		}
	}
`

export const Logotype = styled(Logo)`
	color: ${({ theme }) => theme.tokens['color-base-content-top']};
`

export const MenuWrapper = styled.div<{ $collapsed?: boolean }>`
	padding: ${({ theme }) => `${theme.spacing[16]} ${theme.spacing[16]}`};
`

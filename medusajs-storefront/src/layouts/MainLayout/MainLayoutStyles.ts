import { Layout as AntdLayout } from 'antd'
import styled, { css } from 'styled-components'

import Chevron from '@/assets/icons/chevron.svg'
import { breakpoints, transition } from '@/styles/helpers'

const { Content: AntdContent, Sider: AntdSider } = AntdLayout

export const Layout = styled(AntdLayout)`
	background-color: ${({ theme }) => theme.tokens['color-base-surface-secondary']};
	min-height: 100vh;
`

export const Sider = styled(AntdSider)`
	&.ant-layout-sider {
		display: none;
	}

	@media (min-width: ${breakpoints.md}px) {
		${({ theme }) => css`
			&.ant-layout-sider {
				display: block;
				position: fixed;
				top: 0;
				bottom: 0;
				left: 0;
				border-right: ${theme.borderWidth.xs} solid ${theme.tokens['color-base-content-quintarny']};
				background-color: ${theme.tokens['color-base-surface-primary']};
			}

			&.ant-layout-sider.ant-layout-sider-collapsed {
				.ant-menu-title-content {
					display: none;
				}

				.ant-menu-inline-collapsed > .ant-menu-item {
					display: flex;
					justify-content: center;
					padding: 0;
				}

				.ant-menu .ant-menu-item-selected::before {
					left: 0;
				}
			}
		`}
	}
`

export const Content = styled(AntdContent)<{ $collapsed: boolean }>`
	&.ant-layout-content {
		margin-top: 65px; /* mobile menu height */
		padding: ${({ theme }) => theme.spacing[16]};
		${transition};
	}

	@media (min-width: ${breakpoints.md}px) {
		&.ant-layout-content {
			margin-top: 0;
			margin-left: ${({ $collapsed }) => ($collapsed ? '80px' : '260px')};
			padding: ${({ theme }) => theme.spacing[32]};
		}
	}
`

export const CollapseButtonWrapper = styled.div`
	position: absolute;
	top: 100px;
	right: 0;
	transform: translateX(50%);
`

export const ChevronIcon = styled(Chevron)<{ $collapsed: boolean }>`
	transform-origin: center;
	transition: 200ms ease-in-out;
	color: ${({ theme }) => theme.tokens['color-base-content-tertiary']};

	${({ $collapsed }) => css`
		transform: ${$collapsed ? 'rotate(180deg)' : 'rotate(0)'};
	`}
`

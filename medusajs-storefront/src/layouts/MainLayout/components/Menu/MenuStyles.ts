import { Menu as AntdMenu } from 'antd'
import styled, { css } from 'styled-components'

import { textMdSemibold, truncate } from '@/styles/helpers'

export const Menu = styled(AntdMenu)`
	${({ theme }) => css`
		background-color: ${theme.tokens['color-base-surface-primary']};

		&.ant-menu-root {
			&:focus-visible {
				outline: none;
				box-shadow: ${theme.tokens['ring-primary-xs']};
			}
		}

		&.ant-menu {
			color: ${theme.tokens['color-base-content-tertiary']};

			&.ant-menu-root.ant-menu-vertical {
				border: 0;
			}

			.ant-menu-item {
				display: flex;
				position: relative;
				align-items: center;
				margin: 0;
				border-radius: 0;
				padding-inline: ${theme.spacing[12]};
				width: 100%;
				height: 48px;
				color: ${theme.tokens['color-base-content-tertiary']};

				&:not(:last-of-type) {
					margin-bottom: ${theme.spacing[8]};
				}

				&:focus-visible {
					outline: none;
					box-shadow: ${theme.tokens['ring-primary-xs']};
				}

				svg {
					flex-shrink: 0;
					width: 24px;
					height: 24px;
				}

				.ant-menu-item-icon + span {
					margin-inline-start: ${theme.spacing[12]};
				}

				&.ant-menu-item-active:hover,
				&.ant-menu-item:not(.ant-menu-item-selected):active {
					background-color: ${theme.tokens['color-base-action-primary-bg10']};
					color: ${theme.tokens['color-base-content-primary']};
				}
			}

			.ant-menu-item-selected {
				background-color: ${theme.tokens['color-base-action-primary-bg10']};
				color: ${theme.tokens['color-base-content-primary']};

				&:focus-visible {
					outline: none;
					box-shadow: ${theme.tokens['ring-primary-xs']};
				}

				svg {
					display: block;
					position: relative;
				}

				&.ant-menu-item-active:hover,
				&:hover,
				&:active {
					background-color: ${theme.tokens['color-base-action-primary-bg']};
					color: ${theme.tokens['color-base-content-primary']};
				}
			}

			.ant-menu-title-content {
				${truncate}
				${textMdSemibold}
			}
		}
	`};
`

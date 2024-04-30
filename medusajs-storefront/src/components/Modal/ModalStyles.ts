import { Modal as AntdModal } from 'antd'
import styled, { css } from 'styled-components'

import Button from '@/atoms/Button/Button'
import { breakpoints, headingXsSemibold, textMdRegular } from '@/styles/helpers'

export const TitleWrapper = styled.div`
	flex: 1;
`

export const ModalTitle = styled.h2`
	${headingXsSemibold};
	color: ${({ theme }) => theme.tokens['color-base-content-primary']};
`

export const ModalDescription = styled.p`
	${textMdRegular};
	color: ${({ theme }) => theme.tokens['color-base-content-tertiary']};
`

export const CloseButton = styled(Button)<{ $absolute?: boolean }>`
	&.ant-btn.ant-btn-default {
		${({ $absolute }) =>
			$absolute
				? css`
						position: absolute;
						top: 16px;
						right: 16px;
					`
				: css`
						flex-shrink: 0;
					`}
	}
`

export const HeaderContainer = styled.header`
	display: flex;
	justify-content: space-between;
	border-bottom: ${({ theme }) => `${theme.borderWidth.xs} solid ${theme.tokens['color-base-content-quintarny']}`};
	border-top-left-radius: ${({ theme }) => theme.borderRadius[16]};
	border-top-right-radius: ${({ theme }) => theme.borderRadius[16]};
	background: ${({ theme }) => theme.tokens['color-base-surface-primary']};
	padding: ${({ theme }) => theme.spacing[16]};

	@media (min-width: ${breakpoints.md}px) {
		gap: ${({ theme }) => theme.spacing[16]};
		padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[24]};
	}
`
export const FooterContainer = styled.footer`
	display: flex;
	position: sticky;
	bottom: 0;
	gap: ${({ theme }) => theme.spacing[8]};
	justify-content: center;
	border-top: ${({ theme }) => `${theme.borderWidth.xs} solid ${theme.tokens['color-base-content-quintarny']}`};
	border-bottom-left-radius: ${({ theme }) => theme.borderRadius[16]};
	border-bottom-right-radius: ${({ theme }) => theme.borderRadius[16]};
	background: ${({ theme }) => theme.tokens['color-base-surface-primary']};
	padding: ${({ theme }) => theme.spacing[16]};

	@media (min-width: ${breakpoints.md}px) {
		gap: ${({ theme }) => theme.spacing[16]};
		padding: ${({ theme }) => theme.spacing[24]};
	}
`

export const ContentContainer = styled.main<{ $hasFooter?: boolean; $hasHeader?: boolean }>`
	padding: ${({ theme }) => theme.spacing[16]};

	@media (min-width: ${breakpoints.md}px) {
		padding-right: ${({ theme }) => theme.spacing[24]};
		padding-left: ${({ theme }) => theme.spacing[24]};

		${({ $hasFooter, $hasHeader, theme }) => {
			return css`
				padding-top: ${theme.spacing[$hasHeader ? 24 : 16]};
				padding-bottom: ${theme.spacing[$hasFooter ? 24 : 16]};
			`
		}}
	}
`

export const Modal = styled(AntdModal)`
	${({ theme }) => css`
		&.ant-modal {
			.ant-modal-content {
				margin-top: ${theme.spacing[16]};
				margin-bottom: ${theme.spacing[16]};
				border: ${theme.borderWidth.xs} solid ${theme.tokens['color-base-content-quintarny']};
				border-radius: ${theme.borderRadius[16]};
				box-shadow: none;
				background: ${theme.tokens['color-base-surface-primary']};
				padding: 0;
			}

			.ant-spin-nested-loading {
				.ant-spin-container {
					&::after {
						border-radius: ${theme.borderRadius[16]};
					}
				}
			}
		}
	`}
`

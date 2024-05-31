import { Layout } from 'antd'
import Link from 'next/link'
import styled, { css } from 'styled-components'

const { Header: AntdHeader, Footer: AntdFooter, Content: AntdContent } = Layout

export const CappedContainer = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 1180px;
`

export const Header = styled(AntdHeader)`
	${({ theme }) => css`
		border-bottom: 1px solid ${theme.tokens['color-base-surface-tertiary']};
		background: ${theme.tokens['color-base-surface-primary']};
	`};
`

export const Content = styled(AntdContent)`
	${({ theme }) => css`
		background: ${theme.tokens['color-base-surface-primary']};
		padding: 24px 50px;
	`};
`

export const Footer = styled(AntdFooter)`
	${({ theme }) => css`
		border-top: 1px solid ${theme.tokens['color-base-surface-tertiary']};
		background: ${theme.tokens['color-base-surface-primary']};
	`};
`

export const HeaderContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 4px;
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

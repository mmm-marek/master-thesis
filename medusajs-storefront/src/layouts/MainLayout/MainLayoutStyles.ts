import { Layout } from 'antd'
import styled, { css } from 'styled-components'

const { Header: AntdHeader, Footer: AntdFooter, Content: AntdContent } = Layout

export const CappedContainer = styled.div`
	margin: 0 auto;
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
	`};
`

export const Footer = styled(AntdFooter)`
	${({ theme }) => css`
		border-top: 1px solid ${theme.tokens['color-base-surface-tertiary']};
		background: ${theme.tokens['color-base-surface-primary']};
	`};
`

import styled from 'styled-components'

import { breakpoints, textSmRegular } from '@/styles/helpers'

export const LoginLayoutWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	min-height: 100vh;
	overflow: auto;
`

export const LoginLayoutPage = styled.div`
	padding: ${({ theme }) => theme.spacing[16]};
	padding-bottom: 0;
	width: 100%;

	@media (min-width: ${breakpoints.md}px) {
		padding: ${({ theme }) => theme.spacing[32]};
		padding-bottom: 0;
		width: 50%;
	}
`

export const LoginLayoutPageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	min-height: 100%;
`

export const LoginLayoutPageContent = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
	width: 100%;
	max-width: 1360px;
`

export const LoginFooter = styled.footer`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 16px 0;
	width: 100%;
	height: 80px;

	@media (min-width: ${breakpoints.md}px) {
		display: flex;
		flex-direction: row;
		padding: 32px 0;
		height: 96px;
	}
`

export const LoginCopy = styled.span`
	${textSmRegular};
	color: ${({ theme }) => theme.tokens['color-base-content-secondary']};
`

export const LoginMail = styled.a`
	${textSmRegular};
	text-decoration: none;
	color: ${({ theme }) => theme.tokens['color-base-content-secondary']};
`

export const LoginLayoutPlaceholder = styled.div`
	display: none;

	@media (min-width: ${breakpoints.md}px) {
		display: block;
		position: relative;
		background-image: url('/images/login_placeholder.png');
		background-repeat: no-repeat;
		background-size: cover;
		width: 50%;
	}
`

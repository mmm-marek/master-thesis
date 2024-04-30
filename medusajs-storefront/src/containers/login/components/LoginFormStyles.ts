import { Form as AntdForm } from 'antd'
import styled from 'styled-components'

import LogoIcon from '@/assets/icons/logo.svg'
import { headingSmSemibold, textMdRegular, textSmRegular } from '@/styles/helpers'

export const Form = styled(AntdForm)`
	width: 100%;
`

export const Header = styled.header`
	margin-bottom: ${({ theme }) => theme.spacing[32]};
	text-align: center;
`

export const Logo = styled(LogoIcon)`
	margin-right: auto;
	margin-bottom: ${({ theme }) => theme.spacing[64]};
	margin-left: auto;
	width: 206px;
	height: 20px;
	color: ${({ theme }) => theme.tokens['color-base-content-top']};
`

export const Title = styled.div`
	margin-bottom: ${({ theme }) => theme.spacingRem[4]};
	${headingSmSemibold};
	text-align: center;
	color: ${({ theme }) => theme.tokens['color-base-content-primary']};
`

export const FieldsWrapper = styled.div`
	margin-bottom: ${({ theme }) => theme.spacingRem[8]};
`

export const ForgotPasswordBtnWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: ${({ theme }) => theme.spacing[32]};
	margin-bottom: ${({ theme }) => theme.spacing[24]};
`

export const InfoLink = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${({ theme }) => theme.spacing[4]};
	align-items: center;
	justify-content: center;
	margin-top: ${({ theme }) => theme.spacing[24]};
`

export const InfoMd = styled.span`
	${textMdRegular};
	color: ${({ theme }) => theme.tokens['color-base-content-tertiary']};
`

export const InfoSm = styled.span`
	${textSmRegular};
	color: ${({ theme }) => theme.tokens['color-base-content-tertiary']};
`

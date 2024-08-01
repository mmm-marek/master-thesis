import { Form as AntdForm } from 'antd'
import styled from 'styled-components'

import { headingSmSemibold, textMdRegular, textSmRegular } from '@/styles/helpers'

export const Form = styled(AntdForm)`
	width: 100%;
`

export const Header = styled.header`
	margin-bottom: 16px;
	text-align: center;
`

export const Title = styled.div`
	margin-bottom: 4px;
	${headingSmSemibold};
	text-align: center;
	color: ${({ theme }) => theme.tokens['color-base-content-primary']};
`

export const FieldsWrapper = styled.div`
	margin-bottom: 8px;
`

export const ForgotPasswordBtnWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 32px;
`

export const InfoLink = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
	align-items: center;
	justify-content: center;
	margin-top: 24px;
`

export const InfoMd = styled.span`
	${textMdRegular};
	color: ${({ theme }) => theme.tokens['color-base-content-tertiary']};
`

export const InfoSm = styled.span`
	${textSmRegular};
	color: ${({ theme }) => theme.tokens['color-base-content-tertiary']};
`

export const SocialButtonsWrapper = styled.div`
	display: flex;
	gap: 16px;
	align-items: center;
	justify-content: center;
	margin-top: 16px;
`

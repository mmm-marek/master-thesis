import { Form as AntdForm } from 'antd'
import styled from 'styled-components'

import { headingSmSemibold, textMdRegular, textSmRegular } from '@/styles/helpers'

export const Form = styled(AntdForm)`
	width: 100%;
`

export const Header = styled.header`
	margin-bottom: ${({ theme }) => theme.spacing[32]};
	text-align: center;
`

export const Circle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: auto;
	margin-bottom: ${({ theme }) => theme.spacing[24]};
	margin-left: auto;
	border-radius: 999px;
	background-color: ${({ theme }) => theme.tokens['color-base-action-primary-bg10']};
	width: 56px;
	height: 56px;

	svg {
		width: 28px;
		height: 28px;
		color: ${({ theme }) => theme.tokens['color-base-action-primary-default']};
	}
`

export const Title = styled.div`
	margin-bottom: ${({ theme }) => theme.spacingRem[4]};
	${headingSmSemibold};
	text-align: center;
	color: ${({ theme }) => theme.tokens['color-base-content-primary']};
`

export const InfoMd = styled.span`
	${textMdRegular};
	color: ${({ theme }) => theme.tokens['color-base-content-tertiary']};
`

export const InfoSm = styled.span`
	${textSmRegular};
	color: ${({ theme }) => theme.tokens['color-base-content-tertiary']};
`

export const FieldsWrapper = styled.div`
	margin-bottom: ${({ theme }) => theme.spacingRem[8]};
`

export const BackBtnWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: ${({ theme }) => theme.spacing[32]};
`

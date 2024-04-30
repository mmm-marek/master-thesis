import { Form as AntdForm } from 'antd'
import styled from 'styled-components'

import { textXsSemibold } from '@/styles/helpers'

export const Form = styled(AntdForm)`
	display: flex;
	flex-direction: column;
`

export const TooltipList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing[8]};
	margin: 0;
	padding: 0;
	list-style: none;
	color: ${({ theme }) => theme.tokens['color-inverse-content-secondary']};
	${textXsSemibold}
`

import { Form as AntdForm } from 'antd'
import styled from 'styled-components'

import * as IFSC from '@/atoms/InputField/InputFieldStyles'

export const Form = styled(AntdForm)`
	display: flex;
	gap: 16px;

	${IFSC.FormItem} {
		width: 100%;
	}
`

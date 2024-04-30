import { FormItemLabelProps } from 'antd/es/form/FormItemLabel'
import { SizeType as AntdInputSize } from 'antd/lib/config-provider/SizeContext'
import { PasswordProps as AntdInputPasswordProps } from 'antd/lib/input'
import { PropsWithChildren } from 'react'

import { WrappedFieldsProps } from '@/types/interfaces'

export type InputSize = AntdInputSize | 'extra-large'
export type InputPasswordProps = Omit<AntdInputPasswordProps, 'size'> & {
	size?: InputSize
}
export type InputPasswordFieldProps = InputPasswordProps &
	PropsWithChildren &
	WrappedFieldsProps &
	FormItemLabelProps & {
		hideHelp?: boolean
	}

import { SizeType as AntdInputSize } from 'antd/lib/config-provider/SizeContext'
import { FormItemLabelProps } from 'antd/lib/form/FormItemLabel'
import { InputProps as AntdInputProps } from 'antd/lib/input'
import { PropsWithChildren } from 'react'

import { WrappedFieldsProps } from '@/types/types'
import { FIELD_MODE } from '@/utils/enums'

export type InputSize = AntdInputSize | 'extra-large'
export type InputProps = Omit<AntdInputProps, 'size'> & {
	size?: InputSize
}
export type InputFieldProps = InputProps &
	PropsWithChildren &
	WrappedFieldsProps &
	FormItemLabelProps & {
		hideHelp?: boolean
		fieldMode?: FIELD_MODE
	}

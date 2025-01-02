import { FormItemLabelProps } from 'antd/lib/form/FormItemLabel'
import { TextAreaProps } from 'antd/lib/input'

import { WrappedFieldsProps } from '@/types/types'

export type TextAreaFieldProps = WrappedFieldsProps &
	TextAreaProps &
	FormItemLabelProps & {
		focusRow?: number
		showLettersCount?: boolean
		focused?: boolean
	}

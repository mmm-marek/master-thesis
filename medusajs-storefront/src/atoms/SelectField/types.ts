import { FormItemProps, SelectProps } from 'antd'

import { WrappedFieldsProps } from '@/types/types'

export type SelectFieldProps = WrappedFieldsProps &
	SelectProps &
	FormItemProps & {
		optionRender?: (option: any) => React.ReactNode
		tooltip?: React.ReactNode
	}

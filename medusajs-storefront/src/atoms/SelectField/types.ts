import { FormItemProps, SelectProps } from 'antd'

import { WrappedFieldsProps } from '@/types/interfaces'

export type SelectFieldProps = WrappedFieldsProps &
	SelectProps &
	FormItemProps & {
		optionRender?: (option: any) => React.ReactNode
		tooltip?: React.ReactNode
	}

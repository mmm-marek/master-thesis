import { FormItemProps, SelectProps } from 'antd'
import { z } from 'zod'

import FilterSelectSchema from '@/schemas/atoms/filterSelect'
import { FilterSelectFieldValue, SelectOption, WrappedFieldsProps } from '@/types/interfaces'

export type FilterSelectFieldProps<
	ValueType extends FilterSelectFieldValue = FilterSelectFieldValue,
	OptionType extends SelectOption = SelectOption
> = WrappedFieldsProps<ValueType> &
	Omit<
		SelectProps<ValueType, OptionType>,
		'placeholder' | 'mode' | 'onSearch' | 'size' | 'optionLabelProp' | 'maxTagCount' | 'popupMatchSelectWidth' | 'menuItemSelectedIcon'
	> &
	Omit<FormItemProps, 'label'> & {
		label: string
		multiple?: boolean
		placeholder?: string
		optionRender?: (option: OptionType) => React.ReactNode
		hideSelectAllOption?: boolean
		checkable?: boolean
	}

export type FilterSelectSchemaType = z.infer<typeof FilterSelectSchema>

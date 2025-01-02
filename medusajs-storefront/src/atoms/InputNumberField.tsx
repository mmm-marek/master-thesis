import { Form, InputNumber } from 'antd'
import { FormItemLabelProps } from 'antd/lib/form/FormItemLabel'
import { InputNumberProps } from 'antd/lib/input-number'
import { memo } from 'react'

import { WrappedFieldsProps } from '@/types/types'
import { validateStatus } from '@/utils/helpers'

const { Item } = Form

type Props = WrappedFieldsProps &
	InputNumberProps &
	FormItemLabelProps & {
		maxChars?: number
		hideHelp?: boolean
	}

const InputNumberField = (props: Props) => {
	const {
		input: { ref, onBlur, onChange, value, onFocus },
		size,
		placeholder,
		label,
		required,
		disabled,
		style,
		meta: { error, isTouched, invalid },
		min = -99999999,
		max = 999999999,
		precision,
		step,
		parser,
		prefix,
		maxChars = 9, // NOTE: Kazde 9 ciferne cislo je bezpecne pre Postgres Integer typ
		defaultValue,
		type = 'text',
		hideHelp
	} = props

	const maxCharsParser = (displayValue: string | undefined): string => {
		if (maxChars && maxChars > 0 && displayValue && displayValue.length > maxChars) {
			return displayValue.slice(0, maxChars)
		}
		return displayValue || ''
	}

	return (
		<Item
			label={label}
			required={required}
			style={style}
			help={!hideHelp && invalid && error ? error : null}
			validateStatus={validateStatus(error, isTouched, invalid)}
		>
			<InputNumber
				ref={ref}
				min={min}
				max={max}
				size={size || 'middle'}
				defaultValue={defaultValue}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				precision={precision}
				prefix={prefix}
				step={step}
				type={type || 'text'}
				onFocus={onFocus}
				decimalSeparator=','
				parser={maxChars && maxChars > 0 ? maxCharsParser : parser}
				onBlur={onBlur}
				onChange={onChange}
			/>
		</Item>
	)
}

export default memo(InputNumberField)

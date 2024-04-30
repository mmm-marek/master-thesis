import { SearchOutlined } from '@ant-design/icons'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { memo } from 'react'

import { FIELD_MODE } from '@/utils/enums'
import { validateStatus } from '@/utils/helpers'

import * as SC from './InputFieldStyles'
import { InputFieldProps } from './types'

const InputField = (props: InputFieldProps) => {
	const {
		input: { ref, onChange, value, name, onBlur, onFocus },
		size = 'middle',
		label,
		required,
		type,
		prefix,
		disabled,
		style,
		meta: { error, isTouched, invalid },
		hideHelp,
		fieldMode = FIELD_MODE.INPUT,
		...rest
	} = props

	return (
		<SC.FormItem
			label={label}
			required={required}
			style={style}
			help={!hideHelp && invalid && error ? error : null}
			validateStatus={validateStatus(error, isTouched, invalid)}
			$size={size}
			$hideHelp={hideHelp}
		>
			<SC.Input
				{...rest}
				name={name}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				size={size as SizeType}
				value={value}
				type={type || 'text'}
				prefix={fieldMode === FIELD_MODE.FILTER ? <SearchOutlined /> : prefix}
				disabled={disabled || false}
				ref={ref}
			/>
		</SC.FormItem>
	)
}

export default memo(InputField)

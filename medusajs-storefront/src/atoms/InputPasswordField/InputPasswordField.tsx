import { SizeType } from 'antd/es/config-provider/SizeContext'
import { memo } from 'react'

import { validateStatus } from '@/utils/helpers'

import * as SC from './InputPasswordFieldStyles'
import { InputPasswordFieldProps } from './types'

const InputField = (props: InputPasswordFieldProps) => {
	const {
		input: { ref, onChange, value, name, onBlur, onFocus },
		size = 'middle',
		placeholder,
		label,
		required,
		type,
		disabled,
		style,
		meta: { error, isTouched, invalid },
		hideHelp,
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
		>
			<SC.Input
				{...rest}
				name={name}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				size={size as SizeType}
				value={value}
				placeholder={placeholder}
				type={type || 'text'}
				disabled={disabled || false}
				ref={ref}
			/>
		</SC.FormItem>
	)
}

export default memo(InputField)

import { Checkbox, Form } from 'antd'
import { CheckboxGroupProps } from 'antd/lib/checkbox'
import { FormItemProps } from 'antd/lib/form/FormItem'
import { map } from 'lodash'

import { WrappedFieldsProps } from '@/types/interfaces'
import { validateStatus } from '@/utils/helpers'

const { Item } = Form

type ComponentProps = {
	hideHelp?: boolean
}

type Props = WrappedFieldsProps & CheckboxGroupProps & FormItemProps & ComponentProps

const CheckboxGroupField = (props: Props) => {
	const {
		input: { ref, onChange, value },
		options,
		label,
		required,
		meta: { error, isTouched, invalid },
		style,
		defaultValue,
		disabled,
		hideHelp
	} = props

	const checkboxes = map(options, (option: any) => {
		if (typeof option === 'string') {
			return (
				<Checkbox key={option} value={option} disabled={disabled}>
					{option}
				</Checkbox>
			)
		}
		return (
			<Checkbox disabled={disabled || option.disabled} key={`${option.value}`} value={option.value}>
				{option.label}
			</Checkbox>
		)
	})

	return (
		<Item
			label={label}
			required={required}
			style={style}
			help={!hideHelp && invalid && error ? error : null}
			validateStatus={validateStatus(error, isTouched, invalid)}
		>
			<Checkbox.Group onChange={onChange} value={value} defaultValue={defaultValue} ref={ref}>
				{checkboxes}
			</Checkbox.Group>
		</Item>
	)
}

export default CheckboxGroupField

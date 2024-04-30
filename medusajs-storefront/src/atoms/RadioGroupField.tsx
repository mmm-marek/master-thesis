import { Form, Radio } from 'antd'
import { FormItemLabelProps } from 'antd/lib/form/FormItemLabel'
import { RadioGroupProps } from 'antd/lib/radio/'
import { map } from 'lodash'

import { WrappedFieldsProps } from '@/types/interfaces'
import { validateStatus } from '@/utils/helpers'

const { Item } = Form

type Props = WrappedFieldsProps &
	RadioGroupProps &
	FormItemLabelProps & {
		options: any
		hideHelp?: boolean
		required?: boolean
	}

const RadioGroupField = (props: Props) => {
	const {
		input: { ref, onBlur, onChange, value },
		label,
		required,
		options,
		meta: { error, isTouched, invalid },
		style,
		disabled,
		hideHelp
	} = props

	const radioOptions = map(options, (option) => {
		if (typeof option === 'string') {
			return (
				<Radio key={option} value={option}>
					{option}
				</Radio>
			)
		}
		return (
			<Radio key={`${option.value}`} value={option.value}>
				{option.label}
				{option?.customContent ? option.customContent : null}
			</Radio>
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
			<Radio.Group value={value} onChange={onChange} disabled={disabled} ref={ref} onBlur={onBlur}>
				{radioOptions}
			</Radio.Group>
		</Item>
	)
}

export default RadioGroupField

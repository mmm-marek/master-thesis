import { ClockCircleOutlined } from '@ant-design/icons'
import { Form, TimePicker } from 'antd'
import { FormItemProps } from 'antd/lib/form/FormItem'
import { TimePickerProps } from 'antd/lib/time-picker'
import dayjs from 'dayjs'

import { WrappedFieldsProps } from '@/types/types'
import { DEFAULT_TIME_FORMAT, DROPDOWN_POSITION } from '@/utils/enums'
import { validateStatus } from '@/utils/helpers'

type Props = WrappedFieldsProps &
	TimePickerProps &
	FormItemProps & {
		hideHelp?: boolean
	}

const { Item } = Form

const TimeRangeField = (props: Props) => {
	const {
		input: { ref, onBlur, onChange, value },
		placeholder,
		disabled,
		clearIcon,
		allowClear,
		meta: { error, isTouched, invalid },
		minuteStep,
		getPopupContainer,
		required,
		size,
		format = DEFAULT_TIME_FORMAT,
		hideHelp,
		style,
		label
	} = props

	let pickerValue
	if (value) {
		pickerValue = dayjs(value, format as string)
	}

	const customOnChange = (val: any) => {
		if (val && val !== '') {
			onChange(val.format(format))
		} else {
			onChange(null)
		}
	}

	return (
		<Item
			label={label}
			required={required}
			style={style}
			help={!hideHelp && invalid && error ? error : null}
			validateStatus={validateStatus(error, isTouched, invalid)}
		>
			<TimePicker
				ref={ref}
				dropdownAlign={DROPDOWN_POSITION.BOTTOM_LEFT}
				onChange={customOnChange}
				format={format}
				value={pickerValue}
				popupClassName='time-dropdown'
				size={size}
				suffixIcon={<ClockCircleOutlined className='text-black' />}
				placeholder={placeholder}
				disabled={disabled}
				clearIcon={clearIcon}
				allowClear={allowClear}
				minuteStep={minuteStep}
				onBlur={onBlur}
				getPopupContainer={getPopupContainer || ((node: any) => node)}
			/>
		</Item>
	)
}

export default TimeRangeField

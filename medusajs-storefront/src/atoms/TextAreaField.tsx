import { Form, Input, Row } from 'antd'
import { FormItemLabelProps } from 'antd/lib/form/FormItemLabel'
import { TextAreaProps } from 'antd/lib/input'
import { trimStart } from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'

import { WrappedFieldsProps } from '@/types/interfaces'
import { validateStatus } from '@/utils/helpers'

type Props = WrappedFieldsProps &
	TextAreaProps &
	FormItemLabelProps & {
		focusRow?: number
		showLettersCount?: boolean
	}

const TextareaField = (props: Props) => {
	const {
		input: { ref, onBlur, onChange, value, onFocus },
		prefix,
		disabled,
		label,
		placeholder,
		required,
		meta: { error, isTouched, invalid },
		rows,
		autoSize,
		allowClear,
		style,
		maxLength,
		focusRow,
		readOnly,
		size,
		showLettersCount
	} = props

	const [autoSizeState, setSutoSizeState] = useState(undefined as { minRows?: number; maxRows?: number } | undefined)

	const parseValue = (val: any) => trimStart(val) || null

	const customOnChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			if (onChange) {
				const val = parseValue(e.target.value)
				onChange(val)
			}
		},
		[onChange]
	)

	const customOnFocus = useCallback(
		(e: React.FocusEvent<HTMLTextAreaElement>) => {
			e.target.selectionEnd = 1
			if (onFocus) {
				onFocus(e)
			}
			if (focusRow) {
				setSutoSizeState({ minRows: focusRow, maxRows: 10 })
				// ref?.current?.resizableTextArea?.resizeOnNextFrame()
			}
		},
		[focusRow, onFocus, setSutoSizeState]
	)

	const lettersCount = useMemo(() => {
		return (
			<Row className='justify-between w-full pr-2 items-end'>
				<span>{label}</span>
				<i className='xs-regular mb-1'>{`${value?.length || 0}/${maxLength}`}</i>
			</Row>
		)
	}, [maxLength, value, label])

	return (
		<Form.Item
			label={showLettersCount ? lettersCount : label}
			required={required}
			style={style}
			help={invalid && error ? error : null}
			validateStatus={validateStatus(error, isTouched, invalid)}
		>
			<Input.TextArea
				onFocus={customOnFocus}
				onChange={customOnChange}
				value={value}
				onBlur={onBlur}
				placeholder={placeholder}
				prefix={prefix}
				disabled={disabled}
				rows={rows}
				autoSize={autoSizeState || autoSize}
				allowClear={allowClear}
				maxLength={maxLength}
				ref={ref}
				size={size}
				readOnly={readOnly}
			/>
		</Form.Item>
	)
}

export default TextareaField

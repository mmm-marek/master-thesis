import { Row } from 'antd'
import { trimStart } from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'

import { validateStatus } from '@/utils/helpers'

import * as SC from './TextAreaFieldStyles'
import { TextAreaFieldProps } from './types'

const TextAreaField = (props: TextAreaFieldProps) => {
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
			<Row>
				<span>{label}</span>
				<i>{`${value?.length || 0}/${maxLength}`}</i>
			</Row>
		)
	}, [maxLength, value, label])

	return (
		<SC.FormItem
			label={showLettersCount ? lettersCount : label}
			required={required}
			style={style}
			help={invalid && error ? error : null}
			validateStatus={validateStatus(error, isTouched, invalid)}
		>
			<SC.TextArea
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
		</SC.FormItem>
	)
}

export default TextAreaField

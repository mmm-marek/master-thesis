import { Select, Tooltip } from 'antd'
import React from 'react'

import { validateStatus } from '@/utils/helpers'

import * as SC from './SelectFieldStyles'
import { SelectFieldProps } from './types'

const { Option } = Select

const SelectField = ({
	input: { onChange, value, onBlur, ref },
	meta: { error, isTouched, invalid },
	disabled,
	label,
	required,
	style,
	className,
	placeholder,
	options,
	allowClear,
	mode,
	defaultValue,
	onSearch,
	filterOption,
	optionRender,
	size,
	tooltip,
	tagRender
}: SelectFieldProps) => {
	const renderOptions = (renderOption: (option: any) => React.ReactNode): React.ReactNode => {
		if (options && options.length > 0) {
			return options.map((option, index) => (
				<Option key={option.key || index} value={option.value} label={option.label} disabled={option.disabled}>
					{renderOption(option)}
				</Option>
			))
		}

		return null
	}

	return (
		<SC.FormItem
			label={
				tooltip ? (
					// TODO: use Tooltip from atoms
					<Tooltip title={tooltip}>
						<SC.TooltipTriggerContainer>
							<SC.TooltipTriggerLabel>{label}</SC.TooltipTriggerLabel>
							<SC.InfoCircleIcon />
						</SC.TooltipTriggerContainer>
					</Tooltip>
				) : (
					label
				)
			}
			required={required}
			style={style}
			className={className}
			help={invalid && error ? error : null}
			validateStatus={validateStatus(error, isTouched, invalid)}
			$hasTooltip={!!tooltip}
		>
			<SC.Select
				disabled={disabled}
				allowClear={allowClear}
				mode={mode}
				placeholder={placeholder}
				defaultValue={defaultValue}
				value={value}
				onSearch={onSearch}
				onBlur={onBlur}
				ref={ref}
				filterOption={filterOption}
				onChange={onChange}
				options={optionRender ? undefined : options}
				size={size}
				suffixIcon={<SC.ChevronDown />}
				getPopupContainer={(triggerNode) => triggerNode}
				tagRender={tagRender}
			>
				{optionRender && renderOptions(optionRender)}
			</SC.Select>
		</SC.FormItem>
	)
}

export default SelectField

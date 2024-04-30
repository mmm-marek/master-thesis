import { Select } from 'antd'
import { useTranslations } from 'next-intl'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import ChevronIcon from '@/assets/icons/chevron.svg'
import Empty from '@/atoms/Empty/Empty'
import InputField from '@/atoms/InputField/InputField'
import HookFormField from '@/components/HookFormField'
import FilterSelectSchema from '@/schemas/atoms/filterSelect'
import { FilterSelectFieldValue, SelectOption } from '@/types/interfaces'
import { FIELD_MODE } from '@/utils/enums'
import { transformToLowerCaseWithoutAccent, validateStatus } from '@/utils/helpers'
import { IntlTranslator } from '@/utils/intl'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './FilterSelectFieldStyles'
import { FilterSelectFieldProps, FilterSelectSchemaType } from './types'

const { Option } = Select

enum SELECT_ALL_VALUE {
	ALL = 'all',
	NONE = 'none',
	INDETERMINATE = 'indeterminate'
}

const getOptions = <OptionType extends SelectOption = SelectOption>(
	showSelectAllOption: boolean,
	options: OptionType[],
	optionRender?: (option: OptionType) => React.ReactNode,
	selectAllValue?: SELECT_ALL_VALUE
) => {
	const selectAllLabel = IntlTranslator.t('atoms.filterSelectField.selectAll')
	const selectAllOption = (
		<SC.SelectAllOption
			key={SELECT_ALL_VALUE.ALL}
			value={SELECT_ALL_VALUE.ALL}
			label={selectAllLabel}
			className={`select-all-option ${selectAllValue === SELECT_ALL_VALUE.ALL ? 'ant-select-item-option-selected' : ''}`}
			disabled={!options.length}
		>
			<SC.SelectAllOptionLabel>
				<span>{selectAllLabel}</span>
				<SC.MenuItemSelectedIcon
					checked={selectAllValue === SELECT_ALL_VALUE.ALL}
					indeterminate={selectAllValue === SELECT_ALL_VALUE.INDETERMINATE}
					tabIndex={-1}
				/>
			</SC.SelectAllOptionLabel>
		</SC.SelectAllOption>
	)

	const mappedOptions = (options || []).map((option) => {
		return (
			<Option key={option.key} value={option.value} disabled={option.disabled} label={option.label} extra={option.extra}>
				{optionRender ? optionRender(option) : option.label}
			</Option>
		)
	})

	return showSelectAllOption ? [selectAllOption, ...mappedOptions] : [...mappedOptions]
}

const FilterSelectField = <ValueType extends FilterSelectFieldValue = FilterSelectFieldValue, OptionType extends SelectOption = SelectOption>(
	props: FilterSelectFieldProps<ValueType, OptionType>
) => {
	const {
		input: { onChange, value, onBlur, ref },
		meta: { error, isTouched, invalid },
		disabled,
		label,
		required,
		style,
		placeholder,
		allowClear,
		options,
		optionRender,
		multiple,
		placement = 'bottomLeft',
		hideSelectAllOption = false,
		showSearch,
		labelInValue
	} = props

	const t = useTranslations('atoms.filterSelectField')

	const [selectAllValue, setSelectAllValue] = useState<SELECT_ALL_VALUE>(SELECT_ALL_VALUE.NONE)

	const { control, watch, setValue } = useForm<FilterSelectSchemaType>({
		mode: 'onChange',
		resolver: zodResolver(FilterSelectSchema)
	})

	const search = watch('search')

	const filteredOptions = useMemo(
		() =>
			(options || []).filter((option) => !search || transformToLowerCaseWithoutAccent(option.label)?.includes(transformToLowerCaseWithoutAccent(search))),
		[options, search]
	)

	const hasValue = !!(Array.isArray(value) ? value.length : value)

	const allValues = labelInValue ? filteredOptions : filteredOptions.map((o) => o.value)

	useEffect(() => {
		if (multiple && Array.isArray(value)) {
			setSelectAllValue(() => {
				if (value.length) {
					return value.length === filteredOptions.length ? SELECT_ALL_VALUE.ALL : SELECT_ALL_VALUE.INDETERMINATE
				}
				return SELECT_ALL_VALUE.NONE
			})
		}
	}, [multiple, filteredOptions.length, value])

	const handleSelect = (v: ValueType): ValueType => {
		if (v && multiple && Array.isArray(v) && v.length) {
			const hasSelectAllValue = v.find((val) => {
				if (typeof val === 'string') {
					return val === SELECT_ALL_VALUE.ALL
				}

				return val.value === SELECT_ALL_VALUE.ALL
			})
			if (hasSelectAllValue) {
				if (v.length === allValues.length + 1) {
					setSelectAllValue(SELECT_ALL_VALUE.NONE)
					return [] as unknown as ValueType
				}
				setSelectAllValue(SELECT_ALL_VALUE.ALL)
				return [...allValues] as ValueType
			}
		}
		return v
	}

	const onDropdownVisibleChange = (open: boolean) => {
		if (search && !open) {
			setValue('search', '')
		}
	}

	const dropdownRender = (menu: React.ReactElement) => {
		return (
			<SC.DropdownWrapper>
				{showSearch && (
					<SC.SearchWrapper>
						<HookFormField
							control={control}
							name='search'
							component={InputField}
							type='text'
							placeholder={t('search')}
							size='small'
							fieldMode={FIELD_MODE.FILTER}
						/>
					</SC.SearchWrapper>
				)}
				{filteredOptions.length ? (
					menu
				) : (
					<SC.EmptyWrapper>
						<Empty />
					</SC.EmptyWrapper>
				)}
			</SC.DropdownWrapper>
		)
	}

	return (
		<SC.FormItem label={label} required={required} style={style} help={false} validateStatus={validateStatus(error, isTouched, invalid)}>
			<SC.Select
				$labelText={label}
				$placeholderText={!hasValue ? placeholder : undefined}
				$multiple={multiple}
				$hasValue={hasValue}
				disabled={disabled}
				allowClear={allowClear}
				placeholder={placeholder || t('all')}
				value={value}
				onBlur={onBlur}
				ref={ref}
				onChange={(v: any) => onChange(handleSelect(v))}
				mode={multiple ? 'multiple' : undefined}
				filterOption={false}
				maxTagCount={1}
				popupMatchSelectWidth={255}
				placement={placement}
				virtual
				listHeight={250}
				dropdownRender={dropdownRender}
				showSearch={false}
				tagRender={(p) => <SC.TagRender>{p.label}</SC.TagRender>}
				maxTagPlaceholder={(omittedValues) => `+${omittedValues.length}`}
				suffixIcon={<ChevronIcon />}
				getPopupContainer={(triggerNode) => triggerNode}
				onDropdownVisibleChange={onDropdownVisibleChange}
				maxTagTextLength={30}
				menuItemSelectedIcon={(p) => {
					return multiple ? <SC.MenuItemSelectedIcon checked={p.isSelected} tabIndex={-1} /> : null
				}}
			>
				{getOptions(!!multiple && !hideSelectAllOption, filteredOptions, optionRender, selectAllValue)}
			</SC.Select>
		</SC.FormItem>
	)
}

export default FilterSelectField

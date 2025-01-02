import { Form, Switch, Tooltip, Typography } from 'antd'
import { FormItemLabelProps } from 'antd/lib/form/FormItemLabel'
import { SwitchProps } from 'antd/lib/switch'
import { ReactNode, useCallback } from 'react'

import { WrappedFieldsProps } from '@/types/types'
import { validateStatus } from '@/utils/helpers'

type Props = WrappedFieldsProps &
	SwitchProps &
	FormItemLabelProps & {
		suffixIcon?: JSX.Element
		extraText?: ReactNode
		description?: string // text ktory sa zobrazi v tooltipe pri prilozeni na ikonu, ktory moze niekedy dodefinovat dany switch (eg. doplnkove sluzby)
		customLabel?: ReactNode
		customOnChange?: (value: boolean) => void
		required?: boolean
	}

const SwitchField = (props: Props) => {
	const {
		input,
		label,
		disabled,
		meta: { error, isTouched, invalid },
		style,
		size,
		onClick,
		checked,
		className,
		suffixIcon,
		extraText,
		description,
		customLabel,
		required,
		customOnChange
	} = props
	// NOTE: ak existuje label znamena to ze switch je pouzity ako label vo forme a vtedy sa pouzije novy layout ikona + label text + switch
	// Ak nie je label pouzite je v tabulke alebo vo filtri a vtedy sa nerenderuje label ani ikona ale len samotny switch field

	const checkedState = input.value === 'true' || input.value === true || checked

	const onChange = useCallback(
		(chck: boolean) => {
			if (customOnChange) {
				customOnChange(chck)
			} else {
				input.onChange(chck)
			}
		},
		[input, customOnChange]
	)

	return (
		<Form.Item
			required={required}
			help={isTouched && error ? error : null}
			validateStatus={validateStatus(error, isTouched, invalid)}
			style={style}
			className={className}
		>
			{label || customLabel ? (
				<div
					className={disabled ? 'pointer-events-none' : ''}
					onClick={() => onChange(!checkedState)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							onChange(!checkedState)
						}
					}}
					role='checkbox'
					aria-checked={checkedState}
					tabIndex={0}
				>
					<div>
						<div>
							{customLabel || (
								<Typography.Paragraph ellipsis={{ rows: 1, tooltip: true }} className='label'>
									{label}
								</Typography.Paragraph>
							)}
							{description && (
								<Tooltip title={description} className='cursor-pointer'>
									{suffixIcon}
								</Tooltip>
							)}
						</div>
						<div>
							<div>{extraText}</div>
							<span>
								<Switch ref={input.ref} checked={checkedState} disabled={disabled} size={size} onClick={onClick} tabIndex={-1} />
							</span>
						</div>
					</div>
				</div>
			) : (
				<Switch onChange={onChange} checked={checkedState} disabled={disabled} size={size} onClick={onClick} ref={input.ref} />
			)}
		</Form.Item>
	)
}

export default SwitchField

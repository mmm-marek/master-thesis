import { Eye, EyeOff } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import * as SC from './InputFieldStyles'
import { InputFieldProps } from './types'

const InputField = ({
	input: { ref, onChange, value, name, onBlur, onFocus },
	label,
	required,
	type,
	prefix,
	disabled,
	style,
	meta: { error, invalid },
	...rest
}: InputFieldProps) => {
	const t = useTranslations('atoms.input')

	const [showPassword, setShowPassword] = useState(false)

	const inputType = type === 'password' && showPassword ? 'text' : type

	return (
		<SC.TextField isDisabled={disabled} isInvalid={!!error && invalid} isRequired={required}>
			<SC.Label>
				<span>{label}</span>
				{required && <SC.Asterisk>*</SC.Asterisk>}
			</SC.Label>
			<SC.InputWrapper>
				<SC.Input name={name} onChange={onChange} onBlur={onBlur} onFocus={onFocus} value={value} type={inputType} ref={ref} {...rest} />
				{type === 'password' && (
					<SC.PasswordToggle
						type='button'
						onPress={() => setShowPassword(!showPassword)}
						aria-label={showPassword ? t('hidePassword') : t('showPassword')}
					>
						{showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
					</SC.PasswordToggle>
				)}
			</SC.InputWrapper>
			<SC.FieldError>{error}</SC.FieldError>
		</SC.TextField>
	)
}

export default InputField

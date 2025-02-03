import * as SC from './TextAreaFieldStyles'
import { TextAreaFieldProps } from './types'

const TextAreaField = ({
	input: { ref, onChange, value, name, onBlur, onFocus },
	label,
	required,
	prefix,
	disabled,
	style,
	meta: { error, invalid },
	...rest
}: TextAreaFieldProps) => {
	return (
		<SC.TextField isDisabled={disabled} isInvalid={!!error && invalid} isRequired={required}>
			<SC.Label>
				<span>{label}</span>
				{required && <SC.Asterisk>*</SC.Asterisk>}
			</SC.Label>
			<SC.TextArea name={name} onChange={onChange} onBlur={onBlur} onFocus={onFocus} value={value} ref={ref} {...rest} />
			<SC.FieldError>{error}</SC.FieldError>
		</SC.TextField>
	)
}

export default TextAreaField

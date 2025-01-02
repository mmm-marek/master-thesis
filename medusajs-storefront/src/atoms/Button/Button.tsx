import * as SC from './ButtonStyles'
import { ButtonProps } from './types'

const Button = ({ size, variant, children, ...rest }: ButtonProps) => {
	return (
		<SC.Button {...rest} $size={size ?? 'medium'} $variant={variant ?? 'primary'}>
			{children}
		</SC.Button>
	)
}

export default Button

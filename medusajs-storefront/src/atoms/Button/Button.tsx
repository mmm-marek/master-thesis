import * as SC from './ButtonStyles'
import { ButtonProps } from './types'

const Button = ({ size, variant, children, isFullWidth, ...rest }: ButtonProps) => {
	return (
		<SC.Button {...rest} $size={size ?? 'medium'} $variant={variant ?? 'primary'} $isFullWidth={isFullWidth}>
			{children}
		</SC.Button>
	)
}

export default Button

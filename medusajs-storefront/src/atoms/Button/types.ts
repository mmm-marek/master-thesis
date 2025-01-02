import { PropsWithChildren } from 'react'
import { ButtonProps as AriaButtonProps } from 'react-aria-components'

export type ButtonSize = 'small' | 'medium' | 'large'

export type ButtonVariant = 'primary' | 'secondary'

export type ButtonProps = PropsWithChildren<AriaButtonProps> & {
	size?: ButtonSize
	variant?: ButtonVariant
}

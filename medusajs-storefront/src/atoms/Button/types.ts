import { ButtonProps as AntdButtonProps } from 'antd/lib/button'
import { SizeType as AntdButtonSize } from 'antd/lib/config-provider/SizeContext'
import { PropsWithChildren } from 'react'

export type ButtonSize = AntdButtonSize | 'extra-large'
type InternalButtonProps = Omit<AntdButtonProps, 'size'> & {
	size?: ButtonSize
	endIcon?: React.ReactNode
	noBackground?: boolean
}
export type ButtonProps = InternalButtonProps & PropsWithChildren

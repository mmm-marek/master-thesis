import { SizeType } from 'antd/es/config-provider/SizeContext'
import { ReactNode } from 'react'

import LoadingIcon from '@/atoms/LoadingIcon/LoadingIcon'

import * as SC from './ButtonStyles'
import { ButtonProps } from './types'

const getIcons = (icon?: ReactNode, endIcon?: ReactNode, loading?: boolean) => {
	let currentIcon: React.ReactNode
	let currentEndIcon: React.ReactNode

	if (!icon && !endIcon && !loading) {
		currentIcon = null
		currentEndIcon = null
	}

	if (icon && !endIcon && loading) {
		currentIcon = <LoadingIcon />
	}

	if (!icon && endIcon && loading) {
		currentEndIcon = <LoadingIcon />
	}

	if (icon && !endIcon && !loading) {
		currentIcon = icon
	}

	if (!icon && endIcon && !loading) {
		currentEndIcon = endIcon
	}

	if (icon && endIcon && !loading) {
		currentIcon = icon
		currentEndIcon = endIcon
	}

	if (icon && endIcon && loading) {
		currentIcon = <LoadingIcon />
		currentEndIcon = endIcon
	}

	return {
		currentIcon,
		currentEndIcon
	}
}

const Button = (props: ButtonProps) => {
	const { size, loading, icon, endIcon, noBackground, children, ...rest } = props
	const { currentIcon, currentEndIcon } = getIcons(icon, endIcon, Boolean(loading))
	const isIconOnly = children === undefined

	return (
		<SC.Button
			size={size as SizeType}
			loading={loading}
			{...rest}
			onMouseDown={(e) => e.preventDefault()}
			$noBackground={noBackground}
			$isIconOnly={isIconOnly}
		>
			{currentIcon && <SC.IconWrapper $size={size}>{currentIcon}</SC.IconWrapper>}
			{children}
			{currentEndIcon && <SC.IconWrapper $size={size}>{currentEndIcon}</SC.IconWrapper>}
		</SC.Button>
	)
}

export default Button

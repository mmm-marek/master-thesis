import { ModalProps as AntdModalProps } from 'antd'
import React from 'react'

export type ModalProps = AntdModalProps & {
	danger?: boolean
	description?: React.ReactNode
	loading?: boolean
	okDisabled?: boolean
	cancelDisabled?: boolean
}

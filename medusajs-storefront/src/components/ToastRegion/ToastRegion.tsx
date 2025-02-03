import { useToast, useToastRegion } from '@react-aria/toast'
import { ReactNode, useRef } from 'react'

import * as SC from './ToastRegionStyles'

import type { AriaToastProps, AriaToastRegionProps } from '@react-aria/toast'
import type { ToastState } from '@react-stately/toast'

type ToastProps<T> = AriaToastProps<T> & {
	state: ToastState<T>
}

const Toast = <T extends ReactNode>({ state, ...props }: ToastProps<T>) => {
	const ref = useRef(null)
	const { toastProps, contentProps, titleProps, closeButtonProps } = useToast(props, state, ref)

	return (
		<SC.ToastContainer
			{...toastProps}
			ref={ref}
			data-animation={props.toast.animation}
			onAnimationEnd={() => {
				if (props.toast.animation === 'exiting') {
					state.remove(props.toast.key)
				}
			}}
		>
			<SC.ToastContent {...contentProps}>
				<div {...titleProps}>{props.toast.content}</div>
			</SC.ToastContent>
			<SC.CloseButton {...closeButtonProps}>×</SC.CloseButton>
		</SC.ToastContainer>
	)
}

type ToastRegionProps<T> = AriaToastRegionProps & {
	state: ToastState<T>
}

const ToastRegion = <T extends ReactNode>({ state, ...props }: ToastRegionProps<T>) => {
	const ref = useRef(null)
	const { regionProps } = useToastRegion(props, state, ref)

	return (
		<SC.ToastRegionContainer {...regionProps} ref={ref}>
			{state.visibleToasts.map((toast) => (
				<Toast key={toast.key} toast={toast} state={state} />
			))}
		</SC.ToastRegionContainer>
	)
}

export default ToastRegion

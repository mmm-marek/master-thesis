import { ToastQueue, useToastQueue } from '@react-stately/toast'
import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import ToastRegion from '@/components/ToastRegion/ToastRegion'

export const toastQueue = new ToastQueue<ReactNode>({
	maxVisibleToasts: 5,
	hasExitAnimation: true
})

const GlobalToastRegion = () => {
	const state = useToastQueue(toastQueue)

	return state.visibleToasts.length > 0 ? createPortal(<ToastRegion state={state} />, document.body) : null
}

export default GlobalToastRegion

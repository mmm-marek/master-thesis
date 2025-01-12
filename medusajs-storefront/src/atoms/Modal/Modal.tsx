import { Dialog } from 'react-aria-components'

import * as SC from './ModalStyles'
import { ModalProps } from './types'

const Modal = ({ children, ...rest }: ModalProps) => {
	return (
		<SC.Modal {...rest}>
			<Dialog>{children}</Dialog>
		</SC.Modal>
	)
}

export default Modal

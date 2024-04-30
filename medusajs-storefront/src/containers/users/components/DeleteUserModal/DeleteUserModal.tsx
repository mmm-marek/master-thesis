import { useTranslations } from 'next-intl'

import Modal from '@/components/Modal/Modal'
import { ModalProps } from '@/components/Modal/types'

import * as SC from './DeleteUserModalStyles'

type DeleteUserModalProps = ModalProps & {
	email?: string
	onCancel: () => void
	onDelete: () => void
}

const DeleteUserModal = ({ onCancel, onDelete, email, ...rest }: DeleteUserModalProps) => {
	const t = useTranslations('containers.users.deleteUserModal')

	return (
		<Modal {...rest} danger title={t('deleteUser')} onOk={onDelete} onCancel={onCancel}>
			<SC.Description>
				{t.rich('confirmDelete', {
					styledEmail: (chunk) => <SC.Email>{chunk}</SC.Email>,
					email
				})}
				{t('deleteWarning')}
			</SC.Description>
		</Modal>
	)
}

export default DeleteUserModal

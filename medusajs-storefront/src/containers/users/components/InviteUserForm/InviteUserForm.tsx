import { useTranslations } from 'next-intl'
import { UseFormReset, useForm } from 'react-hook-form'

import InputField from '@/atoms/InputField/InputField'
import SelectField from '@/atoms/SelectField/SelectField'
import HookFormField from '@/components/HookFormField'
import Modal from '@/components/Modal/Modal'
import { inviteUserFormSchema } from '@/schemas/pages/users'
import { FORM, USER_ROLE } from '@/utils/enums'
import { USER_PERMISSIONS_OPTIONS } from '@/utils/helpers'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './InviteUserFormStyles'
import { InviteUserFormFields } from './types'

export type InviteUserFormProps = {
	open: boolean
	isSubmitting?: boolean
	onCancel: () => void
	onSubmit: (data: InviteUserFormFields, reset: UseFormReset<InviteUserFormFields>) => Promise<void>
}

const defaultValues = { email: '', permission: USER_ROLE.ADMINISTRATOR }

const InviteUserForm = ({ onCancel, onSubmit, isSubmitting, open }: InviteUserFormProps) => {
	const t = useTranslations('containers.users.inviteUserForm')

	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty }
	} = useForm<InviteUserFormFields>({
		mode: 'onChange',
		resolver: zodResolver(inviteUserFormSchema),
		defaultValues
	})

	const handleFormSubmit = (data: InviteUserFormFields) => {
		onSubmit(data, reset)
	}

	const handleModalCancel = () => {
		reset()
		onCancel()
	}

	return (
		<Modal
			onCancel={handleModalCancel}
			open={open}
			title={t('inviteUser')}
			description={t('info')}
			loading={isSubmitting}
			cancelDisabled={isSubmitting}
			okButtonProps={{ htmlType: 'submit', form: FORM.INVITE_USER, disabled: !isDirty || isSubmitting }}
			okText={t('sendInvite')}
		>
			<SC.Form onSubmitCapture={handleSubmit(handleFormSubmit)} id={FORM.INVITE_USER}>
				<HookFormField control={control} name='email' component={InputField} label={t('email')} required placeholder={t('enterEmail')} size='large' />
				<HookFormField
					control={control}
					name='permission'
					component={SelectField}
					getPopupContainer={(node: any) => node?.closest('.ant-modal-body')}
					label={t('role')}
					required
					placeholder={t('selectRole')}
					size='large'
					options={USER_PERMISSIONS_OPTIONS()}
				/>
			</SC.Form>
		</Modal>
	)
}

export default InviteUserForm

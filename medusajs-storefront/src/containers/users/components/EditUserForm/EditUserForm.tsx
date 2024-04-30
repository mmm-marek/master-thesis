import { ModalProps } from 'antd'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import InputField from '@/atoms/InputField/InputField'
import SelectField from '@/atoms/SelectField/SelectField'
import HookFormField from '@/components/HookFormField'
import Modal from '@/components/Modal/Modal'
import { editUserFormSchema } from '@/schemas/pages/users'
import { FORM } from '@/utils/enums'
import { USER_PERMISSIONS_OPTIONS } from '@/utils/helpers'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './EditUserFormStyles'
import { EditUserFormFields } from './types'

type EditUserFormProps = ModalProps & {
	onSubmit: (data: EditUserFormFields) => Promise<void>
	defaultValues?: EditUserFormFields
	email?: string
	isSubmitting: boolean
}

const EditUserForm = ({ onCancel, onSubmit, defaultValues, email, isSubmitting, open }: EditUserFormProps) => {
	const t = useTranslations('containers.users.editUserForm')

	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty }
	} = useForm<EditUserFormFields>({
		mode: 'onChange',
		resolver: zodResolver(editUserFormSchema),
		defaultValues
	})

	useEffect(() => {
		if (open) {
			reset({ permission: defaultValues?.permission, name: defaultValues?.name, surname: defaultValues?.surname, phone: defaultValues?.phone })
		}
	}, [defaultValues?.permission, defaultValues?.name, defaultValues?.surname, defaultValues?.phone, open, reset])

	return (
		<Modal
			open={open}
			onCancel={onCancel}
			title={t('editUser')}
			description={email}
			loading={isSubmitting}
			cancelDisabled={isSubmitting}
			okButtonProps={{ htmlType: 'submit', form: FORM.EDIT_USER, disabled: !isDirty || isSubmitting }}
		>
			<SC.Form onSubmitCapture={handleSubmit(onSubmit)} id={FORM.EDIT_USER}>
				<HookFormField control={control} name='name' component={InputField} label={t('name')} type='text' placeholder={t('enterName')} size='large' />
				<HookFormField
					control={control}
					name='surname'
					component={InputField}
					label={t('surname')}
					type='text'
					placeholder={t('enterSurname')}
					size='large'
				/>
				<HookFormField
					control={control}
					name='phone'
					component={InputField}
					label={t('phone')}
					type='text'
					placeholder={t('enterPhoneNumber')}
					size='large'
				/>
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

export default EditUserForm

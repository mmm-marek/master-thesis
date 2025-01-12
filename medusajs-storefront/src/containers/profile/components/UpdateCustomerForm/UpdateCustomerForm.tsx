import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import Modal from '@/atoms/Modal/Modal'
import HookFormField from '@/components/HookFormField'
import useUpdateCustomer from '@/hooks/customer/useUpdateCustomer'
import { UpdateCustomerFormSchema } from '@/schemas/updateCustomerSchemas'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './UpdateCustomerFormStyles'
import { UpdateCustomerFormFields } from './UpdateCustomerFormTypes'

type UpdateCustomerFormProps = {
	open: boolean
	defaultValues: UpdateCustomerFormFields
	onClose: () => void
}

const UpdateCustomerForm = ({ defaultValues, open, onClose }: UpdateCustomerFormProps) => {
	const t = useTranslations('containers.profile')

	const { mutate: updateCustomer } = useUpdateCustomer()

	const {
		control,
		reset,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<UpdateCustomerFormFields>({
		mode: 'onChange',
		resolver: zodResolver(UpdateCustomerFormSchema),
		defaultValues
	})

	const handleFormSubmit = async (data: UpdateCustomerFormFields) => {
		updateCustomer(
			{
				first_name: data.firstName,
				last_name: data.lastName,
				email: data.email
			},
			{
				onSuccess: () => {
					onClose()
				}
			}
		)
	}

	const handleClose = () => {
		reset(defaultValues)
		onClose()
	}

	return (
		<Modal isOpen={open} onOpenChange={handleClose} isDismissable>
			<SC.Form onSubmitCapture={handleSubmit(handleFormSubmit)}>
				<HookFormField label={t('name')} placeholder={t('firstNamePlaceholder')} component={InputField} control={control} name='firstName' required />
				<HookFormField label={t('name')} placeholder={t('lastNamePlaceholder')} component={InputField} control={control} name='lastName' required />
				<HookFormField label={t('email')} placeholder={t('emailPlaceholder')} component={InputField} control={control} name='email' required />
				<Button variant='primary' size='large' type='submit' isDisabled={isSubmitting} isPending={isSubmitting}>
					{t('submitButton')}
				</Button>
			</SC.Form>
		</Modal>
	)
}

export default UpdateCustomerForm

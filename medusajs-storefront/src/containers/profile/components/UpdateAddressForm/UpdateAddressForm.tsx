import { Modal } from 'antd'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import HookFormField from '@/components/HookFormField'
import useUpdateCustomer from '@/hooks/customer/useUpdateCustomer'
import { UpdateAddressFormSchema } from '@/schemas/updateAddressSchemas'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './UpdateAddressFormStyles'
import { UpdateAddressFormFields } from './UpdateAddressFormTypes'

type UpdateBillingAddressFormProps = {
	open: boolean
	onClose: () => void
	defaultValues: UpdateAddressFormFields
}

const UpdateBillingAddressForm = ({ defaultValues, open, onClose }: UpdateBillingAddressFormProps) => {
	const t = useTranslations('containers.profile')

	const { mutate: updateCustomer } = useUpdateCustomer()

	const {
		control,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<UpdateAddressFormFields>({
		mode: 'onChange',
		resolver: zodResolver(UpdateAddressFormSchema),
		defaultValues
	})

	const handleFormSubmit = async (data: UpdateAddressFormFields) => {
		updateCustomer(
			{
				billing_address: {
					address_1: data.address1,
					address_2: data.address2,
					city: data.city,
					country_code: data.countryCode,
					postal_code: data.postalCode,
					company: data.company
				}
			},
			{
				onSuccess: () => {
					onClose()
				}
			}
		)
	}

	return (
		<Modal open={open} onCancel={onClose} footer={null}>
			<SC.Form onSubmitCapture={handleSubmit(handleFormSubmit)}>
				<HookFormField label={t('address1')} placeholder={t('enterAddress1')} component={InputField} control={control} name='address1' size='large' />
				<HookFormField label={t('address2')} placeholder={t('enterAddress2')} component={InputField} control={control} name='address2' size='large' />
				<HookFormField label={t('city')} placeholder={t('enterCity')} component={InputField} control={control} name='city' size='large' />
				<HookFormField
					label={t('countryCode')}
					placeholder={t('enterCountryCode')}
					component={InputField}
					control={control}
					name='countryCode'
					size='large'
				/>
				<HookFormField
					label={t('postalCode')}
					placeholder={t('enterPostalCode')}
					component={InputField}
					control={control}
					name='postalCode'
					size='large'
				/>
				<HookFormField label={t('company')} placeholder={t('enterCompany')} component={InputField} control={control} name='company' size='large' />
				<Button type='primary' size='large' htmlType='submit' block disabled={isSubmitting} loading={isSubmitting}>
					{t('submitButton')}
				</Button>
			</SC.Form>
		</Modal>
	)
}

export default UpdateBillingAddressForm

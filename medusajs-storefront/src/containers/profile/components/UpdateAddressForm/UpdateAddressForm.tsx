import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import Modal from '@/atoms/Modal/Modal'
import HookFormField from '@/components/HookFormField'
import useUpdateCustomer from '@/hooks/customer/useUpdateCustomer'
import { UpdateAddressFormFields, useUpdateAddressFormSchema } from '@/schemas/updateAddressSchemas'

import * as SC from './UpdateAddressFormStyles'

type UpdateBillingAddressFormProps = {
	open: boolean
	onClose: () => void
	defaultValues: UpdateAddressFormFields
}

const UpdateBillingAddressForm = ({ defaultValues, open, onClose }: UpdateBillingAddressFormProps) => {
	const schema = useUpdateAddressFormSchema()
	const t = useTranslations('containers.profile')

	const { mutate: updateCustomer } = useUpdateCustomer()

	const {
		control,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<UpdateAddressFormFields>({
		mode: 'onChange',
		resolver: zodResolver(schema),
		defaultValues
	})

	const handleBillingAddressFormSubmit = (data: UpdateAddressFormFields) => {
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
		<Modal isOpen={open} onOpenChange={onClose} isDismissable>
			<SC.Form onSubmitCapture={handleSubmit(handleBillingAddressFormSubmit)}>
				<HookFormField label={t('address1')} placeholder={t('enterAddress1')} component={InputField} control={control} name='address1' />
				<HookFormField label={t('address2')} placeholder={t('enterAddress2')} component={InputField} control={control} name='address2' />
				<HookFormField label={t('city')} placeholder={t('enterCity')} component={InputField} control={control} name='city' />
				<HookFormField label={t('countryCode')} placeholder={t('enterCountryCode')} component={InputField} control={control} name='countryCode' />
				<HookFormField label={t('postalCode')} placeholder={t('enterPostalCode')} component={InputField} control={control} name='postalCode' />
				<HookFormField label={t('company')} placeholder={t('enterCompany')} component={InputField} control={control} name='company' />
				<Button variant='primary' size='large' type='submit' isDisabled={isSubmitting} isPending={isSubmitting}>
					{t('submitButton')}
				</Button>
			</SC.Form>
		</Modal>
	)
}

export default UpdateBillingAddressForm

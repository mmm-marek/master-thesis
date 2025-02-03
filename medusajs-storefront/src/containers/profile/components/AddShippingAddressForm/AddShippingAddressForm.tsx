import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import Modal from '@/atoms/Modal/Modal'
import HookFormField from '@/components/HookFormField'
import useAddShippingAddress from '@/hooks/customer/useAddShippingAddress'
import useCustomerProfile from '@/hooks/customer/useCustomerProfile'
import { AddShippingAddressFormFields, useAddShippingAddressFormSchema } from '@/schemas/addShippingAddressSchemas'

import * as SC from './AddShippingAddressFormStyles'

type AddShippingAddressFormProps = {
	open: boolean
	onClose: () => void
}

const AddShippingAddressForm = ({ open, onClose }: AddShippingAddressFormProps) => {
	const t = useTranslations('containers.profile')
	const schema = useAddShippingAddressFormSchema()

	const { mutate: addShippingAddress } = useAddShippingAddress()
	const { data: customer } = useCustomerProfile()

	const {
		control,
		reset,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<AddShippingAddressFormFields>({
		mode: 'onChange',
		resolver: zodResolver(schema),
		defaultValues: {
			address1: '',
			address2: '',
			city: '',
			countryCode: '',
			postalCode: ''
		}
	})

	const handleFormSubmit = (data: AddShippingAddressFormFields) => {
		addShippingAddress(
			{
				address: {
					address_1: data.address1,
					address_2: data.address2,
					city: data.city,
					country_code: data.countryCode,
					postal_code: data.postalCode,
					company: data.company,
					first_name: customer?.first_name ?? '',
					last_name: customer?.last_name ?? '',
					phone: customer?.phone ?? '',
					province: '',
					metadata: {}
				}
			},
			{
				onSuccess: () => {
					reset()
					onClose()
				}
			}
		)
	}

	return (
		<Modal isOpen={open} onOpenChange={onClose} isDismissable>
			<SC.Form onSubmitCapture={handleSubmit(handleFormSubmit)}>
				<HookFormField label={t('address1')} placeholder={t('enterAddress1')} component={InputField} control={control} name='address1' required />
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

export default AddShippingAddressForm

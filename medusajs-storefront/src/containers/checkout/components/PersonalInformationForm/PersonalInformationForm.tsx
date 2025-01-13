import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import HookFormField from '@/components/HookFormField'
import useCustomerProfile from '@/hooks/customer/useCustomerProfile'
import { useStore } from '@/providers/StoreProvider'
import { PersonalInformationFormSchema } from '@/schemas/personalInformationSchemas'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './PersonalInformationFormStyles'
import { PersonalInformationFormFields } from './PersonalInformationFormTypes'

type PersonalInformationProps = {
	onSubmitted: () => void
}

const PersonalInformationForm = ({ onSubmitted }: PersonalInformationProps) => {
	const t = useTranslations('containers.checkout')
	const { data: customer } = useCustomerProfile()

	const { updateShippingAddress, updateCheckoutEmail, cart } = useStore()

	const {
		control,
		reset,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<PersonalInformationFormFields>({
		mode: 'onChange',
		resolver: zodResolver(PersonalInformationFormSchema),
		defaultValues: {
			firstName: cart?.shipping_address?.first_name ?? customer?.first_name ?? '',
			lastName: cart?.shipping_address?.last_name ?? customer?.last_name ?? '',
			email: cart?.email ?? customer?.email ?? '',
			phone: cart?.shipping_address?.phone ?? customer?.phone ?? ''
		}
	})

	useEffect(() => {
		reset({
			firstName: cart?.shipping_address?.first_name ?? customer?.first_name ?? '',
			lastName: cart?.shipping_address?.last_name ?? customer?.last_name ?? '',
			email: cart?.email ?? customer?.email ?? '',
			phone: cart?.shipping_address?.phone ?? customer?.phone ?? ''
		})
	}, [cart, customer, reset])

	const handleFormSubmit = (data: PersonalInformationFormFields) => {
		updateShippingAddress(
			{
				first_name: data.firstName,
				last_name: data.lastName,
				phone: data.phone
			},
			{
				onSuccess: () => {
					updateCheckoutEmail(data.email)
					onSubmitted()
				}
			}
		)
	}

	return (
		<SC.Form onSubmitCapture={handleSubmit(handleFormSubmit)}>
			<HookFormField label={t('name')} placeholder={t('firstNamePlaceholder')} component={InputField} control={control} name='firstName' required />
			<HookFormField label={t('surname')} placeholder={t('lastNamePlaceholder')} component={InputField} control={control} name='lastName' required />
			<HookFormField label={t('email')} placeholder={t('emailPlaceholder')} component={InputField} control={control} name='email' required />
			<HookFormField label={t('phone')} placeholder={t('phonePlaceholder')} component={InputField} control={control} name='phone' required />
			<Button variant='primary' size='large' type='submit' isDisabled={isSubmitting} isPending={isSubmitting}>
				{t('submitButton')}
			</Button>
		</SC.Form>
	)
}

export default PersonalInformationForm

import { useTranslations } from 'next-intl'
import { UseFormReset, useForm } from 'react-hook-form'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import HookFormField from '@/components/HookFormField'
import { AddCheckoutShippingFormSchema } from '@/schemas/addCheckoutBillingSchemas'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './AddCheckoutBillingFormStyles'
import { AddCheckoutShippingFormFields } from './AddCheckoutBillingFormTypes'

type Props = {
	onSubmit: (data: AddCheckoutShippingFormFields, reset: UseFormReset<AddCheckoutShippingFormFields>) => Promise<void>
}

const AddCheckoutBillingForm = (props: Props) => {
	const { onSubmit } = props
	const t = useTranslations('containers.checkout')

	const {
		control,
		reset,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<AddCheckoutShippingFormFields>({
		mode: 'onChange',
		resolver: zodResolver(AddCheckoutShippingFormSchema),
		defaultValues: {
			address1: '',
			address2: '',
			city: '',
			countryCode: '',
			postalCode: ''
		}
	})

	const handleFormSubmit = async (data: AddCheckoutShippingFormFields) => {
		await onSubmit({ ...data }, reset)
	}

	return (
		<SC.Form onSubmitCapture={handleSubmit(handleFormSubmit)}>
			<HookFormField
				label={t('address1')}
				placeholder={t('enterAddress1')}
				component={InputField}
				control={control}
				name='address1'
				size='large'
				required
			/>
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
			<HookFormField label={t('postalCode')} placeholder={t('enterPostalCode')} component={InputField} control={control} name='postalCode' size='large' />
			<HookFormField label={t('company')} placeholder={t('enterCompany')} component={InputField} control={control} name='company' size='large' />
			<Button type='primary' size='large' htmlType='submit' block disabled={isSubmitting} loading={isSubmitting}>
				{t('submitButton')}
			</Button>
		</SC.Form>
	)
}

export default AddCheckoutBillingForm

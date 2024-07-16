import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import HookFormField from '@/components/HookFormField'
import { useStore } from '@/providers/StoreProvider'
import { AddCheckoutBillingFormSchema } from '@/schemas/addCheckoutBillingSchemas'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './AddCheckoutBillingFormStyles'
import { AddCheckoutBillingFormFields } from './AddCheckoutBillingFormTypes'

type AddCheckoutBillingFormProps = {
	onSubmitted: () => void
}

const AddCheckoutBillingForm = ({ onSubmitted }: AddCheckoutBillingFormProps) => {
	const t = useTranslations('containers.checkout')

	const { updateBillingAddress } = useStore()

	const {
		control,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<AddCheckoutBillingFormFields>({
		mode: 'onChange',
		resolver: zodResolver(AddCheckoutBillingFormSchema),
		defaultValues: {
			address1: '',
			address2: '',
			city: '',
			countryCode: '',
			postalCode: ''
		}
	})

	const handleFormSubmit = async (data: AddCheckoutBillingFormFields) => {
		updateBillingAddress(
			{
				address_1: data.address1,
				address_2: data.address2,
				city: data.city,
				company: data.company,
				country_code: data.countryCode,
				postal_code: data.postalCode
			},
			{
				onSuccess: () => {
					onSubmitted()
				}
			}
		)
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

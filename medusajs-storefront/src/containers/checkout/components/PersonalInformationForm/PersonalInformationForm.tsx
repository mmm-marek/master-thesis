import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import HookFormField from '@/components/HookFormField'
import { PersonalInformationFormSchema } from '@/schemas/personalInformationSchemas'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './PersonalInformationFormStyles'
import { PersonalInformationFormFields } from './PersonalInformationFormTypes'

type PersonalInformationProps = {
	onSubmitted: () => void
}

const PersonalInformationForm = ({ onSubmitted }: PersonalInformationProps) => {
	const t = useTranslations('components.personalInformationForm')

	const {
		control,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<PersonalInformationFormFields>({
		mode: 'onChange',
		resolver: zodResolver(PersonalInformationFormSchema),
		defaultValues: { name: '' }
	})

	const handleFormSubmit = (data: PersonalInformationFormFields) => {
		onSubmitted()
	}

	return (
		<SC.Form onSubmitCapture={handleSubmit(handleFormSubmit)}>
			<HookFormField
				label={t('nameLabel')}
				placeholder={t('namePlaceholder')}
				component={InputField}
				control={control}
				name='name'
				size='large'
				required
			/>
			<Button type='primary' size='large' htmlType='submit' block disabled={isSubmitting} loading={isSubmitting}>
				{t('submitButton')}
			</Button>
		</SC.Form>
	)
}

export default PersonalInformationForm

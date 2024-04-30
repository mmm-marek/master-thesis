import { Button, Form } from 'antd'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import InputField from '@/atoms/InputField/InputField'
import InputPasswordField from '@/atoms/InputPasswordField/InputPasswordField'
import HookFormField from '@/components/HookFormField'
import ConfirmAccountInviteFormSchema from '@/schemas/pages/confirmAccountInvite'
import { zodResolver } from '@/utils/zodResolver'

export type ConfirmAccountInviteFormFields = z.infer<typeof ConfirmAccountInviteFormSchema>

type Props = {
	onSubmit: SubmitHandler<ConfirmAccountInviteFormFields>
}

const ConfirmAccountInviteForm = (props: Props) => {
	const { onSubmit } = props
	const t = useTranslations('containers.confirmAccountInvite.confirmAccountInviteForm')

	const {
		control,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<ConfirmAccountInviteFormFields>({
		mode: 'onChange',
		resolver: zodResolver(ConfirmAccountInviteFormSchema)
	})

	return (
		<Form onSubmitCapture={handleSubmit(onSubmit)}>
			<HookFormField control={control} name='name' component={InputField} label={t('firstName')} type='text' required />
			<HookFormField control={control} name='surName' component={InputField} label={t('lastName')} type='text' required />
			<HookFormField control={control} name='phone' component={InputField} label={t('phone')} type='text' required />
			<HookFormField
				control={control}
				name='password'
				component={InputPasswordField}
				label={t('password')}
				type='password'
				required
				autoComplete='new-password'
			/>
			<HookFormField
				control={control}
				name='confirmPassword'
				component={InputPasswordField}
				label={t('repeatPassword')}
				type='password'
				required
				autoComplete='new-password'
			/>
			<Button type='primary' size='large' htmlType='submit' disabled={isSubmitting} loading={isSubmitting}>
				{t('confirmAccount')}
			</Button>
		</Form>
	)
}

export default ConfirmAccountInviteForm

import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import IconCornerUpLeft from '@/assets/icons/corner-up-left.svg'
import IconKey from '@/assets/icons/key.svg'
import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import HookFormField from '@/components/HookFormField'
import ForgottenPasswordFormSchema from '@/schemas/pages/forgottenPassword'
import { PATHS } from '@/utils/enums'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './ForgottenPasswordFormStyles'

export type ForgottenPasswordFormFields = z.infer<typeof ForgottenPasswordFormSchema>

type Props = {
	onSubmit: SubmitHandler<ForgottenPasswordFormFields>
}

const ForgottenPasswordForm = (props: Props) => {
	const { onSubmit } = props
	const t = useTranslations('containers.forgottenPassword.forgottenPasswordForm')
	const router = useRouter()

	const {
		control,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<ForgottenPasswordFormFields>({
		mode: 'onChange',
		resolver: zodResolver(ForgottenPasswordFormSchema),
		defaultValues: { email: '' }
	})

	return (
		<SC.Form layout='vertical' onSubmitCapture={handleSubmit(onSubmit)}>
			<SC.FieldsWrapper>
				<SC.Header>
					<SC.Circle>
						<IconKey />
					</SC.Circle>
					<SC.Title>{t('forgotPassword')}?</SC.Title>
					<SC.Info>{t('resetInstructions')}</SC.Info>
				</SC.Header>
				<HookFormField
					control={control}
					name='email'
					component={InputField}
					label={t('email')}
					type='email'
					required
					size='large'
					placeholder={t('enterEmail')}
					autoComplete='username'
				/>
			</SC.FieldsWrapper>
			<Button type='primary' size='large' htmlType='submit' block disabled={isSubmitting} loading={isSubmitting}>
				{t('resetPassword')}
			</Button>
			<SC.BackBtnWrapper>
				<Button
					type='link'
					onClick={() => {
						router.push(PATHS.LOGIN)
					}}
					size='small'
					icon={<IconCornerUpLeft />}
					noBackground
					disabled={isSubmitting}
					loading={isSubmitting}
				>
					<span>{t('backButton')}</span>
				</Button>
			</SC.BackBtnWrapper>
		</SC.Form>
	)
}

export default ForgottenPasswordForm

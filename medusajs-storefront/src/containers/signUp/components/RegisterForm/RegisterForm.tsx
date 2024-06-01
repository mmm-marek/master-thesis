import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import InputPasswordField from '@/atoms/InputPasswordField/InputPasswordField'
import HookFormField from '@/components/HookFormField'
import SignUpFormSchema from '@/schemas/pages/signUp'
import { PATHS } from '@/utils/enums'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './RegisterFormStyles'

export type SignUpFormFields = z.infer<typeof SignUpFormSchema>

const SignUpForm = () => {
	const onSubmit = () => {}
	const t = useTranslations('containers.signUp.signUpForm')
	const router = useRouter()

	const {
		control,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<SignUpFormFields>({
		mode: 'onChange',
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: { email: '', password: '', repeatPassword: '' }
	})

	return (
		<SC.Form layout='vertical' onSubmitCapture={handleSubmit(onSubmit)}>
			<SC.FieldsWrapper>
				<SC.Header>
					<SC.Title>{t('welcome')}</SC.Title>
					<SC.InfoMd>{t('registerInfo')}</SC.InfoMd>
				</SC.Header>
				<HookFormField
					control={control}
					name='email'
					component={InputField}
					label={t('email')}
					type='email'
					required
					placeholder={t('enterEmail')}
					size='large'
				/>
				<HookFormField
					control={control}
					name='password'
					component={InputPasswordField}
					label={t('password')}
					type='password'
					required
					placeholder={t('enterPassword')}
					size='large'
				/>
				<HookFormField
					control={control}
					name='repeatPassword'
					component={InputPasswordField}
					label={t('repeatPassword')}
					type='password'
					required
					placeholder={t('enterPassword')}
					size='large'
				/>
			</SC.FieldsWrapper>
			<Button type='primary' size='large' htmlType='submit' disabled={isSubmitting} loading={isSubmitting} block>
				{t('signUp')}
			</Button>
			<SC.ForgotPasswordBtnWrapper>
				<Button
					type='text'
					onClick={() => {
						router.push(PATHS.FORGOTTEN_PASSWORD)
					}}
					size='small'
					disabled={isSubmitting}
					loading={isSubmitting}
				>
					<span>{t('forgotPassword')}</span>
				</Button>
			</SC.ForgotPasswordBtnWrapper>
		</SC.Form>
	)
}

export default SignUpForm

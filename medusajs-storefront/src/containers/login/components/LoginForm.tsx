import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import InputPasswordField from '@/atoms/InputPasswordField/InputPasswordField'
import HookFormField from '@/components/HookFormField'
import LoginFormSchema from '@/schemas/pages/login'
import { PATHS } from '@/utils/enums'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './LoginFormStyles'

export type LoginFormFields = z.infer<typeof LoginFormSchema>

const LoginForm = () => {
	const onSubmit = () => {}
	const t = useTranslations('containers.login.loginForm')
	const router = useRouter()

	const {
		control,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<LoginFormFields>({
		mode: 'onChange',
		resolver: zodResolver(LoginFormSchema),
		defaultValues: { email: '', password: '' }
	})

	return (
		<SC.Form layout='vertical' onSubmitCapture={handleSubmit(onSubmit)}>
			<SC.FieldsWrapper>
				<SC.Header>
					<SC.Logo width={206} height={20} />
					<SC.Title>{t('welcomeBack')}</SC.Title>
					<SC.InfoMd>{t('welcomeBackEnterDetails')}</SC.InfoMd>
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
					autoComplete='username'
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
					autoComplete='current-password'
				/>
			</SC.FieldsWrapper>
			<Button type='primary' size='large' htmlType='submit' disabled={isSubmitting} loading={isSubmitting} block>
				{t('logIn')}
			</Button>
			<SC.InfoLink>
				<SC.InfoSm>{t('noAccount')}</SC.InfoSm>
				<Button
					type='text'
					onClick={() => {
						router.push(PATHS.SIGN_UP)
					}}
					size='small'
					disabled={isSubmitting}
					loading={isSubmitting}
				>
					<span>{t('signUp')}</span>
				</Button>
			</SC.InfoLink>
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

export default LoginForm

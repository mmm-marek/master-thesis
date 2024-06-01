import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import FacebookIcon from '@/assets/icons/social/facebook.svg'
import GoogleIcon from '@/assets/icons/social/google.svg'
import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import InputPasswordField from '@/atoms/InputPasswordField/InputPasswordField'
import HookFormField from '@/components/HookFormField'
import envConfig from '@/config'
import useLoginCustomer from '@/hooks/auth/useLoginCustomer'
import LoginFormSchema from '@/schemas/pages/login'
import { PATHS } from '@/utils/enums'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './LoginFormStyles'

export type LoginFormFields = z.infer<typeof LoginFormSchema>

const LoginForm = () => {
	const router = useRouter()
	const t = useTranslations('containers.login.loginForm')
	const { mutate: loginUser } = useLoginCustomer()

	const {
		control,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<LoginFormFields>({
		mode: 'onChange',
		resolver: zodResolver(LoginFormSchema),
		defaultValues: { email: '', password: '' }
	})

	const onSubmit = (data: LoginFormFields) => {
		loginUser(data, {
			onSuccess: () => {
				router.push(`/${PATHS.PROFILE}`)
			}
		})
	}

	return (
		<SC.Form layout='vertical' onSubmitCapture={handleSubmit(onSubmit)}>
			<SC.FieldsWrapper>
				<SC.Header>
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
			<SC.SocialButtonsWrapper>
				<Button type='default' href={`${envConfig.apiUrl}/admin/auth/google`} size='large' block htmlType='button'>
					<GoogleIcon />
				</Button>
				<Button type='default' href={`${envConfig.apiUrl}/admin/auth/facebook`} size='large' block htmlType='button'>
					<FacebookIcon />
				</Button>
			</SC.SocialButtonsWrapper>
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

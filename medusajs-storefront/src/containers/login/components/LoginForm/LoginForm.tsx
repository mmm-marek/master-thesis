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
import useLoginCustomer from '@/hooks/customer/useLoginCustomer'
import LoginFormSchema from '@/schemas/pages/login'
import { PATHS } from '@/utils/enums'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './LoginFormStyles'

export type LoginFormFields = z.infer<typeof LoginFormSchema>

const LoginForm = () => {
	const router = useRouter()
	const t = useTranslations('containers.login')
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
				router.push(PATHS.PROFILE)
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
			<Button variant='primary' size='large' type='submit' isDisabled={isSubmitting} isPending={isSubmitting}>
				{t('logIn')}
			</Button>
			<SC.SocialButtonsWrapper>
				<Button variant='secondary' onPress={() => router.push(`${envConfig.apiUrl}/admin/auth/google`)} size='large' type='button'>
					<GoogleIcon />
				</Button>
				<Button variant='secondary' onPress={() => router.push(`${envConfig.apiUrl}/admin/auth/facebook`)} size='large' type='button'>
					<FacebookIcon />
				</Button>
			</SC.SocialButtonsWrapper>
		</SC.Form>
	)
}

export default LoginForm

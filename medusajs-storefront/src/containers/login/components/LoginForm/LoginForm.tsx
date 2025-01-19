import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import FacebookIcon from '@/assets/icons/social/facebook.svg'
import GoogleIcon from '@/assets/icons/social/google.svg'
import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import HookFormField from '@/components/HookFormField'
import envConfig from '@/config'
import useLoginCustomer from '@/hooks/customer/useLoginCustomer'
import { LoginFormFields, useLoginFormSchema } from '@/schemas/pages/login'
import { PATHS } from '@/utils/enums'

import * as SC from './LoginFormStyles'

const LoginForm = () => {
	const router = useRouter()
	const t = useTranslations('containers.login')
	const loginFormSchema = useLoginFormSchema()
	const { mutate: loginUser } = useLoginCustomer()

	const {
		control,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<LoginFormFields>({
		mode: 'onChange',
		resolver: zodResolver(loginFormSchema),
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
		<SC.Form onSubmitCapture={handleSubmit(onSubmit)}>
			<SC.Header>
				<SC.Title>{t('welcomeBack')}</SC.Title>
				<SC.InfoMd>{t('welcomeBackEnterDetails')}</SC.InfoMd>
			</SC.Header>
			<SC.FieldsWrapper>
				<HookFormField
					control={control}
					name='email'
					component={InputField}
					label={t('email')}
					type='email'
					required
					placeholder={t('enterEmail')}
					autoComplete='username'
				/>
				<HookFormField
					control={control}
					name='password'
					component={InputField}
					label={t('password')}
					type='password'
					required
					placeholder={t('enterPassword')}
					autoComplete='current-password'
				/>
			</SC.FieldsWrapper>
			<Button variant='primary' size='large' type='submit' isDisabled={isSubmitting} isPending={isSubmitting} isFullWidth>
				{t('logIn')}
			</Button>
			<SC.SocialButtonsWrapper>
				<Button variant='secondary' onPress={() => router.push(`${envConfig.apiUrl}/admin/auth/google`)} size='large' type='button' isFullWidth>
					<GoogleIcon />
				</Button>
				<Button variant='secondary' onPress={() => router.push(`${envConfig.apiUrl}/admin/auth/facebook`)} size='large' type='button' isFullWidth>
					<FacebookIcon />
				</Button>
			</SC.SocialButtonsWrapper>
		</SC.Form>
	)
}

export default LoginForm

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import FacebookIcon from '@/assets/icons/social/facebook.svg'
import GoogleIcon from '@/assets/icons/social/google.svg'
import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import HookFormField from '@/components/HookFormField'
import envConfig from '@/config'
import useCheckEmailExists from '@/hooks/customer/useCheckEmailExists'
import useCustomerSignUp from '@/hooks/customer/useCustomerSignUp'
import SignUpFormSchema from '@/schemas/pages/signUp'
import { PATHS } from '@/utils/enums'

import * as SC from './SignUpFormStyles'

export type SignUpFormFields = z.infer<typeof SignUpFormSchema>

const SignUpForm = () => {
	const router = useRouter()
	const t = useTranslations('containers.signUp')

	const { mutate: createCustomer } = useCustomerSignUp()
	const { mutate: checkEmailExists } = useCheckEmailExists()

	const {
		control,
		formState: { isSubmitting },
		handleSubmit,
		setError
	} = useForm<SignUpFormFields>({
		mode: 'onChange',
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: { email: '', password: '', repeatPassword: '' }
	})

	const onSubmit = (data: SignUpFormFields) => {
		checkEmailExists(data.email, {
			onSuccess: (exists) => {
				if (exists) {
					setError(
						'email',
						{
							type: 'email',
							message: t('emailAlreadyExists')
						},
						{ shouldFocus: true }
					)
				} else {
					createCustomer(
						{
							email: data.email,
							first_name: data.firstName,
							last_name: data.lastName,
							password: data.password
						},
						{
							onSuccess: () => {
								router.push(PATHS.HOME)
							}
						}
					)
				}
			}
		})
	}

	return (
		<SC.Form onSubmitCapture={handleSubmit(onSubmit)}>
			<SC.FieldsWrapper>
				<SC.Header>
					<SC.Title>{t('welcome')}</SC.Title>
					<SC.InfoMd>{t('registerInfo')}</SC.InfoMd>
				</SC.Header>
				<HookFormField control={control} name='email' component={InputField} label={t('email')} type='email' required placeholder={t('enterEmail')} />
				<HookFormField
					control={control}
					name='firstName'
					component={InputField}
					label={t('firstName')}
					type='text'
					required
					placeholder={t('enterFirstName')}
				/>
				<HookFormField
					control={control}
					name='lastName'
					component={InputField}
					label={t('lastName')}
					type='text'
					required
					placeholder={t('enterLastName')}
				/>
				<HookFormField
					control={control}
					name='password'
					component={InputField}
					label={t('password')}
					type='password'
					required
					placeholder={t('enterPassword')}
				/>
				<HookFormField
					control={control}
					name='repeatPassword'
					component={InputField}
					label={t('repeatPassword')}
					type='password'
					required
					placeholder={t('enterPassword')}
				/>
			</SC.FieldsWrapper>
			<Button variant='primary' size='large' type='submit' isDisabled={isSubmitting} isPending={isSubmitting} isFullWidth>
				{t('signUp')}
			</Button>
			<SC.SocialButtonsWrapper>
				<Button variant='secondary' onPress={() => router.push(`${envConfig.apiUrl}/admin/auth/google`)} size='large' type='button' isFullWidth>
					<GoogleIcon />
					{t('googleSignup')}
				</Button>
				<Button variant='secondary' onPress={() => router.push(`${envConfig.apiUrl}/admin/auth/facebook`)} size='large' type='button' isFullWidth>
					<FacebookIcon />
					{t('facebookSignup')}
				</Button>
			</SC.SocialButtonsWrapper>
		</SC.Form>
	)
}

export default SignUpForm

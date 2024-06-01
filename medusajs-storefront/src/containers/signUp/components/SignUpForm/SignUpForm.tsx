import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import InputPasswordField from '@/atoms/InputPasswordField/InputPasswordField'
import HookFormField from '@/components/HookFormField'
import useCheckEmailExists from '@/hooks/auth/useCheckEmailExists'
import useCustomerSignUp from '@/hooks/auth/useCustomerSignUp'
import SignUpFormSchema from '@/schemas/pages/signUp'
import { PATHS } from '@/utils/enums'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './SignUpFormStyles'

export type SignUpFormFields = z.infer<typeof SignUpFormSchema>

const SignUpForm = () => {
	const router = useRouter()
	const t = useTranslations('containers.signUp.signUpForm')

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
								router.push('/')
							}
						}
					)
				}
			}
		})
	}

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
					name='firstName'
					component={InputField}
					label={t('firstName')}
					type='text'
					required
					placeholder={t('enterFirstName')}
					size='large'
				/>
				<HookFormField
					control={control}
					name='lastName'
					component={InputField}
					label={t('lastName')}
					type='text'
					required
					placeholder={t('enterLastName')}
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

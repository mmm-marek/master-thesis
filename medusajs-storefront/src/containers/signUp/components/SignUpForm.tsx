import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import InputPasswordField from '@/atoms/InputPasswordField/InputPasswordField'
import HookFormField from '@/components/HookFormField'
import SignUpFormSchema from '@/schemas/pages/signUp'
import { PATHS } from '@/utils/enums'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './SignUpFormSyles'

export type SignUpFormFields = z.infer<typeof SignUpFormSchema>

type Props = {
	onSubmit: SubmitHandler<SignUpFormFields>
}

const SignUpForm = (props: Props) => {
	const { onSubmit } = props
	const t = useTranslations('containers.signUp.signUpForm')
	const router = useRouter()

	const {
		control,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<SignUpFormFields>({
		mode: 'onChange',
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: { email: '', password: '' }
	})

	return (
		<SC.Form layout='vertical' onSubmitCapture={handleSubmit(onSubmit)}>
			<SC.FieldsWrapper>
				<SC.Header>
					<SC.Logo width={206} height={20} />
					<SC.Title>{t('createAccount')}</SC.Title>
					<SC.InfoSm>{t('startFreeTrial')}</SC.InfoSm>
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
					placeholder={t('enterPasssword')}
					size='large'
					autoComplete='new-password'
				/>
			</SC.FieldsWrapper>
			<Button type='primary' size='large' htmlType='submit' disabled={isSubmitting} loading={isSubmitting} block>
				{t('createAccount')}
			</Button>
			<SC.InfoLink>
				<SC.InfoMd>{t('alreadyHaveAccount')}?</SC.InfoMd>
				<Button
					type='text'
					onClick={() => {
						router.push(PATHS.LOGIN)
					}}
					size='small'
					disabled={isSubmitting}
					loading={isSubmitting}
				>
					<span>{t('logIn')}</span>
				</Button>
			</SC.InfoLink>
		</SC.Form>
	)
}

export default SignUpForm

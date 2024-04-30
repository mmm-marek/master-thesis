import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import IconCornerUpLeft from '@/assets/icons/corner-up-left.svg'
import IconKey from '@/assets/icons/key.svg'
import Button from '@/atoms/Button/Button'
import InputPasswordField from '@/atoms/InputPasswordField/InputPasswordField'
import HookFormField from '@/components/HookFormField'
import ResetPasswordFormSchema from '@/schemas/pages/resetPassword'
import { PATHS } from '@/utils/enums'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './ResetPasswordFormStyles'

export type ResetPasswordFormFields = z.infer<typeof ResetPasswordFormSchema>

type Props = {
	onSubmit: SubmitHandler<ResetPasswordFormFields>
}

const ResetPasswordForm = (props: Props) => {
	const { onSubmit } = props
	const t = useTranslations('containers.resetPassword.resetPasswordForm')
	const router = useRouter()

	const {
		control,
		formState: { isSubmitting, touchedFields },
		handleSubmit,
		watch,
		trigger
	} = useForm<ResetPasswordFormFields>({
		mode: 'onChange',
		resolver: zodResolver(ResetPasswordFormSchema),
		defaultValues: { password: '', confirmPassword: '' }
	})

	const password = watch('password')
	const passwordRetype = watch('confirmPassword')

	useEffect(() => {
		if (password && passwordRetype && touchedFields.confirmPassword) {
			trigger('confirmPassword')
		}
	}, [trigger, password, passwordRetype, touchedFields.confirmPassword])

	return (
		<SC.Form layout='vertical' onSubmitCapture={handleSubmit(onSubmit)}>
			<SC.FieldsWrapper>
				<SC.Header>
					<SC.Circle>
						<IconKey />
					</SC.Circle>
					<SC.Title>{t('newPassword')}</SC.Title>
					<SC.InfoMd>{t('selectDifferentPassword')}</SC.InfoMd>
				</SC.Header>
				<HookFormField
					control={control}
					name='password'
					component={InputPasswordField}
					label={t('password')}
					type='password'
					required
					size='large'
					placeholder={t('enterPassword')}
					autoComplete='new-password'
				/>
				<HookFormField
					control={control}
					name='confirmPassword'
					component={InputPasswordField}
					label={t('repeatPassword')}
					type='password'
					required
					size='large'
					placeholder={t('enterPassword')}
					autoComplete='new-password'
				/>
			</SC.FieldsWrapper>
			<Button type='primary' size='large' htmlType='submit' block disabled={isSubmitting} loading={isSubmitting}>
				{t('resetPassword')}{' '}
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

export default ResetPasswordForm

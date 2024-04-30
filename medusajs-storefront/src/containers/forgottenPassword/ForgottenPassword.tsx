import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

import ForgottenPasswordForm, { ForgottenPasswordFormFields } from '@/containers/forgottenPassword/components/ForgottenPasswordForm'
import useResetPasswordRequest from '@/hooks/auth/useResetPasswordRequest'

import ForgottenPasswordSuccess from './components/ForgottenPasswordSuccess'

const ForgottenPassword = () => {
	const [isRequested, setIsRequested] = useState<boolean>(false)

	const requestResetPassword = useResetPasswordRequest()

	const onSubmit: SubmitHandler<ForgottenPasswordFormFields> = async (data) => {
		try {
			await requestResetPassword.mutateAsync(data)
			setIsRequested(true)
		} catch (error) {
			/* eslint-disable no-console */
			console.error(error)
		}
	}

	useEffect(() => {
		if (!isRequested && requestResetPassword.isSuccess) {
			setIsRequested(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestResetPassword.isSuccess])

	return (
		<div>
			{isRequested ? (
				<ForgottenPasswordSuccess
					isLoading={requestResetPassword.isPending}
					onSubmit={() => onSubmit({ email: requestResetPassword.variables?.email || '' })}
					email={requestResetPassword.variables?.email}
				/>
			) : (
				<ForgottenPasswordForm onSubmit={onSubmit} />
			)}
		</div>
	)
}

export default ForgottenPassword

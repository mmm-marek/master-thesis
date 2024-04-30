import dayjs from 'dayjs'
import decode from 'jwt-decode'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'

import ResetPasswordForm, { ResetPasswordFormFields } from '@/containers/resetPassword/components/ResetPasswordForm'
import useResetPassword from '@/hooks/auth/useResetPassword'
import useGetAuthUser from '@/hooks/user/useGetAuthUser'
import { IDecodedToken } from '@/types/interfaces'
import { TOKEN_AUDIENCE } from '@/utils/enums'

import ResetPasswordSuccess from './components/ResetPasswordSuccess'

type Props = {
	token?: string
}

const ResetPassword = (props: Props) => {
	const { token } = props
	const resetPassword = useResetPassword()
	const router = useRouter()

	// load auth user
	useGetAuthUser(resetPassword.data)

	useEffect(() => {
		if (isEmpty(token)) {
			router.push('/403')
		}
		if (typeof token === 'string') {
			try {
				const decodedToken = decode<IDecodedToken>(token)

				const expiryDate = dayjs.unix(decodedToken.exp)
				const currentDate = dayjs()

				const hasCorrectAudience = decodedToken.aud === TOKEN_AUDIENCE.FORGOTTEN_PASSWORD

				if (expiryDate.isBefore(currentDate) || !hasCorrectAudience) {
					router.push('/403')
				}
			} catch {
				router.push('/403')
			}
		}
	}, [token, router])

	const onSubmit: SubmitHandler<ResetPasswordFormFields> = async (data) => {
		if (!token) {
			return
		}
		try {
			await resetPassword.mutateAsync({ confirmPassword: data.confirmPassword, password: data.password, token })
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
	}

	return resetPassword.isSuccess ? <ResetPasswordSuccess /> : <ResetPasswordForm onSubmit={onSubmit} />
}

export default ResetPassword

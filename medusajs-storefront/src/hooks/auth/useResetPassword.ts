import { useMutation } from '@tanstack/react-query'

import { setAccessToken, setRefreshToken } from '@/utils/auth'
import { postReq } from '@/utils/request'

type ResetPassword = {
	password: string
	confirmPassword: string
	token: string
}

const usePasswordRequest = () => {
	return useMutation({
		mutationFn: async ({ password, confirmPassword, token }: ResetPassword): Promise<string> => {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}

			const { data } = await postReq('/api/v1/auth/reset-password', null, { password, confirmPassword }, config)
			setAccessToken(data.accessToken)
			setRefreshToken(data.refreshToken)

			return data.user.id
		}
	})
}

export default usePasswordRequest

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { Paths } from '@/types/api'
import { setAccessToken, setRefreshToken } from '@/utils/auth'
import { GRECAPTCHA_ACTIONS } from '@/utils/enums'
import recaptchaVerify from '@/utils/reCaptcha'
import { postReq } from '@/utils/request'

type UserLoginPayload = Paths.PostApiV1AuthLogin.Responses.$200 | null

const useLogin = () => {
	const router = useRouter()

	return useMutation({
		mutationFn: async (input: { email: string; password: string }): Promise<UserLoginPayload> => {
			const token = await recaptchaVerify(GRECAPTCHA_ACTIONS.LOGIN)

			const { data } = await postReq('/api/v1/auth/login', null, { ...input, token })

			setAccessToken(data.accessToken)
			setRefreshToken(data.refreshToken)

			return data
		},
		onSuccess: () => {
			router.push({
				pathname: ''
			})
		}
	})
}

export default useLogin

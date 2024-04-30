import { useMutation } from '@tanstack/react-query'

import { Paths } from '@/types/api'
import { GRECAPTCHA_ACTIONS } from '@/utils/enums'
import recaptchaVerify from '@/utils/reCaptcha'
import { postReq } from '@/utils/request'

type ResetPasswordRequest = {
	email: Paths.PostApiV1AuthResetPasswordRequest.RequestBody['email']
}

const useResetPasswordRequest = () => {
	return useMutation({
		mutationFn: async ({ email }: ResetPasswordRequest) => {
			const token = await recaptchaVerify(GRECAPTCHA_ACTIONS.FORGOTTEN_PASSWORD)

			await postReq('/api/v1/auth/reset-password-request', null, { email, token })
		}
	})
}

export default useResetPasswordRequest

import { useMutation } from '@tanstack/react-query'

import { SignUpFormFields } from '@/containers/signUp/components/SignUpForm'
import { GRECAPTCHA_ACTIONS } from '@/utils/enums'
import recaptchaVerify from '@/utils/reCaptcha'
import { postReq } from '@/utils/request'

// TODO: payload
type UserRegisterPayload = any | null

const useSignUp = () => {
	return useMutation({
		mutationFn: async (body: SignUpFormFields) => {
			const token = await recaptchaVerify(GRECAPTCHA_ACTIONS.SIGN_UP)

			// TODO: zatial neexistujuca URL
			const { data } = await postReq('/api/v1/auth/registration' as any, null, { ...body, token } as UserRegisterPayload)

			return data.user.id
		}
	})
}
export default useSignUp

import * as z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'
import { serializeValidationMessage } from '@/utils/globalZod'
import { passwordRegEx } from '@/utils/regex'

const LoginFormSchema = z
	.object({
		password: z
			.string()
			.regex(passwordRegEx, serializeValidationMessage('containers.resetPassword.resetPasswordFormSchema.emailValidationRule'))
			.max(VALIDATION_MAX_LENGTH.LENGTH_255),
		confirmPassword: z
			.string()
			.regex(passwordRegEx, serializeValidationMessage('containers.resetPassword.resetPasswordFormSchema.emailValidationRule'))
			.max(VALIDATION_MAX_LENGTH.LENGTH_255)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: serializeValidationMessage('containers.resetPassword.resetPasswordFormSchema.passwordsDontMatch'),
		path: ['confirmPassword'] // path of error
	})

export default LoginFormSchema

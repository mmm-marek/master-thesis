import * as z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'
import { serializeValidationMessage } from '@/utils/globalZod'
import { passwordRegEx } from '@/utils/regex'

const ConfirmAccountInviteFormSchema = z
	.object({
		name: z.string().nonempty().max(VALIDATION_MAX_LENGTH.LENGTH_255),
		surName: z.string().nonempty().max(VALIDATION_MAX_LENGTH.LENGTH_255),
		phone: z.string().max(VALIDATION_MAX_LENGTH.LENGTH_255),
		password: z
			.string()
			.regex(passwordRegEx, serializeValidationMessage('containers.confirmAccountInvite.confirmAccountInviteFormSchema.emailValidationRule'))
			.nonempty()
			.max(VALIDATION_MAX_LENGTH.LENGTH_255),
		confirmPassword: z
			.string()
			.regex(passwordRegEx, serializeValidationMessage('containers.confirmAccountInvite.confirmAccountInviteFormSchema.emailValidationRule'))
			.nonempty()
			.max(VALIDATION_MAX_LENGTH.LENGTH_255)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: serializeValidationMessage('containers.confirmAccountInvite.confirmAccountInviteFormSchema.passwordsDoNotMatch'),
		path: ['confirmPassword'] // path of error
	})

export default ConfirmAccountInviteFormSchema

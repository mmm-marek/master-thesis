import * as z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'

const SignUpFormSchema = z
	.object({
		email: z.string().min(1).email().max(VALIDATION_MAX_LENGTH.LENGTH_255),
		firstName: z.string().min(1).max(VALIDATION_MAX_LENGTH.LENGTH_255),
		lastName: z.string().min(1).max(VALIDATION_MAX_LENGTH.LENGTH_255),
		password: z.string().min(1).max(VALIDATION_MAX_LENGTH.LENGTH_255),
		repeatPassword: z.string().min(1).max(VALIDATION_MAX_LENGTH.LENGTH_255)
	})
	.refine((data) => data.password === data.repeatPassword, {
		message: "Passwords don't match",
		path: ['repeatPassword'] // path of error
	})

export default SignUpFormSchema

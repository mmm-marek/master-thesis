import * as z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'

const SignUpFormSchema = z
	.object({
		email: z.string().nonempty().email().max(VALIDATION_MAX_LENGTH.LENGTH_255),
		password: z.string().nonempty().max(VALIDATION_MAX_LENGTH.LENGTH_255),
		repeatPassword: z.string().nonempty().max(VALIDATION_MAX_LENGTH.LENGTH_255)
	})
	.refine((data) => data.password === data.repeatPassword, {
		message: "Passwords don't match",
		path: ['repeatPassword'] // path of error
	})

export default SignUpFormSchema

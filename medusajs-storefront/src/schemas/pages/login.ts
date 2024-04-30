// eslint-disable-next-line import/no-extraneous-dependencies
import * as z from 'zod'

// utils
import { VALIDATION_MAX_LENGTH } from '@/utils/enums'

const LoginFormSchema = z.object({
	email: z.string().nonempty().email().max(VALIDATION_MAX_LENGTH.LENGTH_255),
	password: z.string().nonempty().max(VALIDATION_MAX_LENGTH.LENGTH_255)
})

export default LoginFormSchema

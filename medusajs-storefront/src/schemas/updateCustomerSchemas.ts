import * as z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'
import { stringConstraint } from '@/utils/globalZod'

export const UpdateCustomerFormSchema = z.object({
	firstName: stringConstraint(VALIDATION_MAX_LENGTH.LENGTH_255, true),
	lastName: stringConstraint(VALIDATION_MAX_LENGTH.LENGTH_255, true),
	email: z.string().email().trim().min(1).max(VALIDATION_MAX_LENGTH.LENGTH_255)
})

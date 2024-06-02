import * as z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'

export const UpdateAddressFormSchema = z.object({
	address1: z.string().max(VALIDATION_MAX_LENGTH.LENGTH_255).optional(),
	address2: z.string().max(VALIDATION_MAX_LENGTH.LENGTH_255).optional(),
	city: z.string().max(VALIDATION_MAX_LENGTH.LENGTH_255).optional(),
	countryCode: z.string().min(1).max(VALIDATION_MAX_LENGTH.LENGTH_2).optional(),
	postalCode: z.string().min(1).max(VALIDATION_MAX_LENGTH.LENGTH_5).optional(),
	company: z.string().max(VALIDATION_MAX_LENGTH.LENGTH_255).optional()
})

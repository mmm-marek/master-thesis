import * as z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'

export const AddCheckoutShippingFormSchema = z.object({
	address1: z.string().min(1).max(VALIDATION_MAX_LENGTH.LENGTH_255),
	address2: z.string().min(1).max(VALIDATION_MAX_LENGTH.LENGTH_255),
	city: z.string().min(1).max(VALIDATION_MAX_LENGTH.LENGTH_255),
	countryCode: z.string().min(1).max(VALIDATION_MAX_LENGTH.LENGTH_2),
	postalCode: z.string().min(1).max(VALIDATION_MAX_LENGTH.LENGTH_5),
	company: z.string().max(VALIDATION_MAX_LENGTH.LENGTH_255)
})

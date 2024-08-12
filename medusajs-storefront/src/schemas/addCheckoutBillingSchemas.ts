import * as z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'

export const AddCheckoutBillingFormSchema = z.object({
	address1: z.string().min(1).max(VALIDATION_MAX_LENGTH.LENGTH_255),
	address2: z.string().min(1).max(VALIDATION_MAX_LENGTH.LENGTH_255).optional(),
	city: z.string().min(1).max(VALIDATION_MAX_LENGTH.LENGTH_255),
	countryCode: z.string().min(1).max(VALIDATION_MAX_LENGTH.LENGTH_2),
	postalCode: z
		.string()
		.min(1)
		.refine(
			(value) => {
				const trimmedValue = value.replace(/\s/g, '')
				return trimmedValue.length === 5
			},
			{
				message: 'validation.postalCode'
			}
		),
	company: z.string().max(VALIDATION_MAX_LENGTH.LENGTH_255).optional()
})

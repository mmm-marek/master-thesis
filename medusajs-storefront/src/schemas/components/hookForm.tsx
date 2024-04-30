// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod'

// utils
import { VALIDATION_MAX_LENGTH } from '@/utils/enums'

export const HookFormSchema = z.object({
	longText: z.string().max(VALIDATION_MAX_LENGTH.LENGTH_500).nullish(),
	email: z.string().nonempty().email().trim().max(VALIDATION_MAX_LENGTH.LENGTH_20),
	allowMarketingConsents: z.boolean().nullish(),
	permissions: z.string().array().nonempty(),
	socialLinks: z.string().array().nullish(),
	currency: z.string().length(3).nullish(),
	time: z.string().nullish(),
	type: z.string().nullish(),
	test: z.string().array().nullish(),
	number: z.number().max(VALIDATION_MAX_LENGTH.LENGTH_50).nullish()
})

export type HookFormData = z.infer<typeof HookFormSchema>

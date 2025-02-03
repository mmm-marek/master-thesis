import { useTranslations } from 'next-intl'
import z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'

export const useAddCheckoutBillingFormSchema = () => {
	const t = useTranslations('utils.globalZod')

	return z.object({
		address1: z
			.string()
			.min(1, t('requiredField'))
			.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 })),
		address2: z
			.string()
			.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 }))
			.optional(),
		city: z
			.string()
			.min(1, t('requiredField'))
			.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 })),
		countryCode: z
			.string()
			.min(1, t('requiredField'))
			.max(VALIDATION_MAX_LENGTH.LENGTH_2, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_2 })),
		postalCode: z
			.string()
			.min(1, t('requiredField'))
			.refine(
				(value) => {
					const trimmedValue = value.replace(/\s/g, '')
					return trimmedValue.length === 5
				},
				{
					message: t('wrongInputFormat')
				}
			),
		company: z
			.string()
			.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 }))
			.optional()
	})
}

export type AddCheckoutBillingFormFields = z.infer<ReturnType<typeof useAddCheckoutBillingFormSchema>>

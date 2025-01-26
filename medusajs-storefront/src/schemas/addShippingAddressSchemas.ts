import { useTranslations } from 'next-intl'
import z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'

export const useAddShippingAddressFormSchema = () => {
	const t = useTranslations('utils.globalZod')

	return z.object({
		address1: z
			.string()
			.min(1, t('requiredField'))
			.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 })),
		address2: z
			.string()
			.min(1, t('requiredField'))
			.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 })),
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
			.max(VALIDATION_MAX_LENGTH.LENGTH_5, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_5 })),
		company: z.string().max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 }))
	})
}

export type AddShippingAddressFormFields = z.infer<ReturnType<typeof useAddShippingAddressFormSchema>>

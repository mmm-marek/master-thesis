import { useTranslations } from 'next-intl'
import z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'

export const useUpdateCustomerFormSchema = () => {
	const t = useTranslations('utils.globalZod')

	return z.object({
		firstName: z
			.string()
			.min(1, t('firstNameRequired'))
			.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 })),
		lastName: z
			.string()
			.min(1, t('lastNameRequired'))
			.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 })),
		email: z
			.string()
			.min(1, t('emailRequired'))
			.email(t('wrongEmailFormat'))
			.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 }))
	})
}

export type UpdateCustomerFormFields = z.infer<ReturnType<typeof useUpdateCustomerFormSchema>>

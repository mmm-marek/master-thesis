import { useTranslations } from 'next-intl'
import z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'

export const useDiscountCodeFormSchema = () => {
	const t = useTranslations('utils.globalZod')

	return z.object({
		discountCode: z
			.string()
			.min(1, t('requiredField'))
			.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 }))
	})
}

export type DiscountCodeFormFields = z.infer<ReturnType<typeof useDiscountCodeFormSchema>>

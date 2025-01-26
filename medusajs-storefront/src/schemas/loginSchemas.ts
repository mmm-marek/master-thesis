import { useTranslations } from 'next-intl'
import z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'

export const useLoginFormSchema = () => {
	const t = useTranslations('utils.globalZod')

	return z.object({
		email: z
			.string()
			.min(0)
			.email(t('wrongEmailFormat'))
			.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 })),
		password: z
			.string()
			.min(0)
			.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 }))
	})
}

export type LoginFormFields = z.infer<ReturnType<typeof useLoginFormSchema>>

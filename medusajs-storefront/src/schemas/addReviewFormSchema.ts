import { useTranslations } from 'next-intl'
import z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'

export const useAddReviewFormSchema = () => {
	const t = useTranslations('utils.globalZod')

	return z.object({
		title: z
			.string()
			.min(1, t('titleRequired'))
			.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 })),
		content: z
			.string()
			.min(1, t('contentRequired'))
			.max(1000, t('maxCharacters', { max: 1000 }))
	})
}

export type AddReviewFormFields = z.infer<ReturnType<typeof useAddReviewFormSchema>>

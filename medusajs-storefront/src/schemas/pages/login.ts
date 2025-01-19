import { useTranslations } from 'next-intl'
import * as z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'

export const useLoginFormSchema = () => {
	const t = useTranslations('containers.login')

	return z.object({
		email: z.string().min(0).email(t('wrongEmail')).max(VALIDATION_MAX_LENGTH.LENGTH_255, t('wrongEmail')),
		password: z.string().min(0).max(VALIDATION_MAX_LENGTH.LENGTH_255)
	})
}

export type LoginFormFields = z.infer<ReturnType<typeof useLoginFormSchema>>

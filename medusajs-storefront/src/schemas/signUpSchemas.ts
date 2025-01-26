import { useTranslations } from 'next-intl'
import z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'

export const useSignUpFormSchema = () => {
	const t = useTranslations('utils.globalZod')

	return z
		.object({
			email: z
				.string()
				.min(1, t('emailRequired'))
				.email(t('wrongEmailFormat'))
				.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 })),
			firstName: z
				.string()
				.min(1, t('firstNameRequired'))
				.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 })),
			lastName: z
				.string()
				.min(1, t('lastNameRequired'))
				.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 })),
			password: z
				.string()
				.min(1, t('passwordRequired'))
				.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 })),
			repeatPassword: z
				.string()
				.min(1, t('repeatPasswordRequired'))
				.max(VALIDATION_MAX_LENGTH.LENGTH_255, t('maxCharacters', { max: VALIDATION_MAX_LENGTH.LENGTH_255 }))
		})
		.refine((data) => data.password === data.repeatPassword, {
			message: t('passwordsDontMatch'),
			path: ['repeatPassword']
		})
}

export type SignUpFormFields = z.infer<ReturnType<typeof useSignUpFormSchema>>

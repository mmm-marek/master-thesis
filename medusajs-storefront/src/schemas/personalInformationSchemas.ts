import * as z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'
import { stringConstraint } from '@/utils/globalZod'

export const PersonalInformationFormSchema = z.object({
	firstName: stringConstraint(VALIDATION_MAX_LENGTH.LENGTH_255, true),
	lastName: stringConstraint(VALIDATION_MAX_LENGTH.LENGTH_255, true),
	phone: stringConstraint(VALIDATION_MAX_LENGTH.LENGTH_255, true),
	email: stringConstraint(VALIDATION_MAX_LENGTH.LENGTH_255, true)
})

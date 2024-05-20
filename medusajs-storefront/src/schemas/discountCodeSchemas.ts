import * as z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'
import { stringConstraint } from '@/utils/globalZod'

export const DiscountCodeFormSchema = z.object({
	discountCode: stringConstraint(VALIDATION_MAX_LENGTH.LENGTH_255, true)
})

import { z } from 'zod'

import { DiscountCodeFormSchema } from '@/schemas/discountCodeSchemas'

export type DiscountCodeFormFields = z.infer<typeof DiscountCodeFormSchema>

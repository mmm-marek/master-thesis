import { z } from 'zod'

import { UpdateBillingAddressFormSchema } from '@/schemas/updateBillingAddressSchemas'

export type UpdateBillingAddressFormFields = z.infer<typeof UpdateBillingAddressFormSchema>

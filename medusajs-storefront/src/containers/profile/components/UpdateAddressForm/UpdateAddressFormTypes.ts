import { z } from 'zod'

import { UpdateBillingAddressFormSchema } from '@/schemas/updateAddressSchemas'

export type UpdateBillingAddressFormFields = z.infer<typeof UpdateBillingAddressFormSchema>

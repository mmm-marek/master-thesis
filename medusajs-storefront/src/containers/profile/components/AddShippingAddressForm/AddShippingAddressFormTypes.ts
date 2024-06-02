import { z } from 'zod'

import { AddShippingAddressFormSchema } from '@/schemas/addShippingAddressSchemas'

export type AddShippingAddressFormFields = z.infer<typeof AddShippingAddressFormSchema>

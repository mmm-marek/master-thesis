import { z } from 'zod'

import { AddCheckoutShippingFormSchema } from '@/schemas/addCheckoutBillingSchemas'

export type AddCheckoutShippingFormFields = z.infer<typeof AddCheckoutShippingFormSchema>

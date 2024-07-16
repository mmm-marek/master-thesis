import { z } from 'zod'

import { AddCheckoutBillingFormSchema } from '@/schemas/addCheckoutBillingSchemas'

export type AddCheckoutBillingFormFields = z.infer<typeof AddCheckoutBillingFormSchema>

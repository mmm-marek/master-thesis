import { z } from 'zod'

import { UpdateCustomerFormSchema } from '@/schemas/updateCustomerSchemas'

export type UpdateCustomerFormFields = z.infer<typeof UpdateCustomerFormSchema>

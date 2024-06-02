import { z } from 'zod'

import { UpdateAddressFormSchema } from '@/schemas/updateAddressSchemas'

export type UpdateAddressFormFields = z.infer<typeof UpdateAddressFormSchema>

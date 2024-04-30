import { z } from 'zod'

import { editUserFormSchema } from '@/schemas/pages/users'

export type EditUserFormFields = z.infer<typeof editUserFormSchema>

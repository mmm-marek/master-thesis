import { z } from 'zod'

import { PersonalInformationFormSchema } from '@/schemas/personalInformationSchemas'

export type PersonalInformationFormFields = z.infer<typeof PersonalInformationFormSchema>

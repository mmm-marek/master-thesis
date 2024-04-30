import { z } from 'zod'

import { inviteUserFormSchema } from '@/schemas/pages/users'

export type InviteUserFormFields = z.infer<typeof inviteUserFormSchema>

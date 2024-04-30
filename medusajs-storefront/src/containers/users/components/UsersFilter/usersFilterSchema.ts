import * as z from 'zod'

import { USER_ROLE, USER_STATE, VALIDATION_MAX_LENGTH } from '@/utils/enums'
import { stringConstraint } from '@/utils/globalZod'

const UsersFilterSchema = z.object({
	permission: z.nativeEnum(USER_ROLE).nullish(),
	state: z.nativeEnum(USER_STATE).nullish(),
	search: stringConstraint(VALIDATION_MAX_LENGTH.LENGTH_255)
})

export default UsersFilterSchema

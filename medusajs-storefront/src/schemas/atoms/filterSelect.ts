import z from 'zod'

import { VALIDATION_MAX_LENGTH } from '@/utils/enums'
import { stringConstraint } from '@/utils/globalZod'

export default z.object({
	search: stringConstraint(VALIDATION_MAX_LENGTH.LENGTH_255, false)
})

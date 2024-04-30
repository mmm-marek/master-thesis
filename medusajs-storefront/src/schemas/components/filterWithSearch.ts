import z from 'zod'

import { q } from '../constraints'

export const filterWithSearchSchema = z.object({
	search: q.string()
})

import z from 'zod'

import { q } from '@/schemas/constraints'
import { ORDER_DIRECTION, PAGINATION } from '@/utils/enums'

export const PaginationSchema = z.object({
	// TODO: zrefactorovat na q.enum() ked sa implemntuje
	orderDirection: z.nativeEnum(ORDER_DIRECTION).optional().catch(undefined),
	limit: q.number(PAGINATION.limit).optional(),
	page: q.number(PAGINATION.page).optional(),
	search: q.string({ optional: true, nullable: false }, (base) => base.min(3))
})

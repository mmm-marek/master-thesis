// relevant schema for query-params page
import z from 'zod'

import { q } from '../constraints'
import { PAGE_SIZE_OPTIONS, USER_ROLE, VALIDATION_MAX_LENGTH } from '@/utils/enums'
import { emailConstraint, stringConstraint } from '@/utils/globalZod'

export const inviteUserFormSchema = z.object({
	email: emailConstraint,
	permission: z.nativeEnum(USER_ROLE)
})

export const editUserFormSchema = z.object({
	name: stringConstraint(VALIDATION_MAX_LENGTH.LENGTH_255),
	surname: stringConstraint(VALIDATION_MAX_LENGTH.LENGTH_255),
	permission: z.nativeEnum(USER_ROLE),
	phone: stringConstraint(VALIDATION_MAX_LENGTH.LENGTH_255)
})

export const usersQueryParamsSchema = z.object({
	search: q.string({ nullable: false, optional: true }),
	permission: z.enum(['ADMINISTRATOR', 'USER']).optional(),
	state: z.enum(['ACTIVE', 'PENDING_INVITATION']).optional(),
	limit: q.number(PAGE_SIZE_OPTIONS[0]), // 20
	page: q.number(1)
})

export type UsersQueryParamsType = z.infer<typeof usersQueryParamsSchema>

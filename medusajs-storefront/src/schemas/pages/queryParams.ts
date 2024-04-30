// relevant schema for query-params page
import z from 'zod'

import { q } from '../constraints'

export const schema = z.object({
	name: q.string(),
	surname: q.string('Doe'),
	search: q.string({ optional: true, nullable: false }, (base) => base.min(3)),
	age: q.number(20),
	rating: q.number({ optional: false, nullable: true }),
	score: q.number({ optional: false, nullable: false }),
	summary: q.number({ optional: true, nullable: false }),
	enabled: q.boolean(true),
	siblings: q.numberArray({ optional: false, nullable: true }),
	parents: q.numberArray([1, 2]),
	nicknames: q.stringArray({ optional: false, nullable: true }),
	roles: q.stringArray(['user'])
})

export type SchemaType = z.infer<typeof schema>

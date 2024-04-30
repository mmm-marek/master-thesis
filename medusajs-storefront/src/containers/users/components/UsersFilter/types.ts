import { Paths } from '@/types/api'

export type UsersQueryParams = Paths.GetApiV1Users.QueryParameters

export type UsersFilterFields = {
	search: UsersQueryParams['search']
	permission: UsersQueryParams['permission']
	state: UsersQueryParams['state']
}

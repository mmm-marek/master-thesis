import { useQuery } from '@tanstack/react-query'

import { Paths } from '@/types/api'
import { QUERY_KEYS } from '@/utils/enums'
import { getReq } from '@/utils/request'

export type GetUsersPayload = Paths.GetApiV1Users.Responses.$200 | null

const useGetUsers = (queryParams: Paths.GetApiV1Users.QueryParameters) => {
	return useQuery({
		queryKey: [
			QUERY_KEYS.API_GET_USERS,
			{
				...queryParams
			}
		],
		queryFn: async (): Promise<GetUsersPayload> => {
			const { data } = await getReq('/api/v1/users/', { ...queryParams })
			return data
		},
		keepPreviousData: true
	})
}

export default useGetUsers

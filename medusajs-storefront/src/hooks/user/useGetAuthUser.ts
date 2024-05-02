import { useQuery } from '@tanstack/react-query'

import { Paths } from '@/types/api'
import { QUERY_CACHE, QUERY_KEYS } from '@/utils/enums'
import { getReq } from '@/utils/request'

type GetUserPayload = Paths.GetApiV1UsersUserId.Responses.$200 | null

const useGetAuthUser = (userID?: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.API_GET_AUTH_USER, userID],
		queryFn: async (): Promise<GetUserPayload> => {
			if (!userID) return null

			const { data } = await getReq('/api/v1/users/{userID}', { userID })
			return data
		},
		enabled: !!userID,
		cacheTime: QUERY_CACHE.CACHE_TIME,
		staleTime: QUERY_CACHE.STALE_TIME
	})
}

export default useGetAuthUser

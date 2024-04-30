import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Paths } from '@/types/api'
import { QUERY_KEYS } from '@/utils/enums'
import { patchReq } from '@/utils/request'

type UpdateUser = {
	userID: string
	reqBody: Paths.PatchApiV1UsersUserId.RequestBody
}

const useUpdateUser = (isAuthUser = false) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ userID, reqBody }: UpdateUser) => {
			await patchReq('/api/v1/users/{userID}', { userID }, { ...reqBody })
		},
		onSuccess: async () => {
			if (isAuthUser) {
				// if updated auth user profile is success then invalidate cache
				await queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.API_GET_AUTH_USER]
				})
			}
		}
	})
}

export default useUpdateUser

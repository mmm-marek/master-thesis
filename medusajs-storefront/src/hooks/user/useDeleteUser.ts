import { useMutation } from '@tanstack/react-query'

import { Paths } from '@/types/api'
import { deleteReq } from '@/utils/request'

const useDeleteUser = () => {
	return useMutation({
		mutationFn: async (pathParam: Paths.DeleteApiV1UsersUserId.PathParameters) => {
			await deleteReq('/api/v1/users/{userID}', pathParam)
		}
	})
}

export default useDeleteUser

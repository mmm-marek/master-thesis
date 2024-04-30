import { useMutation } from '@tanstack/react-query'

import { Paths } from '@/types/api'
import { postReq } from '@/utils/request'

const useCreateUser = () => {
	return useMutation({
		mutationFn: async (reqBody: Paths.PostApiV1Users.RequestBody) => {
			await postReq('/api/v1/users/', null, reqBody)
		}
	})
}

export default useCreateUser

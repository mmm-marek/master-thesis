import { useMutation } from '@tanstack/react-query'

import { getRefreshToken, hasRefreshToken, isLoggedIn, setAccessToken, setRefreshToken } from '@/utils/auth'
import { postReq } from '@/utils/request'

const useRefreshToken = () => {
	return useMutation({
		mutationFn: async () => {
			if (isLoggedIn() && hasRefreshToken()) {
				const { data } = await postReq('/api/v1/auth/refresh-token', null, { refreshToken: getRefreshToken() as string })
				setAccessToken(data.accessToken)
				setRefreshToken(data.refreshToken)
			}
		}
	})
}

export default useRefreshToken

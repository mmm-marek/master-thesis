import { useMutation } from '@tanstack/react-query'

import { Paths } from '@/types/api'
import { setAccessToken, setRefreshToken } from '@/utils/auth'
import { postReq } from '@/utils/request'

type ConfirmUserPayload = Paths.PostApiV1UsersConfirm.Responses.$200 | null

type ConfirmAccountInvite = {
	body: Paths.PostApiV1UsersConfirm.RequestBody
	token: string
}

const useConfirmAccountInvite = () => {
	return useMutation({
		mutationFn: async ({ body, token }: ConfirmAccountInvite): Promise<ConfirmUserPayload> => {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}

			const { data } = await postReq('/api/v1/users/confirm', null, { ...body }, config)
			setAccessToken(data.accessToken)
			setRefreshToken(data.refreshToken)

			return data
		}
	})
}

export default useConfirmAccountInvite

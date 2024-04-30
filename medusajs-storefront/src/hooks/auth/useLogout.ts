import { useMutation } from '@tanstack/react-query'
import Router from 'next/router'

import { clearAccessToken, clearRefreshToken } from '@/utils/auth'
import { NOTIFICATION_TYPE, PATHS } from '@/utils/enums'
import { postReq } from '@/utils/request'

export const logOutUser = async (skipRedirect?: boolean, notification?: boolean) => {
	try {
		await postReq('/api/v1/auth/logout', null, undefined, undefined, notification ? NOTIFICATION_TYPE.NOTIFICATION : false)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error)
	} finally {
		clearAccessToken()
		clearRefreshToken()

		if (!skipRedirect) {
			await Router.push({
				pathname: PATHS.LOGIN
			})
		}
	}
}

const useLogout = () => {
	return useMutation({
		mutationFn: async () => {
			await logOutUser(false, false)
		}
	})
}

export default useLogout

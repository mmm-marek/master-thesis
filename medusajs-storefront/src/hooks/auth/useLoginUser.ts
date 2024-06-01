import { useMutation } from '@tanstack/react-query'

import { MSG_TYPE } from '@/utils/enums'
import { showNotifications } from '@/utils/helpers'
import { medusa } from '@/utils/medusaHelpers'

type LoginUserMutationArgs = Parameters<typeof medusa.auth.authenticate>[0]

const useLoginUser = () => {
	return useMutation({
		mutationFn: ({ email, password }: LoginUserMutationArgs) => {
			return medusa.auth.authenticate({
				email,
				password
			})
		},
		onError: () => {
			showNotifications([{ type: MSG_TYPE.ERROR, message: 'Login failed' }])
		}
	})
}

export default useLoginUser

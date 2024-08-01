import { useMutation } from '@tanstack/react-query'

import { MSG_TYPE } from '@/utils/enums'
import { showNotifications } from '@/utils/helpers'
import { medusa } from '@/utils/medusaHelpers'

type LoginUserMutationArgs = Parameters<typeof medusa.auth.authenticate>[0]

const useLoginCustomer = () => {
	return useMutation({
		mutationFn: async ({ email, password }: LoginUserMutationArgs) => {
			const res = await medusa.auth.authenticate({
				email,
				password
			})
			return res.customer
		},
		onError: () => {
			showNotifications([{ type: MSG_TYPE.ERROR, message: 'Login failed' }])
		}
	})
}

export default useLoginCustomer

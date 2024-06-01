import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

const useLogoutCustomer = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async () => {
			const res = await medusa.auth.deleteSession()
			return res
		},
		onSuccess: () => {
			queryClient.setQueryData([QUERY_KEYS.API_GET_CUSTOMER_PROFILE], () => null)
		}
	})
}

export default useLogoutCustomer

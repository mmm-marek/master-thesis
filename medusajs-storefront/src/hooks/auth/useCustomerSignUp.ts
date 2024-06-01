import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

type CustomerSignUpData = Parameters<typeof medusa.customers.create>[0]

const useCustomerSignUp = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: CustomerSignUpData) => {
			const { customer } = await medusa.customers.create(data)
			return customer
		},
		onSuccess: (customer) => {
			queryClient.setQueryData([QUERY_KEYS.API_GET_CUSTOMER_PROFILE], () => customer)
		}
	})
}

export default useCustomerSignUp

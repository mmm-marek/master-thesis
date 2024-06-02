import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

type UpdateCustomerData = Parameters<typeof medusa.customers.update>[0]

const useUpdateCustomer = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: UpdateCustomerData) => {
			const { customer } = await medusa.customers.update(data)
			return { customer }
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.API_GET_CUSTOMER_PROFILE] })
		}
	})
}

export default useUpdateCustomer

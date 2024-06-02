import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

type DeleteShippingAddressData = Parameters<typeof medusa.customers.addresses.deleteAddress>[0]

const useDeleteShippingAddress = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: DeleteShippingAddressData) => {
			const { customer } = await medusa.customers.addresses.deleteAddress(data)
			return { customer }
		},
		onSuccess: (customer) => {
			queryClient.setQueryData([QUERY_KEYS.API_GET_CUSTOMER_PROFILE], () => customer)
		}
	})
}

export default useDeleteShippingAddress

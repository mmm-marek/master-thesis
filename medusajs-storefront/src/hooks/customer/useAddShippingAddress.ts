import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

type AddShippingAddressData = Parameters<typeof medusa.customers.addresses.addAddress>[0]

const useAddShippingAddress = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: AddShippingAddressData) => {
			const { customer } = await medusa.customers.addresses.addAddress(data)
			return { customer }
		},
		onSuccess: (customer) => {
			queryClient.setQueryData([QUERY_KEYS.API_GET_CUSTOMER_PROFILE], () => customer)
		}
	})
}

export default useAddShippingAddress

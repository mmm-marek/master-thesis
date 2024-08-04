import { useQuery } from '@tanstack/react-query'

import { QUERY_CACHE, QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

const useCustomerProfile = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.API_GET_CUSTOMER_PROFILE],
		queryFn: async () => {
			const { customer } = await medusa.customers.retrieve({
				expand: 'billing_address,shipping_addresses'
			})
			return customer
		},
		cacheTime: QUERY_CACHE.CACHE_TIME,
		staleTime: QUERY_CACHE.STALE_TIME
	})
}

export default useCustomerProfile

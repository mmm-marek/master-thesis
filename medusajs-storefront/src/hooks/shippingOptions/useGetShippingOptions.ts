import { useQuery } from '@tanstack/react-query'

import { useStore } from '@/providers/StoreProvider'
import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

export const useGetShippingOptions = () => {
	const { cart } = useStore()

	const cartId = cart?.id

	return useQuery({
		queryKey: [QUERY_KEYS.API_GET_SHIPPING_OPTIONS, cartId],
		queryFn: async () => {
			const response = await medusa.shippingOptions.listCartOptions(cartId!)
			return response.shipping_options
		},
		enabled: !!cartId
	})
}

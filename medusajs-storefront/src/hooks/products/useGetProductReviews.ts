import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

type Response = {
	reviews: {
		id: string
		title: string
		user_name: string
		rating: number
		content: string
	}[]
}

const useGetProductReviews = (productID: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.API_GET_PRODUCT_REVIEWS, productID],
		queryFn: async (): Promise<Response> => {
			const response = await medusa.client.request('GET', `/store/products/${productID}/reviews`)
			return response
		}
	})
}

export default useGetProductReviews

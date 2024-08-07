import { useMutation } from '@tanstack/react-query'

import { medusa } from '@/utils/medusaHelpers'

type Review = {
	title: string
	user_name: string
	rating: number
	content: string
}

const usePostProductReview = (productID: string) => {
	return useMutation({
		mutationFn: async (review: Review) => {
			const response = await medusa.client.request('POST', `/store/products/${productID}/reviews`, review)
			return response.data
		}
	})
}

export default usePostProductReview

import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

export const productsQueryKey = [QUERY_KEYS.API_GET_PRODUCTS]

export const getProducts = async () => {
	const { products } = await medusa.products.list()

	return products
}

export const useGetProducts = () => {
	return useQuery({
		queryKey: productsQueryKey,
		queryFn: getProducts
	})
}

export default useGetProducts

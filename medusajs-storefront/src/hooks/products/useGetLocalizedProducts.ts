import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

export const getProductsQueryKey = (regionId?: string) => [QUERY_KEYS.API_GET_LOCALIZED_PRODUCTS, regionId]

export const getProducts = async (regionId?: string) => {
	const { products } = await medusa.products.list()

	console.log(products)
	console.log(regionId)

	return products
}

export const useGetProducts = (regionId?: string) => {
	return useQuery({
		queryKey: getProductsQueryKey(regionId),
		queryFn: async () => getProducts(regionId)
	})
}

export default useGetProducts

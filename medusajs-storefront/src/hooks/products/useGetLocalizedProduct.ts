import { Product } from '@medusajs/medusa'
import { useQuery } from '@tanstack/react-query'

import { useStore } from '@/providers/StoreProvider'
import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

type QueryParams = {
	languageCode?: string
	productId: string
}

export const getLocalizedProductQueryKey = (params: QueryParams) => [QUERY_KEYS.API_GET_LOCALIZED_PRODUCTS, params]

export const getLocalizedProduct = async ({ languageCode, productId }: QueryParams) => {
	const { localizedProduct } = await medusa.client.request('GET', `/store/localized-product/${productId}`, undefined, undefined, {
		'accept-language': languageCode
	})

	return localizedProduct as Product
}

export const useGetLocalizedProduct = (productId: string) => {
	const { getRegion } = useStore()
	const languageCode = getRegion()?.countryCode

	return useQuery({
		queryKey: getLocalizedProductQueryKey({ languageCode, productId }),
		queryFn: async () => getLocalizedProduct({ languageCode, productId })
	})
}

export default useGetLocalizedProduct

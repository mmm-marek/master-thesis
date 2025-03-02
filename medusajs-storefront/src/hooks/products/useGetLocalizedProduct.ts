import { Product } from '@medusajs/medusa'
import { useQuery } from '@tanstack/react-query'

import { useStore } from '@/providers/StoreProvider'
import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

type QueryParams = {
	languageCode?: string
	productHandle: string
}

export const getLocalizedProductQueryKey = (params: QueryParams) => [QUERY_KEYS.API_GET_LOCALIZED_PRODUCTS, params]

export const getLocalizedProduct = async ({ languageCode, productHandle }: QueryParams) => {
	const { localizedProduct } = await medusa.client.request('GET', `/store/localized-product/${productHandle}`, undefined, undefined, {
		'accept-language': languageCode
	})

	return localizedProduct as Product
}

export const useGetLocalizedProduct = (productHandle: string) => {
	const { getRegion } = useStore()
	const languageCode = getRegion()?.countryCode

	return useQuery({
		queryKey: getLocalizedProductQueryKey({ languageCode, productHandle }),
		queryFn: async () => getLocalizedProduct({ languageCode, productHandle })
	})
}

export default useGetLocalizedProduct

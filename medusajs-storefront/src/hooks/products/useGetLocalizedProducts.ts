import { Product } from '@medusajs/medusa'
import { useQuery } from '@tanstack/react-query'

import { useStore } from '@/providers/StoreProvider'
import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

type QueryParams = {
	languageCode?: string
	categoryHandle?: string
}

export const getLocalizedProductsQueryKey = (params: QueryParams) => [QUERY_KEYS.API_GET_LOCALIZED_PRODUCTS, params]

export const getLocalizedProducts = async ({ languageCode, categoryHandle }: QueryParams) => {
	const { localizedProducts } = await medusa.client.request('GET', `/store/localized-product?category_handle=${categoryHandle ?? ''}`, undefined, undefined, {
		'accept-language': languageCode
	})

	return localizedProducts as Product[]
}

export const useGetLocalizedProducts = (categoryHandle?: string) => {
	const { getRegion } = useStore()
	const languageCode = getRegion()?.countryCode

	return useQuery({
		queryKey: getLocalizedProductsQueryKey({ languageCode, categoryHandle }),
		queryFn: async () => getLocalizedProducts({ languageCode, categoryHandle }),
		enabled: !!languageCode
	})
}

export default useGetLocalizedProducts

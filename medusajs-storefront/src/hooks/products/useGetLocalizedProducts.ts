import { PricedProduct } from '@medusajs/medusa/dist/types/pricing'
import { useQuery } from '@tanstack/react-query'

import { LocalizedProduct } from '@/types/types'
import { QUERY_KEYS } from '@/utils/enums'
import { localizeProduct } from '@/utils/localization'
import { medusa } from '@/utils/medusaHelpers'

type QueryParams = {
	regionID?: string
	categoryID?: string[]
}

export const getLocalizedProductsQueryKey = (params: QueryParams) => [QUERY_KEYS.API_GET_LOCALIZED_PRODUCTS, params]

export const getLocalizedProducts = async ({ regionID, categoryID }: QueryParams): Promise<LocalizedProduct<PricedProduct>[]> => {
	const { products } = await medusa.products.list({
		category_id: categoryID
	})

	const localizedProducts = products.map((product) => localizeProduct({ product, regionID }))

	return localizedProducts
}

export const useGetLocalizedProducts = (params: QueryParams) => {
	return useQuery({
		queryKey: getLocalizedProductsQueryKey(params),
		queryFn: async () => getLocalizedProducts(params),
		enabled: !!params.regionID
	})
}

export default useGetLocalizedProducts

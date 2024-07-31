import { PricedProduct } from '@medusajs/medusa/dist/types/pricing'
import { useQuery } from '@tanstack/react-query'

import { LocalizedProduct } from '@/types/interfaces'
import { QUERY_KEYS } from '@/utils/enums'
import { localizeProduct } from '@/utils/localization'
import { medusa } from '@/utils/medusaHelpers'

type QueryParams = {
	handle: string
	regionID?: string
}

export const getLocalizedProductQueryKey = (params: QueryParams) => [QUERY_KEYS.API_GET_LOCALIZED_PRODUCT, params]

export const getLocalizedProduct = async ({ handle, regionID }: QueryParams): Promise<LocalizedProduct<PricedProduct> | undefined> => {
	const { products } = await medusa.products.list({
		handle
	})

	const product = products[0]

	if (!regionID || !product) {
		return undefined
	}

	return localizeProduct({ product, regionID })
}

export const useGetLocalizedProduct = (params: QueryParams) => {
	return useQuery({
		queryKey: getLocalizedProductQueryKey(params),
		queryFn: async () => getLocalizedProduct(params),
		enabled: !!params.regionID
	})
}

export default useGetLocalizedProduct

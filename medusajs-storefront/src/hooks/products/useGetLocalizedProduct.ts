import { useQuery } from '@tanstack/react-query'

import { getProductLocalizationSchema } from '@/schemas/pages/products'
import { LocalizedProduct } from '@/types/interfaces'
import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

type QueryParams = {
	handle: string
	regionID?: string
}

export const getLocalizedProductQueryKey = (params: QueryParams) => [QUERY_KEYS.API_GET_LOCALIZED_PRODUCT, params]

export const getLocalizedProduct = async ({ handle, regionID }: QueryParams): Promise<LocalizedProduct | undefined> => {
	const { products } = await medusa.products.list({
		handle
	})

	const product = products[0]

	if (!regionID || !product) {
		return undefined
	}

	const parsedProduct = getProductLocalizationSchema(product, regionID).safeParse(product)

	if (parsedProduct.success) {
		const regionLocalization = parsedProduct.data.metadata?.localization[regionID]

		return {
			...product,
			// In case region is not localized, return the original product attributes
			localizedTitle: regionLocalization?.title ?? product.title,
			localizedSubtitle: regionLocalization?.subtitle ?? product.subtitle,
			localizedDescription: regionLocalization?.description ?? product.description,
			localizedMaterial: regionLocalization?.material ?? product.material
		}
	}
	return {
		...product,
		localizedTitle: product.title,
		localizedSubtitle: product.subtitle,
		localizedDescription: product.description,
		localizedMaterial: product.material
	}
}

export const useGetLocalizedProduct = (params: QueryParams) => {
	return useQuery({
		queryKey: getLocalizedProductQueryKey(params),
		queryFn: async () => getLocalizedProduct(params),
		enabled: !!params.regionID
	})
}

export default useGetLocalizedProduct

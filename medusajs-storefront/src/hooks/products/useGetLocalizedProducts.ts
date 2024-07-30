import { useQuery } from '@tanstack/react-query'

import { getProductLocalizationSchema } from '@/schemas/localizationSchemas'
import { LocalizedProduct } from '@/types/interfaces'
import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

type QueryParams = {
	regionID?: string
	categoryID?: string[]
}

export const getLocalizedProductsQueryKey = (params: QueryParams) => [QUERY_KEYS.API_GET_LOCALIZED_PRODUCTS, params]

export const getLocalizedProducts = async ({ regionID, categoryID }: QueryParams): Promise<LocalizedProduct[]> => {
	const { products } = await medusa.products.list({
		category_id: categoryID
	})

	if (!regionID) {
		return products.map((product) => ({
			...product,
			localizedTitle: product.title,
			localizedSubtitle: product.subtitle,
			localizedDescription: product.description,
			localizedMaterial: product.material
		}))
	}

	const localizedProducts = products.map((product) => {
		const parsedProduct = getProductLocalizationSchema(product, regionID).safeParse(product)

		if (!parsedProduct.success) {
			return {
				...product,
				localizedTitle: product.title,
				localizedSubtitle: product.subtitle,
				localizedDescription: product.description,
				localizedMaterial: product.material
			}
		}

		const regionLocalization = parsedProduct.data.metadata?.localization[regionID]
		return {
			...product,
			// In case region is not localized, return the original product attributes
			localizedTitle: regionLocalization?.title ?? product.title,
			localizedSubtitle: regionLocalization?.subtitle ?? product.subtitle,
			localizedDescription: regionLocalization?.description ?? product.description,
			localizedMaterial: regionLocalization?.material ?? product.material
		}
	})

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

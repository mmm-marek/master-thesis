import { useQuery } from '@tanstack/react-query'

import { getProductLocalizationSchema } from '@/schemas/pages/products'
import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

export const getLocalizedProductsQueryKey = (regionId?: string) => [QUERY_KEYS.API_GET_LOCALIZED_PRODUCTS, regionId]

export const getLocalizedProducts = async (regionId?: string) => {
	const { products } = await medusa.products.list()

	if (!regionId) {
		return products
	}

	const localizedProducts = await Promise.allSettled(
		products.map(async (product) => {
			const parsedProduct = getProductLocalizationSchema(product, regionId).safeParse(product)
			if (parsedProduct.success) {
				const regionLocalization = parsedProduct.data.metadata?.localization[regionId]

				return {
					...product,
					// In case region is not localized, return the original product attributes
					title: regionLocalization?.title ?? product.title,
					subtitle: regionLocalization?.subtitle ?? product.subtitle,
					description: regionLocalization?.description ?? product.description,
					handle: regionLocalization?.handle ?? product.handle,
					material: regionLocalization?.material ?? product.material
				}
			}
			return product
		})
	)

	return localizedProducts
}

export const useGetLocalizedProducts = (regionId?: string) => {
	return useQuery({
		queryKey: getLocalizedProductsQueryKey(regionId),
		queryFn: async () => getLocalizedProducts(regionId),
		enabled: !!regionId
	})
}

export default useGetLocalizedProducts

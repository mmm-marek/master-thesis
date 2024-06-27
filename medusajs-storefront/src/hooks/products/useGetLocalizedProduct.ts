import { useQuery } from '@tanstack/react-query'

import { getProductLocalizationSchema } from '@/schemas/pages/products'
import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

export const getLocalizedProductQueryKey = (productId: string, regionId?: string) => [QUERY_KEYS.API_GET_LOCALIZED_PRODUCTS, productId, regionId]

export const getLocalizedProduct = async (productId: string, regionId?: string) => {
	const { product } = await medusa.products.retrieve(productId)

	if (!regionId) {
		return product
	}
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
}

export const useGetLocalizedProducts = (productId: string, regionId?: string) => {
	return useQuery({
		queryKey: getLocalizedProductQueryKey(productId, regionId),
		queryFn: async () => getLocalizedProduct(productId, regionId),
		enabled: !!regionId
	})
}

export default useGetLocalizedProducts

import { PricedProduct } from '@medusajs/medusa/dist/types/pricing'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

const getLocalizationSchema = (product: PricedProduct, region_id: string) => {
	return z.object({
		metadata: z
			.object({
				localization: z
					.object({
						[region_id]: z.object({
							title: z
								.string()
								.default(product.title || '')
								.catch(product.title ?? ''),
							subtitle: z
								.string()
								.default(product.subtitle || '')
								.catch(product.subtitle ?? ''),
							description: z
								.string()
								.default(product.description || '')
								.catch(product.description ?? ''),
							handle: z
								.string()
								.default(product.handle || '')
								.catch(product.handle ?? ''),
							material: z
								.string()
								.default(product.material || '')
								.catch(product.material ?? '')
						})
					})
					.passthrough()
			})
			.passthrough()
	})
}

export const getLocalizedProductsQueryKey = (regionId?: string) => [QUERY_KEYS.API_GET_LOCALIZED_PRODUCTS, regionId]

export const getLocalizedProducts = async (regionId?: string) => {
	if (!regionId) {
		return []
	}

	const { products } = await medusa.products.list()

	const localizedProducts = await Promise.all(
		products.map(async (product) => {
			const parsedProduct = getLocalizationSchema(product, regionId).safeParse(product)
			if (parsedProduct.success) {
				return {
					...product,
					title: parsedProduct.data.metadata?.localization[regionId]?.title,
					subtitle: parsedProduct.data.metadata?.localization[regionId]?.subtitle,
					description: parsedProduct.data.metadata?.localization[regionId]?.description,
					handle: parsedProduct.data.metadata?.localization[regionId]?.handle,
					material: parsedProduct.data.metadata?.localization[regionId]?.material
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

import { useQuery } from '@tanstack/react-query'

import { getProductLocalizationSchema } from '@/schemas/pages/products'
import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

type QueryParams = {
	regionID?: string
	categoryID?: string[]
}

export const getLocalizedProductsQueryKey = (params: QueryParams) => [QUERY_KEYS.API_GET_LOCALIZED_PRODUCTS, params]

export const getLocalizedProducts = async ({ regionID, categoryID }: QueryParams) => {
	const { products } = await medusa.products.list({
		category_id: categoryID
	})

	if (!regionID) {
		return products
	}

	const localizedProducts = products.map((product) => {
		const parsedProduct = getProductLocalizationSchema(product, regionID).safeParse(product)

		if (!parsedProduct.success) {
			return product
		}

		const regionLocalization = parsedProduct.data.metadata?.localization[regionID]
		return {
			...product,
			// In case region is not localized, return the original product attributes
			title: regionLocalization?.title ?? product.title,
			subtitle: regionLocalization?.subtitle ?? product.subtitle,
			description: regionLocalization?.description ?? product.description,
			handle: regionLocalization?.handle ?? product.handle,
			material: regionLocalization?.material ?? product.material
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

import { Product } from '@medusajs/medusa'
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing'

import { getProductLocalizationSchema } from '@/schemas/localizationSchemas'
import { LocalizedProduct } from '@/types/types'

type LocalizeProductParams<T extends Product | PricedProduct> = {
	product: T
	regionID?: string
}

export const localizeProduct = <T extends Product | PricedProduct>({ product, regionID }: LocalizeProductParams<T>): LocalizedProduct<T> => {
	if (!regionID) {
		return {
			...product,
			localizedTitle: product.title,
			localizedSubtitle: product.subtitle,
			localizedDescription: product.description,
			localizedMaterial: product.material
		}
	}

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
}

import { Product, ProductCategory } from '@medusajs/medusa'
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing'
import z from 'zod'

/**
 * Get the localization schema for a product in a specific region.
 * If some attributes are not localized, return the original product attributes.
 * @param product Product to localize
 * @param region_id ID of the region to localize the product for
 * @returns Localization schema for the product with default and catch values set to original product attributes
 */
export const getProductLocalizationSchema = <T extends Product | PricedProduct>(product: T, region_id: string) => {
	return z.object({
		metadata: z
			.object({
				localization: z
					.object({
						[region_id]: z.object({
							title: z
								.string()
								.min(1)
								.default(product.title || '')
								.catch(product.title ?? ''),
							subtitle: z
								.string()
								.min(1)
								.default(product.subtitle || '')
								.catch(product.subtitle ?? ''),
							description: z
								.string()
								.min(1)
								.default(product.description || '')
								.catch(product.description ?? ''),
							handle: z
								.string()
								.min(1)
								.default(product.handle || '')
								.catch(product.handle ?? ''),
							material: z
								.string()
								.min(1)
								.default(product.material || '')
								.catch(product.material ?? '')
						})
					})
					.passthrough()
			})
			.passthrough()
	})
}

/**
 * Get the localization schema for a product category in a specific region.
 * If some attributes are not localized, return the original product category.
 * @param category Category to localize
 * @param region_id ID of the region to localize the category for
 * @returns Localization schema for the product category with default and catch values set to original category attributes
 */
export const getCategoryLocalizationSchema = (category: ProductCategory, region_id: string) => {
	return z.object({
		metadata: z
			.object({
				localization: z
					.object({
						[region_id]: z.object({
							name: z
								.string()
								.min(1)
								.default(category.name || '')
								.catch(category.name ?? ''),
							description: z
								.string()
								.min(1)
								.default(category.description || '')
								.catch(category.description ?? ''),
							handle: z
								.string()
								.min(1)
								.default(category.handle || '')
								.catch(category.handle ?? '')
						})
					})
					.passthrough()
			})
			.passthrough()
	})
}

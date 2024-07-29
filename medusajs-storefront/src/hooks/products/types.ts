import { PricedProduct } from '@medusajs/medusa/dist/types/pricing'

export type LocalizedProduct = PricedProduct & {
	localizedTitle?: string
	localizedSubtitle?: string | null
	localizedDescription?: string | null
	localizedHandle?: string | null
	localizedMaterial?: string | null
}

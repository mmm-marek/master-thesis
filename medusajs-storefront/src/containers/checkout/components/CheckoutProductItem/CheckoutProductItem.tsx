import { LineItem } from '@medusajs/medusa'

import useGetLocalizedProduct from '@/hooks/products/useGetLocalizedProduct'

import CheckoutProductItemSkeleton from './CheckoutProductItemSkeleton'
import * as SC from './CheckoutProductItemStyles'

type CheckoutProductItemProps = {
	item: LineItem
}

const CheckoutProductItem = ({ item }: CheckoutProductItemProps) => {
	const { data: localizedProduct, isLoading: isLoadingLocalizedProduct } = useGetLocalizedProduct(item.variant.product.handle!)

	const localizedVariant = localizedProduct?.variants?.find((v) => v.id === item.variant.id)

	if (isLoadingLocalizedProduct) {
		return <CheckoutProductItemSkeleton />
	}

	return (
		<li>
			<SC.LineItemHeader>
				<div>{localizedProduct?.title}</div>
				<SC.Quantity>{item.quantity}</SC.Quantity>
			</SC.LineItemHeader>
			<SC.Variant>{localizedVariant?.title}</SC.Variant>
		</li>
	)
}

export default CheckoutProductItem

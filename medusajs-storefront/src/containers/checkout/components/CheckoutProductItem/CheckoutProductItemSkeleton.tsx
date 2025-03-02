import * as SC from './CheckoutProductItemStyles'

const CheckoutProductItemSkeleton = () => {
	return (
		<li>
			<SC.LineItemHeader>
				<SC.ProductTitleSkeleton />
				<SC.QuantitySkeleton />
			</SC.LineItemHeader>
			<SC.VariantSkeleton />
		</li>
	)
}

export default CheckoutProductItemSkeleton

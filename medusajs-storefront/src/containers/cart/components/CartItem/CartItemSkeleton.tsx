import * as SC from './CartItemStyles'

const CartItemSkeleton = () => {
	return (
		<SC.Wrapper>
			<SC.ThumbnailSkeleton />
			<SC.ContentWrapper>
				<SC.Header>
					<SC.TitleSkeleton />
					<SC.PriceSkeleton />
				</SC.Header>
				<SC.VariantSkeleton />
				<div>
					<SC.QuantityWrapperSkeleton />
					<SC.ButtonSkeleton />
				</div>
			</SC.ContentWrapper>
		</SC.Wrapper>
	)
}

export default CartItemSkeleton

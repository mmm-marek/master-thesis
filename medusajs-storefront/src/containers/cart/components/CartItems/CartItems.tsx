import { LineItem, Region } from '@medusajs/medusa'

import CartItem from '../CartItem/CartItem'

import * as SC from './CartItemsStyles'

type CartItemsProps = {
	items: LineItem[]
	region: Region
}

const CartItems = ({ items, region }: CartItemsProps) => {
	return (
		<SC.Wrapper>
			<SC.Heading>Cart</SC.Heading>
			<SC.CartItemsWrapper>
				{items.map((item) => (
					<CartItem key={item.id} item={item} region={region} />
				))}
			</SC.CartItemsWrapper>
		</SC.Wrapper>
	)
}

export default CartItems

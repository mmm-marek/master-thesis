import { useCart } from 'medusa-react'

import * as SC from './CartStyles'
import CartItem from './components/CartItem/CartItem'

const Cart = () => {
	const { cart } = useCart()

	return (
		<div>
			<SC.Heading>Cart</SC.Heading>
			<SC.CartItemsWrapper>{cart?.items.map((item) => <CartItem key={item.id} item={item} region={cart.region} />)}</SC.CartItemsWrapper>
		</div>
	)
}

export default Cart

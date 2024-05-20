import { Spin } from 'antd'
import { useCart } from 'medusa-react'

import { useStore } from '@/providers/StoreProvider'

import * as SC from './CartStyles'
import CartItem from './components/CartItem/CartItem'

const Cart = () => {
	const { cart } = useCart()
	const { isUpdatingCart } = useStore()

	return (
		<Spin spinning={isUpdatingCart}>
			<div>
				<SC.Heading>Cart</SC.Heading>
				<SC.CartItemsWrapper>{cart?.items.map((item) => <CartItem key={item.id} item={item} region={cart.region} />)}</SC.CartItemsWrapper>
			</div>
		</Spin>
	)
}

export default Cart

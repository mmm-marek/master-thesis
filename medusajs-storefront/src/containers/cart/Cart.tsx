import { Spin } from 'antd'

import Loading from '@/components/Loading/Loading'
import { useStore } from '@/providers/StoreProvider'

import * as SC from './CartStyles'
import CartItems from './components/CartItems/CartItems'
import Summary from './components/Summary/Summary'

const Cart = () => {
	const { cart, isUpdatingCart } = useStore()

	if (!cart) {
		return <Loading />
	}

	return (
		<Spin spinning={isUpdatingCart}>
			<SC.CartWrapper>
				<CartItems items={cart?.items ?? []} region={cart?.region} />
				<Summary />
			</SC.CartWrapper>
		</Spin>
	)
}

export default Cart

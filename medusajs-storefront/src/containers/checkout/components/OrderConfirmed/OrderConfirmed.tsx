import { BadgeCheck } from 'lucide-react'

import * as SC from './OrderConfirmedStyles'

const OrderConfirmed = () => {
	return (
		<SC.Container>
			<BadgeCheck size={64} />
			<SC.TextWrapper>
				<SC.Title>Order Confirmed</SC.Title>
				<SC.Description>Your order has been confirmed and will be shipped soon.</SC.Description>
			</SC.TextWrapper>
		</SC.Container>
	)
}

export default OrderConfirmed

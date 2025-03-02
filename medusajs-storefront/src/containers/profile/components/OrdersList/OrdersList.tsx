import { formatAmount, useCustomerOrders } from 'medusa-react'
import { useTranslations } from 'next-intl'

import * as SC from './OrdersListStyles'

const OrdersList = () => {
	const t = useTranslations('containers.profile')

	const { orders } = useCustomerOrders({
		expand: 'items.variant.product',
		limit: 20,
		offset: 0
	})

	return (
		<div>
			<SC.Title>{t('orders')}</SC.Title>
			<SC.Container>
				{orders?.map((order) => (
					<SC.OrderWrapper key={order.id}>
						<SC.OrderTitle>
							<span>{t('order')}</span>
							<SC.OrderId>#{order.display_id}</SC.OrderId>
						</SC.OrderTitle>
						<div>
							{order.items.map((item) => (
								<SC.ProductTitle key={item.id}>
									<span>{item.title}</span>
									<SC.Quantity>({item.quantity})</SC.Quantity>
								</SC.ProductTitle>
							))}
						</div>
						<SC.Price>
							{formatAmount({
								amount: order.total,
								region: order.region
							})}
						</SC.Price>
					</SC.OrderWrapper>
				))}
			</SC.Container>
		</div>
	)
}

export default OrdersList

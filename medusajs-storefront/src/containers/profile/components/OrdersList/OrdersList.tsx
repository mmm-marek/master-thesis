import { formatAmount, useCustomerOrders } from 'medusa-react'
import { useTranslations } from 'next-intl'

import { useStore } from '@/providers/StoreProvider'
import { localizeProduct } from '@/utils/localization'

import * as SC from './OrdersListStyles'

const OrdersList = () => {
	const { cart } = useStore()
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
							{order.items.map((item) => {
								const localizedProduct = localizeProduct({
									product: item.variant.product,
									regionID: cart?.region_id
								})

								return (
									<SC.ProductTitle key={localizedProduct.id}>
										<span>{localizedProduct.localizedTitle}</span>
										<SC.Quantity>({item.quantity})</SC.Quantity>
									</SC.ProductTitle>
								)
							})}
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

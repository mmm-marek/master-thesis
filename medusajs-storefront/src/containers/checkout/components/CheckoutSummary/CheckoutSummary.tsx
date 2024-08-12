import { useTranslations } from 'next-intl'

import { useStore } from '@/providers/StoreProvider'

import * as SC from './CheckoutSummaryStyles'

const CheckoutSummary = () => {
	const { cart } = useStore()
	const t = useTranslations('containers.checkout')

	const hasPersonalInfo = cart?.shipping_address?.first_name && cart?.shipping_address?.last_name && cart?.shipping_address?.phone && cart.email
	const hasShippingAddress =
		cart?.shipping_address?.address_1 &&
		cart?.shipping_address?.address_2 &&
		cart?.shipping_address?.city &&
		cart?.shipping_address?.country_code &&
		cart?.shipping_address?.postal_code
	const hasBillingInfo =
		cart?.billing_address?.address_1 &&
		cart?.billing_address?.address_2 &&
		cart?.billing_address?.city &&
		cart?.billing_address?.country_code &&
		cart?.billing_address?.postal_code

	return (
		<SC.Container>
			<SC.Title>{t('summary')}</SC.Title>
			<SC.CartItemsList>
				{cart?.items.map((item) => (
					<li key={item.id}>
						<SC.LineItemHeader>
							<div>{item.title}</div>
							<SC.Quantity>{item.quantity}</SC.Quantity>
						</SC.LineItemHeader>
						<SC.Variant>{item.variant.title}</SC.Variant>
					</li>
				))}
			</SC.CartItemsList>
			{hasPersonalInfo && (
				<>
					<SC.Divider />
					<div>
						<SC.SummaryName>{t('personalInformation')}</SC.SummaryName>
						<SC.SummaryInfo>
							{cart.shipping_address?.first_name} {cart.shipping_address?.last_name}
						</SC.SummaryInfo>
						<SC.SummaryInfo>{cart.email}</SC.SummaryInfo>
						<SC.SummaryInfo>{cart.shipping_address?.phone}</SC.SummaryInfo>
					</div>
				</>
			)}
			{hasShippingAddress && (
				<>
					<SC.Divider />
					<div>
						<SC.SummaryName>{t('shipping')}</SC.SummaryName>
						<SC.SummaryInfo>
							{cart.shipping_address?.address_1}, {cart.shipping_address?.address_2}
						</SC.SummaryInfo>
						<SC.SummaryInfo>
							{cart.shipping_address?.postal_code}, {cart.shipping_address?.city}, {cart.shipping_address?.country_code?.toUpperCase()}
						</SC.SummaryInfo>
					</div>
				</>
			)}
			{hasBillingInfo && (
				<>
					<SC.Divider />
					<div>
						<SC.SummaryName>{t('billingAddress')}</SC.SummaryName>
						<SC.SummaryInfo>
							{cart.billing_address?.address_1}, {cart.billing_address?.address_2}
						</SC.SummaryInfo>
						<SC.SummaryInfo>
							{cart.billing_address?.postal_code}, {cart.billing_address?.city}, {cart.billing_address?.country_code?.toUpperCase()}
						</SC.SummaryInfo>
					</div>
				</>
			)}
		</SC.Container>
	)
}

export default CheckoutSummary

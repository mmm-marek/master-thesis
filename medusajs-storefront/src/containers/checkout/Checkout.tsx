import { Collapse } from 'antd'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { useStore } from '@/providers/StoreProvider'

import * as SC from './CheckoutStyles'
import AddCheckoutBillingForm from './components/AddCheckoutBillingForm/AddCheckoutBillingForm'
import CheckoutSummary from './components/CheckoutSummary/CheckoutSummary'
import PersonalInformationForm from './components/PersonalInformationForm/PersonalInformationForm'
import ShippingAddressPicker from './components/ShippingAddressPicker/ShippingAddressPicker'
import StripeContainer from './components/StripeContainer/StripeContainer'

import type { CollapseProps } from 'antd'

const shippingAddresses = [
	{
		name: 'Office BA',
		address1: 'Bottova 7939/2A',
		address2: 'The Spot at Sky Park Offices',
		city: 'Bratislava',
		countryCode: 'sk',
		postalCode: '811 09'
	},
	{
		name: 'Office ZA',
		address1: 'Obchodná 9076/3D',
		city: 'Žilina',
		countryCode: 'sk',
		postalCode: '01 008'
	},
	{
		name: 'Office KE',
		address1: 'Hviezdoslavova ul. 6',
		city: 'Košice',
		countryCode: 'sk',
		postalCode: '040 01'
	},
	{
		name: 'Office LM',
		address1: 'M. Martinčeka 4701/2',
		city: 'Liptovský Mikuláš',
		countryCode: 'sk',
		postalCode: '031 01'
	}
]

type CollapseKey = 'personalInformation' | 'shipping' | 'billing' | 'payment'

const Checkout = () => {
	const t = useTranslations('containers.checkout')

	const { initPayment, cart } = useStore()
	const [activeKey, setActiveKey] = useState<CollapseKey>('personalInformation')

	const items: CollapseProps['items'] = [
		{
			key: 'personalInformation',
			label: <SC.CollapseItemLabel>{t('personalInformation')}</SC.CollapseItemLabel>,
			children: <PersonalInformationForm onSubmitted={() => setActiveKey('shipping')} />
		},
		{
			key: 'shipping',
			label: <SC.CollapseItemLabel $disabled={!cart?.shipping_address?.first_name}>{t('shipping')}</SC.CollapseItemLabel>,
			children: <ShippingAddressPicker shippingAddresses={shippingAddresses} onAddressChange={() => setActiveKey('billing')} />,
			collapsible: !cart?.shipping_address?.first_name ? 'disabled' : undefined
		},
		{
			key: 'billing',
			label: <SC.CollapseItemLabel $disabled={!cart?.shipping_address?.address_1}>{t('billingAddress')}</SC.CollapseItemLabel>,
			children: (
				<AddCheckoutBillingForm
					onSubmitted={() => {
						initPayment({
							onSuccess: () => setActiveKey('payment')
						})
					}}
				/>
			),
			collapsible: !cart?.shipping_address?.address_1 ? 'disabled' : undefined
		},
		{
			key: 'payment',
			label: <SC.CollapseItemLabel $disabled={!cart?.billing_address?.address_1}>{t('paymentDetails')}</SC.CollapseItemLabel>,
			children: <StripeContainer />,
			collapsible: !cart?.billing_address?.address_1 ? 'disabled' : undefined
		}
	]

	return (
		<SC.Container>
			<Collapse accordion items={items} activeKey={activeKey} onChange={(k) => setActiveKey(k as CollapseKey)} defaultActiveKey={activeKey} ghost />
			<CheckoutSummary />
		</SC.Container>
	)
}

export default Checkout

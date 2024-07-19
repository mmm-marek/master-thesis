import { Collapse } from 'antd'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { useStore } from '@/providers/StoreProvider'

import AddCheckoutBillingForm from './components/AddCheckoutBillingForm/AddCheckoutBillingForm'
import PersonalInformationForm from './components/PersonalInformationForm/PersonalInformationForm'
import ShippingAddressPicker from './components/ShippingAddressPicker/ShippingAddressPicker'
import { ShippingAddress } from './components/ShippingAddressPicker/types'
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
	const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)

	const items: CollapseProps['items'] = [
		{
			key: 'personalInformation',
			label: t('personalInformation'),
			children: <PersonalInformationForm onSubmitted={() => setActiveKey('shipping')} />
		},
		{
			key: 'shipping',
			label: t('shipping'),
			children: (
				<ShippingAddressPicker
					shippingAddresses={shippingAddresses}
					onAddressChange={(address) => {
						setShippingAddress(address)
						setActiveKey('billing')
					}}
				/>
			),
			collapsible: !cart?.shipping_address?.first_name ? 'disabled' : undefined
		},
		{
			key: 'billing',
			label: t('billingAddress'),
			children: (
				<AddCheckoutBillingForm
					onSubmitted={() => {
						initPayment({
							onSuccess: () => setActiveKey('payment')
						})
					}}
				/>
			),
			collapsible: shippingAddress === null ? 'disabled' : undefined
		},
		{
			key: 'payment',
			label: t('paymentDetails'),
			children: <StripeContainer />,
			collapsible: !cart?.billing_address?.address_1 ? 'disabled' : undefined
		}
	]

	return <Collapse accordion items={items} activeKey={activeKey} onChange={(k) => setActiveKey(k as CollapseKey)} defaultActiveKey={activeKey} />
}

export default Checkout

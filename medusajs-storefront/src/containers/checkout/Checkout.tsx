import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { TabPanel, Tabs } from 'react-aria-components'

import { useStore } from '@/providers/StoreProvider'

import * as SC from './CheckoutStyles'
import AddCheckoutBillingForm from './components/AddCheckoutBillingForm/AddCheckoutBillingForm'
import CheckoutSummary from './components/CheckoutSummary/CheckoutSummary'
import PersonalInformationForm from './components/PersonalInformationForm/PersonalInformationForm'
import ShippingAddressPicker from './components/ShippingAddressPicker/ShippingAddressPicker'
import StripeContainer from './components/StripeContainer/StripeContainer'

const shippingAddressesRegionSk = [
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

const shippingAddressesRegionUs = [
	{
		name: 'Office NY',
		address1: '123 Madison Ave',
		address2: 'Suite 500',
		city: 'New York',
		countryCode: 'us',
		postalCode: '10016'
	},
	{
		name: 'Office SF',
		address1: '456 Market St',
		address2: 'Floor 10',
		city: 'San Francisco',
		countryCode: 'us',
		postalCode: '94105'
	},
	{
		name: 'Office CHI',
		address1: '789 Wacker Dr',
		address2: 'Suite 200',
		city: 'Chicago',
		countryCode: 'us',
		postalCode: '60606'
	},
	{
		name: 'Office LA',
		address1: '101 Sunset Blvd',
		address2: 'Building A',
		city: 'Los Angeles',
		countryCode: 'us',
		postalCode: '90028'
	}
]

type CollapseKey = 'personalInformation' | 'shipping' | 'billing' | 'payment'

const Checkout = () => {
	const t = useTranslations('containers.checkout')

	const { initPayment, cart, getRegion } = useStore()

	const [activeKey, setActiveKey] = useState<CollapseKey>('personalInformation')

	const selectedCountryCode = getRegion()?.countryCode

	const items = [
		{
			key: 'personalInformation',
			isDisabled: false,
			label: t('personalInformation'),
			children: <PersonalInformationForm onSubmitted={() => setActiveKey('shipping')} />
		},
		{
			key: 'shipping',
			isDisabled: !cart?.shipping_address?.first_name,
			label: t('shipping'),
			children: (
				<ShippingAddressPicker
					shippingAddresses={selectedCountryCode === 'SK' ? shippingAddressesRegionSk : shippingAddressesRegionUs}
					onAddressChange={() => setActiveKey('billing')}
				/>
			)
		},
		{
			key: 'billing',
			isDisabled: !cart?.shipping_address?.address_1,
			label: t('billingAddress'),
			children: (
				<AddCheckoutBillingForm
					onSubmitted={() => {
						initPayment({
							onSuccess: () => setActiveKey('payment')
						})
					}}
				/>
			)
		},
		{
			key: 'payment',
			isDisabled: !cart?.billing_address?.address_1,
			label: t('paymentDetails'),
			children: <StripeContainer />
		}
	]

	return (
		<>
			<SC.Heading>{t('checkout')}</SC.Heading>
			<SC.Container>
				<Tabs selectedKey={activeKey} onSelectionChange={(k) => setActiveKey(k as CollapseKey)}>
					<SC.StyledTabsList>
						{items.map((item, index) => (
							<SC.StyledTab key={item.key} id={item.key} isDisabled={item.isDisabled}>
								{index + 1}. {item.label}
							</SC.StyledTab>
						))}
					</SC.StyledTabsList>
					{items.map((item) => (
						<TabPanel key={item.key} id={item.key}>
							{item.children}
						</TabPanel>
					))}
				</Tabs>
				<CheckoutSummary />
			</SC.Container>
		</>
	)
}

export default Checkout

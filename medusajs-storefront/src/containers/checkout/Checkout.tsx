import { Collapse } from 'antd'

import AddCheckoutBillingForm from './components/AddCheckoutBillingForm/AddCheckoutBillingForm'

import type { CollapseProps } from 'antd'

const Checkout = () => {
	const items: CollapseProps['items'] = [
		{
			key: '1',
			label: 'Shipping',
			children: <p>Shipping</p>
		},
		{
			key: '2',
			label: 'Billing address',
			children: <AddCheckoutBillingForm onSubmit={async (data) => console.log(data)} />,
			collapsible: 'disabled'
		},
		{
			key: '3',
			label: 'Payment details',
			children: <p>Payment details</p>,
			collapsible: 'disabled'
		}
	]

	return <Collapse accordion items={items} />
}

export default Checkout

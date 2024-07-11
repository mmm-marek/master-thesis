import { Collapse } from 'antd'

import type { CollapseProps } from 'antd'

const items: CollapseProps['items'] = [
	{
		key: '1',
		label: 'Shipping address',
		children: <p>Select shipping address</p>
	},
	{
		key: '2',
		label: 'Billing address',
		children: <p>Select billing address</p>,
		collapsible: 'disabled'
	},
	{
		key: '3',
		label: 'Payment details',
		children: <p>Payment details</p>,
		collapsible: 'disabled'
	}
]

const Checkout = () => <Collapse accordion items={items} />

export default Checkout

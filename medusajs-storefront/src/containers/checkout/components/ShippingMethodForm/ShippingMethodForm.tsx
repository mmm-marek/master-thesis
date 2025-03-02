import { formatAmount } from 'medusa-react'

import Loading from '@/components/Loading/Loading'
import { useGetShippingOptions } from '@/hooks/shippingOptions/useGetShippingOptions'
import { useStore } from '@/providers/StoreProvider'

import * as SC from './ShippingMethodFormStyles'

type ShippingMethodFormProps = {
	onShippingMethodChange: (shippingMethodId: string) => void
}

const ShippingMethodForm = ({ onShippingMethodChange }: ShippingMethodFormProps) => {
	const { cart } = useStore()
	const { data: shippingOptions } = useGetShippingOptions()

	if (!cart || !cart?.region) {
		return <Loading />
	}

	return (
		<SC.RadioGroup defaultValue={cart?.shipping_methods[0]?.id} onChange={(value) => onShippingMethodChange(value)}>
			{shippingOptions?.map((option) => (
				<SC.Radio value={option.id!} key={option.id!}>
					<SC.AddressWrapper>
						<SC.AddressName>{option.name}</SC.AddressName>
						<SC.AddressDescription>
							{formatAmount({
								amount: option.price_incl_tax ?? 0,
								region: cart.region
							})}
						</SC.AddressDescription>
					</SC.AddressWrapper>
				</SC.Radio>
			))}
		</SC.RadioGroup>
	)
}

export default ShippingMethodForm

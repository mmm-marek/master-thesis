import { Radio } from 'antd'

import { useStore } from '@/providers/StoreProvider'

import * as SC from './ShippingAddressPickerStyles'
import { ShippingAddress } from './types'

type ShippingAddressPickerProps = {
	onAddressChange: (address: ShippingAddress) => void
	shippingAddresses: ShippingAddress[]
}

const ShippingAddressPicker = ({ onAddressChange, shippingAddresses }: ShippingAddressPickerProps) => {
	const { updateShippingAddress, cart } = useStore()

	return (
		<Radio.Group
			defaultValue={cart?.shipping_address?.address_1}
			onChange={(e) => {
				const selectedAddress = shippingAddresses.find((address) => address.address1 === e.target.value)
				if (!selectedAddress) {
					return
				}
				updateShippingAddress(
					{
						address_1: selectedAddress.address1,
						address_2: selectedAddress.address2,
						city: selectedAddress.city,
						country_code: selectedAddress.countryCode,
						postal_code: selectedAddress.postalCode
					},
					{
						onSuccess: () => {
							onAddressChange(selectedAddress)
						}
					}
				)
			}}
		>
			<SC.CardsWrapper>
				{shippingAddresses.map((address) => (
					<SC.OptionLabel key={address.address1} htmlFor={address.address1}>
						<Radio value={address.address1} id={address.address1}>
							<SC.ContentWrapper>
								<SC.AddressName>{address.name}</SC.AddressName>
								<SC.AddressWrapper>
									<SC.Address>{address.address1}</SC.Address>
									{address.address2 && <SC.Address>{address.address2}</SC.Address>}
									<SC.Address>
										{address.postalCode}, {address.city}
									</SC.Address>
								</SC.AddressWrapper>
							</SC.ContentWrapper>
						</Radio>
					</SC.OptionLabel>
				))}
			</SC.CardsWrapper>
		</Radio.Group>
	)
}

export default ShippingAddressPicker

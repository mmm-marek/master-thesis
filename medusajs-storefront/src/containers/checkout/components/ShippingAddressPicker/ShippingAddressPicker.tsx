import { Radio } from 'antd'

import * as SC from './ShippingAddressPickerStyles'
import { ShippingAddress } from './types'

type ShippingAddressPickerProps = {
	onAddressChange: (address: ShippingAddress) => void
	shippingAddresses: ShippingAddress[]
}

const ShippingAddressPicker = ({ onAddressChange, shippingAddresses }: ShippingAddressPickerProps) => {
	return (
		<Radio.Group
			onChange={(e) => {
				const selectedAddress = shippingAddresses.find((address) => address.address1 === e.target.value)
				if (!selectedAddress) {
					return
				}
				onAddressChange(selectedAddress)
			}}
		>
			<SC.CardsWrapper>
				{shippingAddresses.map((address) => (
					<label key={address.address1} htmlFor={address.address1}>
						<Radio value={address.address1} id={address.address1}>
							<SC.ContentWrapper>
								<span>{address.name}</span>
								<SC.AddressWrapper>
									<span>{address.address1}</span>
									{address.address2 && <span>{address.address2}</span>}
									<span>
										{address.postalCode}, {address.city}
									</span>
								</SC.AddressWrapper>
							</SC.ContentWrapper>
						</Radio>
					</label>
				))}
			</SC.CardsWrapper>
		</Radio.Group>
	)
}

export default ShippingAddressPicker

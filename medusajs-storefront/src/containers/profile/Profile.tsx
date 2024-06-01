import { useTranslations } from 'next-intl'

import useCustomerProfile from '@/hooks/auth/useCustomerProfile'

const Profile = () => {
	const t = useTranslations('containers.profile')

	const { data: user } = useCustomerProfile()

	return (
		<div>
			<div>
				<div>{t('profileSettings')}</div>
				<div>
					<div>
						<div>Customer information</div>
						<div>{`${user?.first_name} ${user?.last_name}`}</div>
						<div>{user?.email}</div>
						<div>{user?.phone}</div>
					</div>
					<div>
						<div>Billing address</div>
						<div>{user?.billing_address?.address_1}</div>
						<div>{user?.billing_address?.address_2}</div>
						<div>{user?.billing_address?.city}</div>
						<div>{user?.billing_address?.country?.display_name}</div>
						<div>{user?.billing_address?.postal_code}</div>
						<div>{user?.billing_address?.phone}</div>
						<div>{user?.billing_address?.company}</div>
					</div>
					<div>
						<div>Shipping address</div>
						{user?.shipping_addresses.map((address) => (
							<div key={address.id}>
								<div>{address.address_1}</div>
								<div>{address.address_2}</div>
								<div>{address.city}</div>
								<div>{address.country?.display_name}</div>
								<div>{address.postal_code}</div>
								<div>{address.phone}</div>
								<div>{address.company}</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div>
				<div>Orders</div>
				{user?.orders.map((order) => (
					<div key={order.id}>
						<div>{order.id}</div>
						<div>{order.subtotal}</div>
						<div>{order.total}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Profile

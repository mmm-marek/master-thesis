import { useTranslations } from 'next-intl'

import useCustomerProfile from '@/hooks/customer/useCustomerProfile'

import * as SC from './ProfileStyles'

type ProfileItemProps = {
	label: string
	value: string | null | undefined
}

const ProfileItem = ({ label, value }: ProfileItemProps) => {
	if (!value) {
		return null
	}
	return (
		<SC.ProfileItem>
			<SC.ProfileItemLabel>{label}</SC.ProfileItemLabel>
			<SC.ProfileItemValue>{value}</SC.ProfileItemValue>
		</SC.ProfileItem>
	)
}

const Profile = () => {
	const t = useTranslations('containers.profile')

	const { data: user } = useCustomerProfile()

	return (
		<SC.Content>
			<div>
				<SC.SectionHeading>{t('profileSettings')}</SC.SectionHeading>
				<SC.ProfileSettingsWrapper>
					<div>
						<SC.SubsectionHeading>{t('customerInformation')}</SC.SubsectionHeading>
						<ProfileItem label={t('name')} value={`${user?.first_name} ${user?.last_name}`} />
						<ProfileItem label={t('email')} value={user?.email} />
						<ProfileItem label={t('phone')} value={user?.phone} />
					</div>
					<div>
						<SC.SubsectionHeading>{t('billingAddress')}</SC.SubsectionHeading>
						<ProfileItem label={t('address1')} value={user?.billing_address?.address_1} />
						<ProfileItem label={t('address2')} value={user?.billing_address?.address_2} />
						<ProfileItem label={t('city')} value={user?.billing_address?.city} />
						<ProfileItem label={t('country')} value={user?.billing_address?.country?.display_name} />
						<ProfileItem label={t('postalCode')} value={user?.billing_address?.postal_code} />
						<ProfileItem label={t('company')} value={user?.billing_address?.company} />
					</div>
					<div>
						<SC.SubsectionHeading>{t('shippingAddresses')}</SC.SubsectionHeading>
						{user?.shipping_addresses.map((address) => (
							<div key={address.id}>
								<ProfileItem label={t('address1')} value={address.address_1} />
								<ProfileItem label={t('address2')} value={address.address_2} />
								<ProfileItem label={t('city')} value={address.city} />
								<ProfileItem label={t('country')} value={address.country?.display_name} />
								<ProfileItem label={t('postalCode')} value={address.postal_code} />
								<ProfileItem label={t('company')} value={address.company} />
							</div>
						))}
					</div>
				</SC.ProfileSettingsWrapper>
			</div>
			<div>
				<SC.SectionHeading>{t('orders')}</SC.SectionHeading>
				{user?.orders.map((order) => (
					<div key={order.id}>
						<div>{order.id}</div>
						<div>{order.subtotal}</div>
						<div>{order.total}</div>
					</div>
				))}
			</div>
		</SC.Content>
	)
}

export default Profile

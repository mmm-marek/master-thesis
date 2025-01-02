import { PencilIcon, PlusCircleIcon, Trash2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import Button from '@/atoms/Button/Button'
import useCustomerProfile from '@/hooks/customer/useCustomerProfile'
import useDeleteShippingAddress from '@/hooks/customer/useDeleteShippingAddress'

import * as SC from './ProfileStyles'
import AddShippingAddressForm from './components/AddShippingAddressForm/AddShippingAddressForm'
import OrdersList from './components/OrdersList/OrdersList'
import UpdateBillingAddressForm from './components/UpdateAddressForm/UpdateAddressForm'
import UpdateCustomerForm from './components/UpdateCustomerForm/UpdateCustomerForm'

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

	const [isUpdateCustomerModalOpen, setIsUpdateCustomerModalOpen] = useState(false)
	const [isUpdateBillingAddressModalOpen, setIsUpdateBillingAddressModalOpen] = useState(false)
	const [isAddShippingAddressModalOpen, setIsAddShippingAddressModalOpen] = useState(false)

	const { data: user } = useCustomerProfile()
	const { mutate: deleteShippingAddress } = useDeleteShippingAddress()

	const handleDeleteShippingAddress = (addressId: string) => {
		deleteShippingAddress(addressId)
	}

	return (
		<>
			<SC.Content>
				<SC.SectionHeading>{t('profileSettings')}</SC.SectionHeading>
				<SC.ProfileSettingsWrapper>
					<div>
						<SC.SubsectionHeadingWrapper>
							<SC.SubsectionHeading>{t('customerInformation')}</SC.SubsectionHeading>
							<Button size='medium' onPress={() => setIsUpdateCustomerModalOpen(true)}>
								<PencilIcon />
							</Button>
						</SC.SubsectionHeadingWrapper>
						<ProfileItem label={t('name')} value={`${user?.first_name} ${user?.last_name}`} />
						<ProfileItem label={t('email')} value={user?.email} />
						<ProfileItem label={t('phone')} value={user?.phone} />
					</div>
					<div>
						<SC.SubsectionHeadingWrapper>
							<SC.SubsectionHeading>{t('billingAddress')}</SC.SubsectionHeading>
							<Button size='medium' onPress={() => setIsUpdateBillingAddressModalOpen(true)}>
								<PencilIcon />
							</Button>
						</SC.SubsectionHeadingWrapper>
						<ProfileItem label={t('address1')} value={user?.billing_address?.address_1} />
						<ProfileItem label={t('address2')} value={user?.billing_address?.address_2} />
						<ProfileItem label={t('city')} value={user?.billing_address?.city} />
						<ProfileItem label={t('country')} value={user?.billing_address?.country?.display_name} />
						<ProfileItem label={t('postalCode')} value={user?.billing_address?.postal_code} />
						<ProfileItem label={t('company')} value={user?.billing_address?.company} />
					</div>
					<div>
						<SC.SubsectionHeadingWrapper>
							<SC.SubsectionHeading>{t('shippingAddresses')}</SC.SubsectionHeading>
							<Button size='medium' onPress={() => setIsAddShippingAddressModalOpen(true)}>
								<PlusCircleIcon />
							</Button>
						</SC.SubsectionHeadingWrapper>
						<SC.ShippingAddressesWrapper>
							{user?.shipping_addresses?.map((address) => (
								<SC.ShippingAddressWrapper key={address.id}>
									<SC.ShippingAddressInfo>
										<SC.ShippingAddressLabel>{`${address.address_1} ${address.address_2}`}</SC.ShippingAddressLabel>
										<SC.ShippingAddressLabel>{`${address.city}, ${address.postal_code}`}</SC.ShippingAddressLabel>
										<SC.ShippingAddressLabel>{address.country?.display_name}</SC.ShippingAddressLabel>
										<SC.ShippingAddressLabel>{address.company}</SC.ShippingAddressLabel>
									</SC.ShippingAddressInfo>
									<SC.ShippingAddressActions>
										<Button size='medium' onPress={() => handleDeleteShippingAddress(address.id)}>
											<Trash2Icon />
										</Button>
									</SC.ShippingAddressActions>
								</SC.ShippingAddressWrapper>
							))}
						</SC.ShippingAddressesWrapper>
					</div>
				</SC.ProfileSettingsWrapper>
				<OrdersList />
			</SC.Content>
			<UpdateCustomerForm
				open={isUpdateCustomerModalOpen}
				onClose={() => setIsUpdateCustomerModalOpen(false)}
				defaultValues={{
					firstName: user?.first_name ?? '',
					lastName: user?.last_name ?? '',
					email: user?.email ?? ''
				}}
			/>
			<UpdateBillingAddressForm
				open={isUpdateBillingAddressModalOpen}
				onClose={() => setIsUpdateBillingAddressModalOpen(false)}
				defaultValues={{
					address1: user?.billing_address?.address_1 ?? '',
					address2: user?.billing_address?.address_2 ?? '',
					city: user?.billing_address?.city ?? '',
					countryCode: user?.billing_address?.country?.iso_2 ?? '',
					postalCode: user?.billing_address?.postal_code ?? '',
					company: user?.billing_address?.company ?? ''
				}}
			/>
			<AddShippingAddressForm open={isAddShippingAddressModalOpen} onClose={() => setIsAddShippingAddressModalOpen(false)} />
		</>
	)
}

export default Profile

import { Dropdown } from 'antd'
import { useRouter } from 'next/router'

import useCountryOptions from '@/hooks/region/useCountryOptions'
import { useStore } from '@/providers/StoreProvider'

import * as SC from './RegionPickerStyles'

/**
 * Region picker component serves as both a language selector as well as a medusa region selector.
 * In order to function properly, locales in next.config.mjs must be set to the same values as the names of the regions in the Medusa admin.
 * When a user selects a region, the new locale is pushed to next router and set as the new region of the cart of the user.
 * In real eshop application, we might not want to provide the user with the option to change region,
 * this is just an example of how to implement a region picker.
 */
const RegionPicker = () => {
	const router = useRouter()
	const { setRegion } = useStore()

	const countryOptions = useCountryOptions()

	const menuItems = countryOptions.map((option) => {
		return {
			key: option.regionName,
			label: option.regionName
		}
	})

	return (
		<Dropdown
			menu={{
				items: menuItems,
				selectable: true,
				selectedKeys: [router.locale ?? 'en'],
				onSelect: (info) => {
					router.push(
						{
							pathname: router.pathname
						},
						router.asPath,
						{
							locale: info.key.toLocaleLowerCase()
						}
					)
					const newRegion = countryOptions.find((option) => option.regionName === info.key)
					if (!newRegion) {
						return
					}
					setRegion(newRegion.regionId, newRegion.countryIso)
				}
			}}
		>
			<SC.RegionPickerTrigger>{router.locale?.toUpperCase()}</SC.RegionPickerTrigger>
		</Dropdown>
	)
}

export default RegionPicker

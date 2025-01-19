import { useRouter } from 'next/router'
import { Popover, Select } from 'react-aria-components'

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
		<Select
			aria-label='Region picker'
			selectedKey={router.locale ?? 'en'}
			onSelectionChange={(key) => {
				router.push(
					{
						pathname: router.pathname
					},
					router.asPath,
					{
						locale: (key as string).toLowerCase()
					}
				)
				const newRegion = countryOptions.find((option) => option.regionName === key)
				if (!newRegion) {
					return
				}
				setRegion(newRegion.regionId, newRegion.countryIso)
			}}
		>
			<SC.Button>{router.locale?.toUpperCase()}</SC.Button>
			<Popover>
				<SC.ListBox>
					{menuItems.map((item) => (
						<SC.ListBoxItem key={item.key} id={item.key}>
							{item.label}
						</SC.ListBoxItem>
					))}
				</SC.ListBox>
			</Popover>
		</Select>
	)
}

export default RegionPicker

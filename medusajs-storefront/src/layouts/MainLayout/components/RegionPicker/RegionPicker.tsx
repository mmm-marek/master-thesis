import { Dropdown } from 'antd'
import { useRouter } from 'next/router'

import useCountryOptions from '@/hooks/region/useCountryOptions'

import * as SC from './RegionPickerStyles'

const RegionPicker = () => {
	const router = useRouter()

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
				}
			}}
		>
			<SC.RegionPickerTrigger>{router.locale}</SC.RegionPickerTrigger>
		</Dropdown>
	)
}

export default RegionPicker

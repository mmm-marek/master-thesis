import { Dropdown } from 'antd'
import React from 'react'

import useCountryOptions from '@/hooks/region/useCountryOptions'

import * as SC from './RegionPickerStyles'

const RegionPicker: React.FC = () => {
	const countryOptions = useCountryOptions()

	const menuItems = countryOptions.map((option) => {
		return {
			key: option.countryId,
			label: option.regionName
		}
	})

	return (
		<Dropdown
			menu={{
				items: menuItems,
				selectable: true
			}}
		>
			<SC.RegionPickerTrigger>Selectable</SC.RegionPickerTrigger>
		</Dropdown>
	)
}

export default RegionPicker

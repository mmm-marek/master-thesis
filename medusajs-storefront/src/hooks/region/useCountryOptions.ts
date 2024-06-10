import { useRegions } from 'medusa-react'
import { useMemo } from 'react'

type CountryOption = {
	countryId: number
	countryIso: string
	countryName: string
	regionId: string
	regionName: string
}

const useCountryOptions = () => {
	const { regions } = useRegions()

	const options: CountryOption[] = useMemo(() => {
		if (!regions) {
			return []
		}

		return regions
			.map((region) => {
				return region.countries.map((country) => ({
					countryId: country.id,
					countryIso: country.iso_2,
					countryName: country.display_name,
					regionId: region.id,
					regionName: region.name
				}))
			})
			.flat()
	}, [regions])

	return options
}

export default useCountryOptions

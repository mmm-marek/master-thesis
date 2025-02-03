import { ChefHatIcon, MilkIcon, ShirtIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'styled-components'

import Error from '@/components/Error/Error'
import Loading from '@/components/Loading/Loading'
import useGetLocalizedCategories from '@/hooks/categories/useGetLocalizedCategories'
import { useStore } from '@/providers/StoreProvider'
import { PATHS } from '@/utils/enums'

import * as SC from './CategoriesStyles'

const Categories = () => {
	const theme = useTheme()
	const { cart } = useStore()
	const t = useTranslations('containers.landing')
	const { data: categories, isError, isLoading } = useGetLocalizedCategories(cart?.region_id)

	if (isLoading) {
		return <Loading />
	}

	if (isError) {
		return <Error />
	}

	const getIconByCategoryIndex = (index: number) => {
		switch (index) {
			case 0:
				return <ShirtIcon size={220} color={theme.tokens['color-base-surface-quaternary']} />
			case 1:
				return <ChefHatIcon size={220} color={theme.tokens['color-base-surface-quaternary']} />
			case 2:
				return <MilkIcon size={220} color={theme.tokens['color-base-surface-quaternary']} />
			default:
				return <MilkIcon size={220} color={theme.tokens['color-base-surface-quaternary']} />
		}
	}

	return (
		<SC.Container>
			<SC.IllustrationImage src='/images/t-shirt-illustration.png' alt={t('grTshirt')} width={1180} height={904} />
			{categories.map((category, index) => (
				<SC.CategoryCard key={category.id}>
					<SC.CategoryLink href={`${PATHS.CATEGORY}/${category.handle}`}>{category.localizedName}</SC.CategoryLink>
					<SC.Description>{category.localizedDescription}</SC.Description>
					<SC.IconWrapper>{getIconByCategoryIndex(index)}</SC.IconWrapper>
				</SC.CategoryCard>
			))}
		</SC.Container>
	)
}

export default Categories

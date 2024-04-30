import { EmptyProps } from 'antd'
import { useTranslations } from 'next-intl'

import EmptyImageDark from '@/assets/icons/empty-dark.svg?url'
import EmptyImageLight from '@/assets/icons/empty-light.svg?url'
import { useTheme } from '@/providers/ThemeProvider'
import { THEME } from '@/utils/enums'

import * as SC from './EmptyStyles'

const Empty = (props: EmptyProps) => {
	const t = useTranslations('atoms.empty')
	const { image, children, description = t('noData'), ...restProps } = props
	const { themeName } = useTheme()

	let img = image

	if (!image) {
		img = themeName === THEME.DARK ? EmptyImageDark : EmptyImageLight
	}
	return (
		<SC.Empty image={img} description={description} {...restProps}>
			{children}
		</SC.Empty>
	)
}

export default Empty

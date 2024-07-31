import { ConfigProvider } from 'antd'
import { Locale } from 'antd/lib/locale'
import { PropsWithChildren } from 'react'
import { useTheme } from 'styled-components'

import { INTER_FONT_VARIABLE } from '@/styles/helpers'

type AntdProviderProps = PropsWithChildren & {
	locale: Locale
}

const AntdProvider = ({ children, locale }: AntdProviderProps) => {
	const theme = useTheme()

	return (
		<ConfigProvider
			locale={locale}
			theme={{
				components: {
					Radio: {
						colorPrimary: theme.tokens['color-base-action-primary-default'],
						colorPrimaryActive: theme.tokens['color-base-action-primary-active'],
						colorPrimaryBorder: theme.tokens['color-base-action-primary-default'],
						colorPrimaryHover: theme.tokens['color-base-action-primary-hover'],
						fontFamily: INTER_FONT_VARIABLE
					}
				}
			}}
		>
			{children}
		</ConfigProvider>
	)
}

export default AntdProvider

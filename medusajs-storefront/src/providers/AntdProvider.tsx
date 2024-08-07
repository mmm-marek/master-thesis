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
					},
					Input: {
						paddingBlock: 16,
						paddingInline: 16,
						borderRadius: 24,
						colorBgContainer: theme.tokens['color-base-surface-tertiary'],
						colorBorder: theme.tokens['color-base-surface-tertiary'],
						hoverBg: theme.tokens['color-base-surface-quaternary'],
						hoverBorderColor: theme.tokens['color-base-surface-quaternary'],
						colorBgContainerDisabled: theme.tokens['color-base-surface-tertiary'],
						activeBg: theme.tokens['color-base-surface-primary'],
						activeBorderColor: theme.tokens['color-base-action-primary-active'],
						activeShadow: theme.tokens['ring-primary-xs'],
						errorActiveShadow: theme.tokens['ring-destructive-xs'],
						colorError: theme.tokens['color-base-state-error-fg'],
						colorErrorBorderHover: theme.tokens['color-base-state-error-fg'],
						colorText: theme.tokens['color-base-content-primary'],
						colorTextDisabled: theme.tokens['color-base-content-quaternary'],
						colorTextPlaceholder: theme.tokens['color-base-content-tertiary']
					}
				}
			}}
		>
			{children}
		</ConfigProvider>
	)
}

export default AntdProvider

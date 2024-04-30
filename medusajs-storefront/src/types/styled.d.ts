import 'styled-components'
import { DarkTheme, LightTheme } from '@/styles/theme'

declare module 'styled-components' {
	export interface DefaultTheme extends LightTheme, DarkTheme {}
}

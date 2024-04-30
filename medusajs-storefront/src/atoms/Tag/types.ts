import { TagProps as AntdTagProps } from 'antd'

export type Placement = 'start' | 'end'

export type Size = 'sm' | 'md' | 'lg'

export type TagType =
	| 'primary'
	| 'secondary'
	| 'destructive'
	| 'success'
	| 'warning'
	| 'error'
	| 'info'
	| 'help'
	| 'ascent1'
	| 'ascent2'
	| 'ascent3'
	| 'ascent4'
	| 'ascent5'

export type IconInfo = {
	icon: React.ReactNode
	placement: Placement
	iconSize: Size
}

export type TagProps = AntdTagProps & {
	size?: Size
	type?: TagType
	outline?: boolean
	iconInfo?: IconInfo
}

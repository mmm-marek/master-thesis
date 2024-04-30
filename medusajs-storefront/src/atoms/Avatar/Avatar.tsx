import DefaultAvatarDark from '@/assets/icons/avatar-default-dark.svg?url'
import DefaultAvatar from '@/assets/icons/avatar-default.svg?url'
import { useTheme } from '@/providers/ThemeProvider'
import { THEME } from '@/utils/enums'

import * as SC from './AvatarStyles'
import { AvatarProps } from './types'

const Avatar = ({ width = 24, height = 24, src, defaultImage, alt, isCircle, badge }: AvatarProps) => {
	const { themeName } = useTheme()
	let source = src || defaultImage

	if (!source) {
		source = themeName === THEME.DARK ? DefaultAvatarDark : DefaultAvatar
	}

	const avatar = <SC.Avatar src={source} width={width} height={height} alt={alt} $isCircle={isCircle} />

	return badge ? <SC.Badge count={badge}>{avatar}</SC.Badge> : avatar
}

export default Avatar

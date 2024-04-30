import * as SC from './TagStyles'
import { TagProps } from './types'

const Tag = (props: TagProps) => {
	const { size = 'md', type = 'primary', outline, iconInfo, children, ...rest } = props

	return (
		<SC.Tag {...rest} $size={size} $type={type} $outline={outline} $iconSize={iconInfo?.iconSize} $iconPlacement={iconInfo?.placement}>
			<SC.IconWrapper>{iconInfo && iconInfo.placement === 'start' && iconInfo.icon}</SC.IconWrapper>
			{children}
			<SC.IconWrapper>{iconInfo && iconInfo.placement === 'end' && iconInfo.icon}</SC.IconWrapper>
		</SC.Tag>
	)
}

export default Tag

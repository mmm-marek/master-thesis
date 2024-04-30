import Tag from '../Tag/Tag'
import { SelectOptionWithIcon, SelectOptionWithTag } from '@/types/interfaces'

import * as SC from './OptionRenderStyles'

export const optionRenderIcon = (option: SelectOptionWithIcon) => {
	const { label, extra } = option
	return (
		<SC.OptionContainer>
			{extra?.icon ? <SC.ImageContainer>{extra.icon}</SC.ImageContainer> : <SC.IconPlaceholder />}
			<SC.OptionLabel>{label}</SC.OptionLabel>
		</SC.OptionContainer>
	)
}

export const optionRenderTag = (option: SelectOptionWithTag) => {
	const { label, extra } = option
	return (
		<Tag size='sm' type={extra?.tagType}>
			{label}
		</Tag>
	)
}

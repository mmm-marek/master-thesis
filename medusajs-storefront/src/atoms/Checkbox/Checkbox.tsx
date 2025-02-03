import { Check } from 'lucide-react'
import { useTheme } from 'styled-components'

import * as SC from './CheckboxStyles'
import { CheckboxProps } from './types'

const Checkbox = ({ label, ...rest }: CheckboxProps) => {
	const theme = useTheme()

	return (
		<SC.Checkbox {...rest}>
			<SC.SvgWrapper>{rest.isSelected && <Check size={18} color={theme.tokens['color-base-action-primary-active']} />}</SC.SvgWrapper>
			{label}
		</SC.Checkbox>
	)
}

export default Checkbox

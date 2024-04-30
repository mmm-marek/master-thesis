import styled from 'styled-components'

import { textSmMedium, truncate } from '@/styles/helpers'

export const ImageContainer = styled.div`
	flex-shrink: 0;
	width: 20px;
	height: 20px;
`

export const IconPlaceholder = styled.div`
	flex-shrink: 0;
	border-radius: ${({ theme }) => theme.borderRadius.circle};
	background: ${({ theme }) => theme.tokens['color-base-surface-tertiary']};
	width: 20px;
	height: 20px;
`

export const OptionContainer = styled.div`
	display: flex;
	gap: ${({ theme }) => theme.spacing[8]};
	align-items: center;
	padding-top: ${({ theme }) => theme.spacing[2]};
`

export const OptionLabel = styled.div`
	${textSmMedium};
	${truncate};
	color: ${({ theme }) => theme.tokens['color-base-content-primary']};
`

import styled from 'styled-components'

import { headingSmSemibold, textMdRegular } from '@/styles/helpers'

export const Wrapper = styled.div`
	width: 100%;
`

export const Header = styled.header`
	margin-bottom: ${({ theme }) => theme.spacing[32]};
	text-align: center;
`

export const Circle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: auto;
	margin-bottom: ${({ theme }) => theme.spacing[24]};
	margin-left: auto;
	border-radius: 999px;
	background-color: ${({ theme }) => theme.tokens['color-base-state-success-bg']};
	width: 56px;
	height: 56px;

	svg {
		width: 28px;
		height: 28px;
		color: ${({ theme }) => theme.tokens['color-base-state-success-fg']};
	}
`

export const Title = styled.div`
	margin-bottom: ${({ theme }) => theme.spacingRem[4]};
	${headingSmSemibold};
	text-align: center;
`

export const InfoMd = styled.span`
	${textMdRegular};
	color: ${({ theme }) => theme.tokens['color-base-content-tertiary']};
`

export const BackBtnWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: ${({ theme }) => theme.spacing[32]};
`

export const InfoLink = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${({ theme }) => theme.spacing[4]};
	align-items: center;
	justify-content: center;
	margin-top: ${({ theme }) => theme.spacing[24]};
`

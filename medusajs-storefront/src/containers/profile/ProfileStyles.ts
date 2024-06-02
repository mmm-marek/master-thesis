import styled, { css } from 'styled-components'

import { headingXsSemibold, textSmMedium, textSmRegular, textXlRegular } from '@/styles/helpers'

export const SectionHeading = styled.h2`
	${({ theme }) => css`
		margin-bottom: 8px;
		color: ${theme.tokens['color-base-content-primary']};
		${headingXsSemibold};
	`}
`

export const SubsectionHeading = styled.h3`
	${({ theme }) => css`
		color: ${theme.tokens['color-base-content-primary']};
		${textXlRegular};
	`}
`

export const ProfileSettingsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 32px;
`

export const ProfileItem = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
`

export const ProfileItemLabel = styled.div`
	${textSmRegular};
	color: ${(p) => p.theme.tokens['color-base-content-secondary']};
`

export const ProfileItemValue = styled.div`
	${textSmMedium};
	color: ${(p) => p.theme.tokens['color-base-content-primary']};
`

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

export const SubsectionHeadingWrapper = styled.div`
	display: flex;
	gap: 16px;
	align-items: center;
	width: 100%;
`

export const ShippingAddressesWrapper = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 0;
	list-style: none;
`

export const ShippingAddressWrapper = styled.li`
	${({ theme }) => css`
		display: flex;
		align-items: start;
		justify-content: space-between;
		border: 1px solid ${theme.tokens['color-base-surface-tertiary']};
		border-radius: 8px;
		padding: 8px;
	`}
`

export const ShippingAddressLabel = styled.div`
	${textSmMedium};
	color: ${(p) => p.theme.tokens['color-base-content-primary']};
`

export const ShippingAddressInfo = styled.div`
	display: flex;
	flex-direction: column;
`

export const ShippingAddressActions = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
`

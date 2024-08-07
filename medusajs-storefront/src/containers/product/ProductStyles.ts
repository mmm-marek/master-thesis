import { Radio } from 'antd'
import Image from 'next/image'
import styled, { css } from 'styled-components'

import { breakpoints, headingSmSemibold, textMdRegular, textSmRegular, textXxlSemibold } from '@/styles/helpers'

export const Thumbnail = styled(Image)`
	width: 100%;
	height: auto;
`

export const ProductTitle = styled.h1`
	${({ theme }) => css`
		${headingSmSemibold};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const Material = styled.p`
	${({ theme }) => css`
		${textSmRegular};
		color: ${theme.tokens['color-base-content-secondary']};
	`}
`

export const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`

export const VariantsSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`

export const VariantsTitle = styled.h2`
	${({ theme }) => css`
		${textXxlSemibold};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const VariantsRadioGroup = styled(Radio.Group)`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
	gap: 8px;
	max-width: 400px;
`

export const RadioWrapper = styled.div<{ $selected: boolean }>`
	${({ theme, $selected }) => css`
		display: flex;
		justify-content: center;
		border: 1px solid ${theme.tokens['color-base-action-secondary-default']};
		border-radius: 16px;
		background-color: ${$selected ? theme.tokens['color-base-surface-tertiary'] : 'transparent'};
		cursor: pointer;
		padding: 4px;
	`}
`

export const RadioVariant = styled(Radio)`
	${({ theme }) => css`
		display: flex;
		justify-content: center;
		margin: auto;
		width: 100%;
		${textSmRegular};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

export const ProductContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;

	@media (min-width: ${breakpoints.lg}px) {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
`

export const PriceWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-items: end;

	@media (min-width: ${breakpoints.sm}px) {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
`

export const Price = styled.p`
	${({ theme }) => css`
		${headingSmSemibold};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const Divider = styled.div`
	${({ theme }) => css`
		border-bottom: 1px solid ${theme.tokens['color-base-action-secondary-default']};
		width: 100%;
	`}
`

export const Description = styled.p`
	${({ theme }) => css`
		${textMdRegular};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const QuantityInfo = styled.p`
	${({ theme }) => css`
		${textSmRegular};
		color: ${theme.tokens['color-base-content-secondary']};
	`}
`

export const Strong = styled.strong`
	${({ theme }) => css`
		color: ${theme.tokens['color-base-content-primary']};
		font-weight: 400;
	`}
`

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

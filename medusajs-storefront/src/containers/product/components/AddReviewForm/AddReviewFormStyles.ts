import {
	Label as AriaLabel,
	Slider as AriaSlider,
	SliderOutput as AriaSliderOutput,
	SliderThumb as AriaSliderThumb,
	SliderTrack as AriaSliderTrack
} from 'react-aria-components'
import styled, { css } from 'styled-components'

import { headingXsSemibold, textSmMedium, textSmRegular } from '@/styles/helpers'

export const FormWrapper = styled.form`
	${({ theme }) => css`
		display: flex;
		flex-direction: column;
		width: 100%;

		& .ant-rate {
			color: ${theme.tokens['color-base-action-primary-default']};
		}
	`}
`

export const Title = styled.h3`
	${({ theme }) => css`
		margin-bottom: 8px;
		color: ${theme.tokens['color-base-content-primary']};
		${headingXsSemibold}
	`}
`

export const ButtonsWrapper = styled.div`
	display: flex;
	gap: 8px;
	margin-left: auto;
`

export const RatingWrapper = styled.div`
	${({ theme }) => css`
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-bottom: 16px;
		${textSmMedium};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const FieldsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding-bottom: 16px;
`

export const Label = styled(AriaLabel)`
	${({ theme }) => css`
		grid-area: label;
		color: ${theme.tokens['color-base-content-primary']};
		${textSmRegular};
	`}
`

export const Slider = styled(AriaSlider)`
	${({ theme }) => css`
		display: grid;
		flex-direction: column;
		grid-template-areas:
			'label output'
			'track track';
		grid-template-columns: 1fr auto;
		width: 240px;
		max-width: 240px;
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const SliderOutput = styled(AriaSliderOutput)`
	${({ theme }) => css`
		grid-area: output;
		color: ${theme.tokens['color-base-content-primary']};
		${textSmRegular};
	`}
`

export const SliderTrack = styled(AriaSliderTrack)`
	${({ theme }) => css`
		position: relative;
		grid-area: track;
		width: 100%;
		height: 30px;

		/* track line */
		&::before {
			display: block;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			border-radius: 2px;
			background: ${theme.tokens['color-base-action-secondary-default']};
			width: 100%;
			height: 4px;
			content: '';
		}
	`}
`

export const SliderThumb = styled(AriaSliderThumb)`
	${({ theme }) => css`
		top: 50%;
		border: none;
		border-radius: 50%;
		background: ${theme.tokens['color-base-action-primary-default']};
		width: 1.429rem;
		height: 1.429rem;

		&[data-dragging] {
			background: ${theme.tokens['color-base-action-primary-active']};
		}

		&[data-focus-visible] {
			outline: 2px solid ${theme.tokens['color-base-action-primary-hover']};
		}
	`}
`

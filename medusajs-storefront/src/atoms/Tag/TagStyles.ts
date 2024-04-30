import { Tag as AntdTag } from 'antd'
import styled, { css } from 'styled-components'

import { textSmMedium, textXsRegular } from '@/styles/helpers'

import { Placement, Size, TagType } from './types'

const smSize = css`
	padding: 0.125rem 0.5rem;
	${textXsRegular};
`

const mdSize = css`
	padding: 0.125rem 0.625rem;
	${textSmMedium};
`

const lgSize = css`
	padding: 0.25rem 0.75rem;
	${textSmMedium};
`

const smallIconSize = css`
	svg {
		width: 8px;
		height: 8px;
	}
`

const mediumIconSize = css`
	svg {
		width: 12px;
		height: 12px;
	}
`

const largeIconSize = css`
	svg {
		width: 16px;
		height: 16px;
	}
`

function getFillStyles(type: TagType) {
	switch (type) {
		case 'primary':
			return css`
				background-color: ${(p) => p.theme.tokens['color-base-action-primary-bg']};
				color: ${(p) => p.theme.tokens['color-base-action-primary-default']};
			`
		case 'secondary':
			return css`
				background-color: ${(p) => p.theme.tokens['color-base-action-secondary-default']};
				color: ${(p) => p.theme.tokens['color-base-content-secondary']};
			`
		case 'destructive':
			return css`
				background-color: ${(p) => p.theme.tokens['color-base-action-destructive-bg']};
				color: ${(p) => p.theme.tokens['color-base-action-destructive-default']};
			`
		case 'success':
			return css`
				background-color: ${(p) => p.theme.tokens['color-base-state-success-bg']};
				color: ${(p) => p.theme.tokens['color-base-state-success-fg']};
			`
		case 'warning':
			return css`
				background-color: ${(p) => p.theme.tokens['color-base-state-warning-bg']};
				color: ${(p) => p.theme.tokens['color-base-state-warning-fg']};
			`
		case 'error':
			return css`
				background-color: ${(p) => p.theme.tokens['color-base-state-error-bg']};
				color: ${(p) => p.theme.tokens['color-base-state-error-fg']};
			`
		case 'info':
			return css`
				background-color: ${(p) => p.theme.tokens['color-base-state-info-bg']};
				color: ${(p) => p.theme.tokens['color-base-state-info-fg']};
			`
		case 'help':
			return css`
				background-color: ${(p) => p.theme.tokens['color-base-state-help-bg']};
				color: ${(p) => p.theme.tokens['color-base-state-help-fg']};
			`
		case 'ascent1':
			return css`
				background-color: ${(p) => p.theme.tokens['color-base-ascent-1-bg']};
				color: ${(p) => p.theme.tokens['color-base-ascent-1-fg']};
			`
		case 'ascent2':
			return css`
				background-color: ${(p) => p.theme.tokens['color-base-ascent-2-bg']};
				color: ${(p) => p.theme.tokens['color-base-ascent-2-fg']};
			`
		case 'ascent3':
			return css`
				background-color: ${(p) => p.theme.tokens['color-base-ascent-3-bg']};
				color: ${(p) => p.theme.tokens['color-base-ascent-3-fg']};
			`
		case 'ascent4':
			return css`
				background-color: ${(p) => p.theme.tokens['color-base-ascent-4-bg']};
				color: ${(p) => p.theme.tokens['color-base-ascent-4-fg']};
			`
		case 'ascent5':
			return css`
				background-color: ${(p) => p.theme.tokens['color-base-ascent-5-bg']};
				color: ${(p) => p.theme.tokens['color-base-ascent-5-fg']};
			`
		default:
			return css`
				background-color: ${(p) => p.theme.tokens['color-base-action-primary-bg']};
			`
	}
}

function getOutlineStyles(type: TagType) {
	switch (type) {
		case 'primary':
			return css`
				border-color: ${(p) => p.theme.tokens['color-base-action-primary-default']};
				color: ${(p) => p.theme.tokens['color-base-action-primary-default']};
			`
		case 'secondary':
			return css`
				border-color: ${(p) => p.theme.tokens['color-base-content-secondary']};
				color: ${(p) => p.theme.tokens['color-base-content-secondary']};
			`
		case 'destructive':
			return css`
				border-color: ${(p) => p.theme.tokens['color-base-action-destructive-default']};
				color: ${(p) => p.theme.tokens['color-base-action-destructive-default']};
			`
		case 'success':
			return css`
				border-color: ${(p) => p.theme.tokens['color-base-state-success-fg']};
				color: ${(p) => p.theme.tokens['color-base-state-success-fg']};
			`
		case 'warning':
			return css`
				border-color: ${(p) => p.theme.tokens['color-base-state-warning-fg']};
				color: ${(p) => p.theme.tokens['color-base-state-warning-fg']};
			`
		case 'error':
			return css`
				border-color: ${(p) => p.theme.tokens['color-base-state-error-fg']};
				color: ${(p) => p.theme.tokens['color-base-state-error-fg']};
			`
		case 'info':
			return css`
				border-color: ${(p) => p.theme.tokens['color-base-state-info-fg']};
				color: ${(p) => p.theme.tokens['color-base-state-info-fg']};
			`
		case 'help':
			return css`
				border-color: ${(p) => p.theme.tokens['color-base-state-help-fg']};
				color: ${(p) => p.theme.tokens['color-base-state-help-fg']};
			`
		case 'ascent1':
			return css`
				border-color: ${(p) => p.theme.tokens['color-base-ascent-1-fg']};
				color: ${(p) => p.theme.tokens['color-base-ascent-1-fg']};
			`
		case 'ascent2':
			return css`
				border-color: ${(p) => p.theme.tokens['color-base-ascent-2-fg']};
				color: ${(p) => p.theme.tokens['color-base-ascent-2-fg']};
			`
		case 'ascent3':
			return css`
				border-color: ${(p) => p.theme.tokens['color-base-ascent-3-fg']};
				color: ${(p) => p.theme.tokens['color-base-ascent-3-fg']};
			`
		case 'ascent4':
			return css`
				border-color: ${(p) => p.theme.tokens['color-base-ascent-4-fg']};
				color: ${(p) => p.theme.tokens['color-base-ascent-4-fg']};
			`
		case 'ascent5':
			return css`
				border-color: ${(p) => p.theme.tokens['color-base-ascent-5-fg']};
				color: ${(p) => p.theme.tokens['color-base-ascent-5-fg']};
			`
		default:
			return css`
				border-color: ${(p) => p.theme.tokens['color-base-action-primary-default']};
				color: ${(p) => p.theme.tokens['color-base-action-primary-default']};
			`
	}
}

function getSmallIconPlacementStyles(tagSize: Size, placement: Placement = 'start') {
	switch (tagSize) {
		case 'sm':
			return css`
				gap: 4px;
				padding-inline: ${placement === 'start' ? '6px 8px' : '8px 6px'};
			`
		case 'md':
			return css`
				gap: 6px;
				padding-inline: ${placement === 'start' ? '8px 10px' : '10px 8px'};
			`
		case 'lg':
			return css`
				gap: 6px;
				padding-inline: ${placement === 'start' ? '10px 12px' : '12px 10px'};
			`
		default:
			return ''
	}
}

function getMediumIconPlacementStyles(tagSize: Size, placement: Placement = 'start') {
	switch (tagSize) {
		case 'sm':
			return css`
				padding-inline: ${placement === 'start' ? '6px 8px' : '8px 6px'};
			`
		case 'md':
			return css`
				padding-inline: ${placement === 'start' ? '8px 10px' : '10px 8px'};
			`
		case 'lg':
			return css`
				padding-inline: ${placement === 'start' ? '10px 12px' : '12px 10px'};
			`
		default:
			return ''
	}
}

function getLargeIconPlacementStyles(tagSize: Size, placement: Placement = 'start') {
	switch (tagSize) {
		case 'sm':
			return css`
				padding-inline: ${placement === 'start' ? '3px 8px' : '8px 3px'};
			`
		case 'md':
			return css`
				padding-inline: ${placement === 'start' ? '4px 10px' : '10px 4px'};
			`
		case 'lg':
			return css`
				padding-inline: ${placement === 'start' ? '6px 12px' : '12px 6px'};
			`
		default:
			return ''
	}
}

export const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`

export const Tag = styled(AntdTag)<{
	$size: Size
	$type: TagType
	$outline?: boolean
	$iconSize?: Size
	$iconPlacement?: 'start' | 'end'
}>`
	&.ant-tag {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
		border-radius: ${(p) => p.theme.borderRadius[16]};
		width: fit-content;
		height: fit-content;
		font-weight: 500;

		${({ $size }) => {
			switch ($size) {
				case 'sm':
					return smSize
				case 'md':
					return mdSize
				case 'lg':
					return lgSize
				default:
					return mdSize
			}
		}}

		${({ $outline, $type }) => {
			if ($outline) {
				return css`
					border: ${(p) => `${p.theme.borderWidth.sm} solid`};
					background: transparent;
					${getOutlineStyles($type)}
				`
			}
			return css`
				border: none;
				${getFillStyles($type)}
			`
		}}

        ${({ $iconSize, $iconPlacement, $size }) => {
			switch ($iconSize) {
				case 'sm':
					return css`
						${smallIconSize}
						${getSmallIconPlacementStyles($size, $iconPlacement)}
					`
				case 'md':
					return css`
						gap: 4px;
						${mediumIconSize}
						${getMediumIconPlacementStyles($size, $iconPlacement)}
					`
				case 'lg':
					return css`
						gap: 6px;
						${largeIconSize}
						${getLargeIconPlacementStyles($size, $iconPlacement)}
					`
				default:
					return ''
			}
		}}
	}
`

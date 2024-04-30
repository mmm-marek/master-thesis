import { Button as AntdButton, ButtonProps } from 'antd'
import styled, { css } from 'styled-components'

import { textSmMedium, textSmSemibold } from '@/styles/helpers'

import { ButtonSize } from './types'

/* 
Icon wrapper
*/

const iconSizeSmall = css`
	width: 16px;
	height: 16px;
`

const iconSizeMiddle = css`
	width: 20px;
	height: 20px;
`

const iconSizeLarge = css`
	width: 20px;
	height: 20px;
`

const iconSizeExtraLarge = css`
	width: 20px;
	height: 20px;
`

export const IconWrapper = styled.span<{ $size: ButtonSize }>`
	display: inline-block;
	line-height: 0;

	/* Size */
	& > svg {
		${(p) => {
			switch (p.$size) {
				case 'small':
					return iconSizeSmall
				case 'middle':
					return iconSizeMiddle
				case 'large':
					return iconSizeLarge
				case 'extra-large':
					return iconSizeExtraLarge
				default:
					return iconSizeMiddle
			}
		}}
	}
`

/* 
Antd resets and button base styles
*/

const antdButtonReset = css`
	outline: none;
	box-shadow: none;
	text-decoration: none;

	&:not(:disabled) {
		opacity: 1; /* resetting antd opacity on loading state */
	}

	& .ant-btn-loading-icon {
		display: none;
	}

	&.ant-btn-icon-only {
		padding: 0;
	}

	.ant-wave {
		display: none;
	}
`

const buttonBaseStyles = css`
	display: flex;
	align-items: center;
	justify-content: center;

	&:disabled {
		opacity: 0.3; /* adding custom opacity on disabled state */
	}
`

/* 
Size variants
*/

const borderRadiusRound = css`
	border-radius: 999px;
`

const borderRadiusCircle = css`
	border-radius: 50%;
`

const sizeSmall = css<{ shape?: ButtonProps['shape']; $isIconOnly?: boolean }>`
	&.ant-btn-sm {
		column-gap: ${(p) => p.theme.spacing[4]};
		padding-inline: ${(p) => p.theme.spacing[8]};
		height: 24px;
		${textSmMedium};

		${(p) =>
			p.$isIconOnly &&
			css`
				padding: 0;
				width: 24px;
			`}

		${(p) => {
			switch (p.shape) {
				case 'round':
					return borderRadiusRound
				case 'circle':
					return borderRadiusCircle
				default:
					return css`
						border-radius: ${p.theme.borderRadius[4]};
					`
			}
		}}
	}
`

const sizeMiddle = css<{ shape?: ButtonProps['shape']; $isIconOnly?: boolean }>`
	column-gap: ${(p) => p.theme.spacing[4]};
	padding-inline: ${(p) => p.theme.spacing[12]};
	height: 32px;
	${textSmSemibold};

	${(p) =>
		p.$isIconOnly &&
		css`
			padding: 0;
			width: 32px;
		`}

	${(p) => {
		switch (p.shape) {
			case 'round':
				return borderRadiusRound
			case 'circle':
				return borderRadiusCircle
			default:
				return css`
					border-radius: ${p.theme.borderRadius[8]};
				`
		}
	}}
`

const sizeLarge = css<{ shape?: ButtonProps['shape']; $isIconOnly?: boolean }>`
	&.ant-btn-lg {
		column-gap: ${(p) => p.theme.spacing[8]};
		padding-inline: ${(p) => p.theme.spacing[24]};
		height: 48px;
		${textSmSemibold};

		${(p) =>
			p.$isIconOnly &&
			css`
				padding: 0;
				width: 48px;
			`}

		${(p) => {
			switch (p.shape) {
				case 'round':
					return borderRadiusRound
				case 'circle':
					return borderRadiusCircle
				default:
					return css`
						border-radius: ${p.theme.borderRadius[8]};
					`
			}
		}}
	}
`

const sizeExtraLarge = css<{ shape?: ButtonProps['shape']; $isIconOnly?: boolean }>`
	column-gap: ${(p) => p.theme.spacing[8]};
	padding-inline: ${(p) => p.theme.spacing[32]};
	height: 56px;
	${textSmSemibold};

	${(p) =>
		p.$isIconOnly &&
		css`
			padding-block: 0;
			padding-inline: 0;
			width: 56px;
		`}

	${(p) => {
		switch (p.shape) {
			case 'round':
				return borderRadiusRound
			case 'circle':
				return borderRadiusCircle
			default:
				return css`
					border-radius: ${p.theme.borderRadius[8]};
				`
		}
	}}
`

/* 
Type variants 
*/

const typeDefault = css<{ $noBackground?: boolean }>`
	&.ant-btn-default {
		${(p) =>
			!p.$noBackground
				? /* with background */
					css`
						border-color: ${p.theme.tokens['color-base-action-secondary-default']};
						background-color: ${p.theme.tokens['color-base-action-secondary-default']};
						color: ${p.theme.tokens['color-base-content-primary']};

						&:disabled {
							border-color: ${p.theme.tokens['color-base-action-secondary-disable']};
							background-color: ${p.theme.tokens['color-base-action-secondary-disable']};
							color: ${p.theme.tokens['color-base-content-primary']};
						}

						&:focus-visible:not(:disabled) {
							outline: none;
							border-color: ${p.theme.tokens['color-base-action-secondary-active']};
							box-shadow: ${p.theme.tokens['ring-secondary-xs']};
							background-color: ${p.theme.tokens['color-base-action-secondary-active']};
						}

						&:not(:disabled):hover,
						&:not(:disabled):active {
							border-color: ${p.theme.tokens['color-base-action-secondary-hover']};
							background-color: ${p.theme.tokens['color-base-action-secondary-hover']};
							color: ${p.theme.tokens['color-base-content-primary']};
						}
					`
				: /* without background */
					css`
						border-color: transparent;
						background-clip: padding-box;
						background-color: transparent;
						color: ${p.theme.tokens['color-base-content-primary']};

						&:disabled {
							border-color: transparent;
							background-color: transparent;
							color: ${p.theme.tokens['color-base-content-primary']};
						} /* NOTE: to avoid different colors on background and border: https://stackoverflow.com/questions/35148726/border-and-background-show-up-as-different-colors-even-when-color-values-are-sam/35148744#35148744 */

						&:not(:disabled):hover,
						&:not(:disabled):active {
							border-color: ${p.theme.tokens['color-base-action-secondary-bg10']};
							background-color: ${p.theme.tokens['color-base-action-secondary-bg10']};
							color: ${p.theme.tokens['color-base-content-primary']};
						}

						&:focus-visible:not(:disabled) {
							outline: none;
							border-color: ${p.theme.tokens['color-base-action-secondary-bg10']};
							box-shadow: ${p.theme.tokens['ring-secondary-xs']};
							background-color: ${p.theme.tokens['color-base-action-secondary-bg10']};
							color: ${p.theme.tokens['color-base-content-primary']};
						}
					`}
	}
`

const typePrimary = css<{ $noBackground?: boolean }>`
	&.ant-btn-primary {
		${(p) =>
			!p.$noBackground
				? /* with background */
					css`
						border-color: ${p.theme.tokens['color-base-action-primary-default']};
						background-color: ${p.theme.tokens['color-base-action-primary-default']};
						color: ${p.theme.tokens['color-inverse-content-primary']};

						&:disabled {
							border-color: ${p.theme.tokens['color-base-action-primary-disable']};
							background-color: ${p.theme.tokens['color-base-action-primary-disable']};
							color: ${p.theme.tokens['color-inverse-content-primary']};
						}

						&:focus-visible:not(:disabled) {
							outline: none;
							border-color: ${p.theme.tokens['color-base-action-primary-active']};
							box-shadow: ${p.theme.tokens['ring-primary-xs']};
							background-color: ${p.theme.tokens['color-base-action-primary-active']};
							color: ${p.theme.tokens['color-inverse-content-primary']};
						}

						&:not(:disabled):hover,
						&:not(:disabled):active {
							border-color: ${p.theme.tokens['color-base-action-primary-hover']};
							background-color: ${p.theme.tokens['color-base-action-primary-hover']};
							color: ${p.theme.tokens['color-inverse-content-primary']};
						}
					`
				: /* without background */
					css`
						border-color: transparent;
						background-clip: padding-box;
						background-color: transparent;
						color: ${p.theme.tokens['color-base-action-primary-default']};

						&:disabled {
							border-color: transparent;
							background-color: transparent;
							color: ${p.theme.tokens['color-base-action-primary-default']};
						} /* NOTE: to avoid different colors on background and border: https://stackoverflow.com/questions/35148726/border-and-background-show-up-as-different-colors-even-when-color-values-are-sam/35148744#35148744 */

						&:not(:disabled):hover,
						&:not(:disabled):active {
							border-color: ${p.theme.tokens['color-base-action-primary-bg10']};
							background-color: ${p.theme.tokens['color-base-action-primary-bg10']};
							color: ${p.theme.tokens['color-base-action-primary-default']};
						}

						&:focus-visible:not(:disabled) {
							outline: none;
							border-color: ${p.theme.tokens['color-base-action-primary-bg10']};
							box-shadow: ${p.theme.tokens['ring-primary-xs']};
							background-color: ${p.theme.tokens['color-base-action-primary-bg10']};
							color: ${p.theme.tokens['color-base-action-primary-default']};
						}
					`}
	}
`

const typeDangerous = css<{ $noBackground?: boolean }>`
	&.ant-btn-dangerous {
		${(p) =>
			!p.$noBackground
				? /* with background */
					css`
						border-color: ${p.theme.tokens['color-base-action-destructive-default']};
						background-color: ${p.theme.tokens['color-base-action-destructive-default']};
						color: ${p.theme.tokens['color-inverse-content-primary']};

						&:disabled {
							border-color: ${p.theme.tokens['color-base-action-destructive-disable']};
							background-color: ${p.theme.tokens['color-base-action-destructive-disable']};
							color: ${p.theme.tokens['color-inverse-content-primary']};
						}

						&:focus-visible:not(:disabled) {
							outline: none;
							border-color: ${p.theme.tokens['color-base-action-destructive-active']};
							box-shadow: ${p.theme.tokens['ring-destructive-xs']};
							background-color: ${p.theme.tokens['color-base-action-destructive-active']};
						}

						&:not(:disabled, .ant-btn-disabled):hover,
						&:not(:disabled, .ant-btn-disabled):active {
							border-color: ${p.theme.tokens['color-base-action-destructive-hover']};
							background-color: ${p.theme.tokens['color-base-action-destructive-hover']};
							color: ${p.theme.tokens['color-inverse-content-primary']};
						}
					`
				: /* without background */
					css`
						border-color: transparent;
						background-clip: padding-box;
						background-color: transparent;
						color: ${p.theme.tokens['color-base-action-destructive-default']};

						&:disabled {
							border-color: transparent;
							background-color: transparent;
							color: ${p.theme.tokens['color-base-action-destructive-default']};
						} /* NOTE: to avoid different colors on background and border: https://stackoverflow.com/questions/35148726/border-and-background-show-up-as-different-colors-even-when-color-values-are-sam/35148744#35148744 */

						&:not(:disabled):hover,
						&:not(:disabled):active {
							border-color: ${p.theme.tokens['color-base-action-destructive-bg10']};
							background-color: ${p.theme.tokens['color-base-action-destructive-bg10']};
							color: ${p.theme.tokens['color-base-action-destructive-default']};
						}

						&:focus-visible:not(:disabled) {
							outline: none;
							border-color: ${p.theme.tokens['color-base-action-destructive-bg10']};
							box-shadow: ${p.theme.tokens['ring-destructive-xs']};
							background-color: ${p.theme.tokens['color-base-action-destructive-bg10']};
						}
					`}
	}
`

const typeText = css`
	&.ant-btn-text {
		color: ${(p) => p.theme.tokens['color-base-content-secondary']};

		&:disabled {
			color: ${(p) => p.theme.tokens['color-base-content-secondary']};
		}

		&:focus-visible:not(:disabled) {
			outline: none;
			box-shadow: ${(p) => p.theme.tokens['ring-secondary-xs']};
			background-color: ${(p) => p.theme.tokens['color-base-action-secondary-bg10']};
			color: ${(p) => p.theme.tokens['color-base-content-primary']};
		}

		&:not(:disabled):hover,
		&:not(:disabled):active {
			background-color: ${(p) => p.theme.tokens['color-base-action-secondary-bg10']};
			color: ${(p) => p.theme.tokens['color-base-content-primary']};
		}
	}
`

/* 
Button
*/

export const Button = styled(AntdButton)<{ $noBackground?: boolean; $isIconOnly?: boolean }>`
	&.ant-btn {
		${antdButtonReset};
		${buttonBaseStyles};
		/* Size */
		${(p) => {
			switch (p.size as ButtonSize) {
				case 'small':
					return sizeSmall
				case 'middle':
					return sizeMiddle
				case 'large':
					return sizeLarge
				case 'extra-large':
					return sizeExtraLarge
				default:
					return sizeMiddle
			}
		}}

		/* Type */
	${(p) => {
			if (p.type === 'default') {
				return typeDefault
			}
			if (p.type === 'primary' && !p.danger) {
				return typePrimary
			}
			if (p.type === 'text') {
				return typeText
			}
			if (p.danger) {
				return typeDangerous
			}
			return typeDefault
		}}
	}
`

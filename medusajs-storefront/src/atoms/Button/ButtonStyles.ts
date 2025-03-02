import { Button as AriaButton } from 'react-aria-components'
import styled, { css, keyframes } from 'styled-components'

import { textMdMedium, textSmMedium, textXsMedium } from '@/styles/helpers'

import { ButtonSize, ButtonVariant } from './types'

const scanAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

export const Button = styled(AriaButton)<{ $size: ButtonSize; $variant: ButtonVariant; $isFullWidth?: boolean }>`
	${({ theme, $size, $variant, $isFullWidth }) => css`
		display: flex;
		gap: 8px;
		align-items: center;
		justify-content: center;
		transition: background 300ms ease;
		border: none;
		border-radius: ${theme.borderRadius.circle};
		width: fit-content;
		height: fit-content;

		${$isFullWidth &&
		css`
			width: 100%;
		`}

		${$size === 'small' &&
		css`
			padding: 0.25rem 0.75rem;
			${textXsMedium};
		`}

		${$size === 'medium' &&
		css`
			padding: 0.5rem 1rem;
			${textSmMedium};
		`}

			${$size === 'large' &&
		css`
			padding: 0.75rem 1.25rem;
			${textMdMedium};
		`}

		${$variant === 'primary' &&
		css`
			background: ${theme.tokens['color-base-action-primary-default']};
			color: ${theme.tokens['color-additional-white']};
		`}
		
		${$variant === 'secondary' &&
		css`
			background: ${theme.tokens['color-base-action-secondary-default']};
			color: ${theme.tokens['color-base-content-secondary']};
		`}
			
		&[data-hovered] {
			cursor: pointer;

			${$variant === 'primary' &&
			css`
				background: ${theme.tokens['color-base-action-primary-hover']};
			`}

			${$variant === 'secondary' &&
			css`
				background: ${theme.tokens['color-base-action-secondary-hover']};
			`}
		}

		&[data-pressed] {
			${$variant === 'primary' &&
			css`
				background: ${theme.tokens['color-base-action-primary-active']};
			`}

			${$variant === 'secondary' &&
			css`
				background: ${theme.tokens['color-base-action-secondary-active']};
			`}
		}

		&[data-focused] {
			${$variant === 'primary' &&
			css`
				background: ${theme.tokens['color-base-action-primary-hover']};
			`}

			${$variant === 'secondary' &&
			css`
				background: ${theme.tokens['color-base-action-secondary-hover']};
			`}
		}

		&[data-focus-visible] {
			${$variant === 'primary' &&
			css`
				background: ${theme.tokens['color-base-action-primary-hover']};
			`}

			${$variant === 'secondary' &&
			css`
				background: ${theme.tokens['color-base-action-secondary-hover']};
			`}
		}

		&[data-disabled] {
			opacity: 0.75;
			pointer-events: none;
		}

		&[data-pending] {
			${$variant === 'primary' &&
			css`
				background: linear-gradient(
					90deg,
					${theme.tokens['color-base-action-primary-default']} 0%,
					${theme.tokens['color-base-action-primary-hover']} 50%,
					${theme.tokens['color-base-action-primary-default']} 100%
				);
			`}
			${$variant === 'secondary' &&
			css`
				background: linear-gradient(
					90deg,
					${theme.tokens['color-base-action-secondary-default']} 0%,
					${theme.tokens['color-base-action-secondary-hover']} 50%,
					${theme.tokens['color-base-action-secondary-default']} 100%
				);
			`}
			background-size: 200% 100%;
			animation: ${scanAnimation} 1.25s infinite linear;
		}
	`}
`

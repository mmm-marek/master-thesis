import { Button } from 'react-aria-components'
import styled, { css, keyframes } from 'styled-components'

import { textMdRegular } from '@/styles/helpers'

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`

export const CloseButton = styled(Button)`
	${({ theme }) => css`
		display: flex;
		position: absolute;
		top: 2px;
		right: 10px;
		margin: 0;
		border: none;
		background-color: transparent;
		cursor: pointer;
		padding: 4px;
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

export const ToastRegionContainer = styled.div`
	display: flex;
	position: fixed;
	right: 16px;
	bottom: 16px;
	flex-direction: column;
	gap: 8px;
	z-index: 1000;
`

export const ToastContainer = styled.div`
	${({ theme }) => css`
		display: flex;
		position: relative;
		gap: 12px;
		align-items: center;
		justify-content: space-between;
		border: 1px solid ${theme.tokens['color-base-action-secondary-default']};
		border-radius: 8px;
		box-shadow: ${theme.tokens['drop-shadow-md']};
		background-color: ${theme.tokens['color-base-surface-primary']};
		padding: 12px 16px;
		min-width: 300px;

		&[data-animation='entering'] {
			animation: ${slideIn} 150ms ease-out;
		}

		&[data-animation='queued'] {
			animation: ${fadeIn} 150ms ease-out;
		}

		&[data-animation='exiting'] {
			animation: ${slideOut} 150ms ease-out;
		}
	`}
`

export const ToastContent = styled.div`
	${({ theme }) => css`
		${textMdRegular};
		color: ${theme.tokens['color-base-content-primary']};
	`}
`

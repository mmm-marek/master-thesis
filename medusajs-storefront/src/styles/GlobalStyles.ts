import styled, { createGlobalStyle, css, keyframes } from 'styled-components'

import { WRAPPER_MAX_WIDTH, WRAPPER_PADDING_DESKTOP, WRAPPER_PADDING_MOBILE, breakpoints, screenReaderOnly } from './helpers'

import 'nprogress/nprogress.css'

export const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`

export const skeletonBase = css`
	${({ theme }) => css`
		border-radius: 4px;
		background: ${theme.tokens['color-base-surface-secondary']};
		background-image: linear-gradient(
			90deg,
			${theme.tokens['color-base-surface-secondary']} 0,
			${theme.tokens['color-base-surface-tertiary']} 40px,
			${theme.tokens['color-base-surface-secondary']} 80px
		);
		background-size: 200px 100%;
		animation: ${shimmer} 1.5s infinite linear;
	`}
`

export const GlobalStyle = createGlobalStyle<{ $isDarkMode?: boolean }>`
	/*
	1. Use a more-intuitive box-sizing model.
	*/
	*,
	*::before,
	*::after {
		box-sizing: border-box;
		outline-width: 1px;
		outline-color: ${({ theme }) => theme.tokens['color-base-action-primary-default']};
	}

	/*
	2. Remove default margin
	*/
	* {
		margin: 0;
	}

	/*
	3. Allow percentage-based heights in the application
	*/
	html,
	body {
		height: 100%;
		color-scheme: ${({ $isDarkMode }) => ($isDarkMode ? 'dark' : 'light')};
	}

	/*
	Typographic tweaks!
	4. Add accessible line-height
	5. Improve text rendering
	*/
	body {
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;
	}

	/*
	6. Improve media defaults
	*/
	img,
	picture,
	video,
	canvas {
		display: block;
	}

	img {
		width: 100%;
		height: auto;
	}

	/*
	7. Remove built-in form typography styles
	*/
	input,
	button,
	textarea,
	select {
		font: inherit;
	}

	/*
	8. Avoid text overflows
	*/
	p, h1, h2, h3, h4, h5, h6 {
		overflow-wrap: break-word;
	}

	/*
	9. Create a root stacking context
	*/
	/* stylelint-disable-next-line selector-id-pattern */
	#root, #__next {
		isolation: isolate;
	}

	/* stylelint-disable-next-line selector-class-pattern */
	.react-aria-ModalOverlay {
			display: flex;
			position: fixed;
			top: 0;
			left: 0;
			align-items: center;
			justify-content: center;
			z-index: 100;
			background: rgba(0 0 0 / 50%);
			width: 100vw;
			height: var(--visual-viewport-height);

			&[data-entering] {
				animation: modal-fade 200ms;
			}

			&[data-exiting] {
				animation: modal-fade 150ms reverse ease-in;
			}
		}

		@keyframes modal-fade {
			from {
				opacity: 0;
			}

			to {
				opacity: 1;
			}
		}

	.grecaptcha-badge { visibility: hidden; }
`

/* General shared componnets */

export const PageWrapper = styled.div`
	margin: 0 auto;
	padding: 0 ${WRAPPER_PADDING_MOBILE}px;
	max-width: ${WRAPPER_MAX_WIDTH}px;

	@media (min-width: ${breakpoints.lg}px) {
		padding: 0 ${WRAPPER_PADDING_DESKTOP}px;
	}
`

/* Utility components */

export const ScreenReaderOnly = styled.span`
	${screenReaderOnly}
`

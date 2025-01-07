import styled, { css, keyframes } from 'styled-components'

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const rotationBack = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`

export const StyledSpinner = styled.span`
	${({ theme }) => css`
		box-sizing: border-box;
		display: inline-block;
		position: relative;
		border: 3px solid;
		border-radius: 50%;
		border-color: ${theme.tokens['color-additional-black']} ${theme.tokens['color-additional-black']} transparent transparent;
		width: 48px;
		height: 48px;
		animation: ${rotation} 1s linear infinite;

		&::after,
		&::before {
			box-sizing: border-box;
			position: absolute;
			inset: 0;
			transform-origin: center center;
			margin: auto;
			border: 3px solid;
			border-radius: 50%;
			border-color: transparent transparent ${theme.tokens['color-base-action-primary-active']} ${theme.tokens['color-base-action-primary-active']};
			width: 40px;
			height: 40px;
			animation: ${rotationBack} 0.5s linear infinite;
			content: '';
		}

		&::before {
			border-color: ${theme.tokens['color-additional-black']} ${theme.tokens['color-additional-black']} transparent transparent;
			width: 32px;
			height: 32px;
			animation: ${rotation} 1.5s linear infinite;
		}
	`}
`

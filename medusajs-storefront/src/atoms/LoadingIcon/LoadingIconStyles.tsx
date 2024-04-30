import styled from 'styled-components'

import { ANIMATION_DURATION, pulse } from '@/styles/helpers'

export const Svg = styled.svg`
	& > rect {
		animation-name: ${pulse};
		animation-duration: ${ANIMATION_DURATION.SECOND}ms;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-direction: reverse;

		&:nth-child(1) {
			animation-delay: ${(ANIMATION_DURATION.SECOND * 0) / 8}ms;
		}

		&:nth-child(2) {
			animation-delay: ${(ANIMATION_DURATION.SECOND * 1) / 8}ms;
		}

		&:nth-child(3) {
			animation-delay: ${(ANIMATION_DURATION.SECOND * 2) / 8}ms;
		}

		&:nth-child(4) {
			animation-delay: ${(ANIMATION_DURATION.SECOND * 3) / 8}ms;
		}

		&:nth-child(5) {
			animation-delay: ${(ANIMATION_DURATION.SECOND * 4) / 8}ms;
		}

		&:nth-child(6) {
			animation-delay: ${(ANIMATION_DURATION.SECOND * 5) / 8}ms;
		}

		&:nth-child(7) {
			animation-delay: ${(ANIMATION_DURATION.SECOND * 6) / 8}ms;
		}

		&:nth-child(8) {
			animation-delay: ${(ANIMATION_DURATION.SECOND * 7) / 8}ms;
		}
	}
`

import styled, { css } from 'styled-components'

import { textLgBold, textXlRegular } from '@/styles/helpers'

export const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100dvh;
`

export const Title = styled.h1`
	${textXlRegular};
`

export const Subtitle = styled.h2`
	${textLgBold}
`

export const DogsContainer = styled.div`
	${({ theme }) => css`
		display: flex;
		gap: ${theme.spacing[32]};
	`}
`

export const DogImage = styled.img`
	width: 150px;
	height: 150px;
	object-fit: cover;
`

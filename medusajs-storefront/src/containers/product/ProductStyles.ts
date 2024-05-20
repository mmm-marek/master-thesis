import styled from 'styled-components'

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
	gap: 16px;
`

export const ImageWrapper = styled.div`
	height: 500px;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`

export const CarouselWrapper = styled.div`
	width: 500px;
	max-width: 500px;
`

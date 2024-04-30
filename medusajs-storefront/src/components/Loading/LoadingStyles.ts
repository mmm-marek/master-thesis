import styled from 'styled-components'

export const LoadingContainer = styled.div<{ $height: string }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: ${({ $height }) => $height};
`

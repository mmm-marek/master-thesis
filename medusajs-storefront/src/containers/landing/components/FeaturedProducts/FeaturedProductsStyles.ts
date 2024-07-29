import styled from 'styled-components'

import { headingXsSemibold } from '@/styles/helpers'

export const ProductsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 16px;
`

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

export const Title = styled.h2`
	${headingXsSemibold};
`

export const TitleWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

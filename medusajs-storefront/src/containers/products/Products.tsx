import Medusa from '@medusajs/medusa-js'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import { QUERY_KEYS } from '@/utils/enums'

import * as SC from './ProductsStyles'

const Products = () => {
	const { data } = useQuery([QUERY_KEYS.API_GET_PRODUCTS], async () => {
		const medusa = new Medusa({ baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL, maxRetries: 3 })
		const products = await medusa.products.list()

		return products.products
	})

	const products = data ?? []

	return (
		<SC.ProductsGrid>
			{products.map((product) => (
				<SC.Product key={product.id}>
					{product.images?.at(0) && (
						<SC.ImageWrapper>
							<Image src={product.images.at(0)!.url} alt={product.title ?? 'Product'} width={50} height={50} unoptimized />
						</SC.ImageWrapper>
					)}
					<SC.ProductTextContent>
						<SC.ProductTitle>{product.title}</SC.ProductTitle>
						<SC.ProductDescription>{product.description}</SC.ProductDescription>
					</SC.ProductTextContent>
				</SC.Product>
			))}
		</SC.ProductsGrid>
	)
}

export default Products

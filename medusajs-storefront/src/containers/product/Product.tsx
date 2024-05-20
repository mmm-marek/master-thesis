import { Carousel } from 'antd'
import { useProduct } from 'medusa-react'
import Image from 'next/image'

import Error from '@/components/Error/Error'
import Loading from '@/components/Loading/Loading'

import * as SC from './ProductStyles'

type ProductProps = {
	id: string
}

const Product = ({ id }: ProductProps) => {
	const { product, isError, isLoading } = useProduct(id)

	if (isError) {
		return <Error />
	}

	if (isLoading) {
		return <Loading />
	}

	const getImages = () => {
		const images = []
		if (product?.thumbnail) {
			images.push({
				src: product.thumbnail,
				alt: product.title ?? 'Product'
			})
		}

		return images.concat(
			product?.images?.map((image) => ({
				src: image.url,
				alt: product.title ?? 'Product'
			})) || []
		)
	}

	return (
		<SC.Wrapper>
			<SC.CarouselWrapper>
				<Carousel autoplay autoplaySpeed={2000}>
					{getImages().map((image) => (
						<SC.ImageWrapper key={image.src}>
							<Image src={image.src} alt={image.alt} width={500} height={500} unoptimized />
						</SC.ImageWrapper>
					))}
				</Carousel>
			</SC.CarouselWrapper>
			<div>
				<h1>{product?.title}</h1>
			</div>
		</SC.Wrapper>
	)
}

export default Product

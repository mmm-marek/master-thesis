import { Carousel } from 'antd'
import { formatVariantPrice, useCart, useProduct } from 'medusa-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import Error from '@/components/Error/Error'
import Loading from '@/components/Loading/Loading'

import * as SC from './ProductStyles'

type ProductProps = {
	id: string
}

const Product = ({ id }: ProductProps) => {
	const { cart } = useCart()
	const { product, isError, isLoading } = useProduct(id)
	const [selectedVariant, setSelectedVariant] = useState(product?.variants[0])

	useEffect(() => {
		setSelectedVariant(product?.variants[0])
	}, [product])

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
				<p>{product?.description}</p>
				<div>
					{product?.variants.map((variant) => (
						<button key={variant.id} type='button' onClick={() => setSelectedVariant(variant)}>
							{variant.title}
						</button>
					))}
				</div>
				{selectedVariant && cart && (
					<p>
						{formatVariantPrice({
							variant: selectedVariant,
							region: cart?.region
						})}
					</p>
				)}
			</div>
		</SC.Wrapper>
	)
}

export default Product

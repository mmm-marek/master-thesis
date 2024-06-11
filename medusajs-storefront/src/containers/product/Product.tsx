import { Carousel } from 'antd'
import { formatVariantPrice, useProduct } from 'medusa-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import Button from '@/atoms/Button/Button'
import Error from '@/components/Error/Error'
import Loading from '@/components/Loading/Loading'
import { useStore } from '@/providers/StoreProvider'

import * as SC from './ProductStyles'

type ProductProps = {
	id: string
}

const Product = ({ id }: ProductProps) => {
	const { addItem, isUpdatingCart, cart } = useStore()
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

	const handleAddToCart = () => {
		if (!selectedVariant || !selectedVariant.id) {
			return
		}
		addItem({
			quantity: 1,
			variantId: selectedVariant.id
		})
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
			<SC.ContentWrapper>
				<div>
					<SC.Title>{product?.title}</SC.Title>
					<SC.Description>{product?.description}</SC.Description>
				</div>
				<SC.VariantGrid>
					{product?.variants.map((variant) => (
						<SC.VariantButton
							key={variant.id}
							type='button'
							onClick={() => setSelectedVariant(variant)}
							$selected={selectedVariant?.id === variant.id}
						>
							{variant.title}
						</SC.VariantButton>
					))}
				</SC.VariantGrid>
				{selectedVariant && cart && (
					<SC.PriceWrapper>
						<SC.Price>
							{formatVariantPrice({
								variant: selectedVariant,
								region: cart?.region
							})}
						</SC.Price>
						<Button size='extra-large' block type='primary' onClick={handleAddToCart} disabled={isUpdatingCart}>
							Add to cart
						</Button>
					</SC.PriceWrapper>
				)}
			</SC.ContentWrapper>
		</SC.Wrapper>
	)
}

export default Product

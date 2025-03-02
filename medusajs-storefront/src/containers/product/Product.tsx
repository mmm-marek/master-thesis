import { formatVariantPrice } from 'medusa-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { RadioGroup } from 'react-aria-components'

import Breadcrumb from '@/atoms/Breadcrumb/Breadcrumb'
import Button from '@/atoms/Button/Button'
import Error from '@/components/Error/Error'
import Loading from '@/components/Loading/Loading'
import useGetLocalizedProduct from '@/hooks/products/useGetLocalizedProduct'
import { useStore } from '@/providers/StoreProvider'
import { PATHS } from '@/utils/enums'

import * as SC from './ProductStyles'
import Reviews from './components/Reviews/Reviews'

type ProductProps = {
	id: string
}

const Product = ({ id }: ProductProps) => {
	const t = useTranslations('containers.products')

	const { addItem, isUpdatingCart, cart } = useStore()
	const { data: product, isError, isLoading } = useGetLocalizedProduct(id)

	const defaultVariant = product?.variants[0]
	const [selectedVariant, setSelectedVariant] = useState(defaultVariant)

	useEffect(() => {
		setSelectedVariant(product?.variants[0])
	}, [product])

	const handleVariantChange = (value: string) => {
		const variant = product?.variants.find((v) => v.id === value)
		if (variant) {
			setSelectedVariant(variant)
		}
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

	if (isError) {
		return <Error />
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<>
			<Breadcrumb
				items={[
					{
						title: t('home'),
						href: PATHS.HOME
					},
					{
						title: t('products'),
						href: PATHS.PRODUCTS
					},
					{
						title: product?.title ?? ''
					}
				]}
			/>
			<SC.Wrapper>
				<SC.ProductContainer>
					{product?.thumbnail && <SC.Thumbnail src={product.thumbnail} alt={product?.title ?? t('productTitle')} width={500} height={500} />}
					<SC.InfoWrapper>
						<SC.TextWrapper>
							<SC.ProductTitle>{product?.title}</SC.ProductTitle>
							<SC.Material>{product?.material}</SC.Material>
						</SC.TextWrapper>
						<SC.VariantsSection>
							<RadioGroup onChange={handleVariantChange} defaultValue={defaultVariant?.id}>
								<SC.VariantsTitle>{t('variants')}</SC.VariantsTitle>
								<SC.VariantsWrapper>
									{product?.variants.map((variant) => (
										<SC.RadioWrapper key={variant.id} $selected={selectedVariant?.id === variant.id}>
											<SC.RadioVariant value={variant.id ?? ''} isDisabled={variant.inventory_quantity === 0}>
												{variant.title}
											</SC.RadioVariant>
										</SC.RadioWrapper>
									))}
								</SC.VariantsWrapper>
							</RadioGroup>
							<SC.QuantityInfo>
								{t('inStock')}: <SC.Strong>{selectedVariant?.inventory_quantity ?? 0}</SC.Strong>
							</SC.QuantityInfo>
						</SC.VariantsSection>
						{selectedVariant && cart && (
							<SC.PriceWrapper>
								<SC.Price>
									{formatVariantPrice({
										variant: selectedVariant,
										region: cart?.region
									})}
								</SC.Price>
								<Button size='large' variant='primary' onPress={handleAddToCart} isDisabled={isUpdatingCart}>
									{t('addToCart')}
								</Button>
							</SC.PriceWrapper>
						)}
						<SC.Divider />
						<SC.Description>{product?.description}</SC.Description>
					</SC.InfoWrapper>
				</SC.ProductContainer>
				<SC.ReviewsWrapper>
					<SC.Divider />
					{product?.id && <Reviews productID={product?.id} />}
				</SC.ReviewsWrapper>
			</SC.Wrapper>
		</>
	)
}

export default Product

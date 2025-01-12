import { Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'styled-components'

import AddReviewForm from '../AddReviewForm/AddReviewForm'
import useCustomerProfile from '@/hooks/customer/useCustomerProfile'
import useGetProductReviews from '@/hooks/products/useGetProductReviews'

import * as SC from './ReviewsStyles'

type ReviewProps = {
	productID: string
}

type RatingStarsProps = {
	rating: number
}

const RatingStars = ({ rating }: RatingStarsProps) => {
	const theme = useTheme()

	const getColor = (index: number) => {
		return index < rating ? theme.tokens['color-base-action-primary-default'] : theme.tokens['color-base-surface-quaternary']
	}

	return (
		<SC.StarsWrapper>
			{[...Array(5)].map((_, index) => {
				const color = getColor(index)
				// eslint-disable-next-line react/no-array-index-key
				return <Star key={index} size={20} color={color} fill={color} />
			})}
		</SC.StarsWrapper>
	)
}

const Reviews = ({ productID }: ReviewProps) => {
	const t = useTranslations('containers.products')

	const { data: userData } = useCustomerProfile()
	const { data: reviewsData } = useGetProductReviews(productID)

	return (
		<SC.Container>
			<SC.Title>{t('reviews')}</SC.Title>
			<SC.ReviewsWrapper>
				{reviewsData?.reviews.length === 0 ? (
					<SC.NoReviews>{t('noReviews')}</SC.NoReviews>
				) : (
					reviewsData?.reviews.map((review) => (
						<SC.Review key={review.id}>
							<SC.ReviewTitle>{review.title}</SC.ReviewTitle>
							<RatingStars rating={review.rating} />
							<SC.Content>{review.content}</SC.Content>
							<SC.Reviewer>- {review.user_name}</SC.Reviewer>
						</SC.Review>
					))
				)}
			</SC.ReviewsWrapper>
			{userData && userData.id && (
				<SC.ReviewFormWrapper>
					<AddReviewForm productID={productID} />
				</SC.ReviewFormWrapper>
			)}
		</SC.Container>
	)
}

export default Reviews

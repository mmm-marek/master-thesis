import { Rate } from 'antd'

import AddReviewForm from '../AddReviewForm/AddReviewForm'
import useCustomerProfile from '@/hooks/customer/useCustomerProfile'
import useGetProductReviews from '@/hooks/products/useGetProductReviews'

import * as SC from './ReviewsStyles'

type ReviewProps = {
	productID: string
}

const Reviews = ({ productID }: ReviewProps) => {
	const { data: userData } = useCustomerProfile()
	const { data: reviewsData } = useGetProductReviews(productID)

	return (
		<SC.Container>
			<SC.Title>Reviews</SC.Title>
			<SC.ReviewsWrapper>
				{reviewsData?.reviews.length === 0 ? (
					<SC.NoReviews>No reviews yet.</SC.NoReviews>
				) : (
					reviewsData?.reviews.map((review) => (
						<SC.Review key={review.id}>
							<SC.ReviewTitle>{review.title}</SC.ReviewTitle>
							<Rate value={review.rating} disabled />
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

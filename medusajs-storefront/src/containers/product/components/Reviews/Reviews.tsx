import { Rate } from 'antd'

import useCustomerProfile from '@/hooks/customer/useCustomerProfile'
import useGetProductReviews from '@/hooks/products/useGetProductReviews'
import usePostProductReview from '@/hooks/products/usePostProductReview'

import * as SC from './ReviewsStyles'

type ReviewProps = {
	productID: string
}

const Reviews = ({ productID }: ReviewProps) => {
	const { data: userData } = useCustomerProfile()
	const { data: reviewsData } = useGetProductReviews(productID)
	const { mutate: postProductReview } = usePostProductReview(productID)

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
				<button
					type='button'
					onClick={() =>
						postProductReview({
							rating: 5,
							content: 'Great product!',
							title: 'Simply the best',
							user_name: `${userData?.first_name} ${userData?.last_name}`
						})
					}
				>
					Add review
				</button>
			)}
		</SC.Container>
	)
}

export default Reviews

import { useQueryClient } from '@tanstack/react-query'
import { Rate, Spin } from 'antd'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import TextAreaField from '@/atoms/TextAreaField/TextAreaField'
import HookFormField from '@/components/HookFormField'
import useCustomerProfile from '@/hooks/customer/useCustomerProfile'
import usePostProductReview from '@/hooks/products/usePostProductReview'
import { QUERY_KEYS } from '@/utils/enums'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './AddReviewFormStyles'
import { AddReviewFormFields, addReviewFormSchema } from './addReviewFormSchema'

type AddReviewFormProps = {
	productID: string
}

const AddReviewForm = ({ productID }: AddReviewFormProps) => {
	const queryClient = useQueryClient()

	const [rating, setRating] = useState(5)
	const [isFormOpen, setIsFormOpen] = useState(false)

	const { data: profile } = useCustomerProfile()
	const { mutate: postReview, isLoading: isLoadingPostProductReview } = usePostProductReview(productID)

	const { control, handleSubmit, reset } = useForm<AddReviewFormFields>({
		mode: 'onChange',
		resolver: zodResolver(addReviewFormSchema),
		defaultValues: {
			title: '',
			content: ''
		}
	})

	const onSubmit = (data: AddReviewFormFields) => {
		postReview(
			{
				...data,
				rating,
				user_name: `${profile?.first_name} ${profile?.last_name}`
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.API_GET_PRODUCT_REVIEWS] })
					reset()
					setRating(5)
					setIsFormOpen(false)
				}
			}
		)
	}

	return isFormOpen ? (
		<SC.FormWrapper onSubmit={handleSubmit(onSubmit)}>
			<Spin spinning={isLoadingPostProductReview}>
				<SC.Title>Add review</SC.Title>
				<SC.RatingWrapper>
					<div>Rating</div>
					<Rate value={rating} onChange={(value) => setRating(value)} allowClear={false} />
				</SC.RatingWrapper>
				<HookFormField label='Title' placeholder='Enter title' component={InputField} control={control} name='title' size='large' />
				<HookFormField
					label='Review'
					placeholder='Enter review'
					component={TextAreaField}
					control={control}
					name='content'
					size='large'
					autoSize={{
						minRows: 5,
						maxRows: 5
					}}
				/>
				<SC.ButtonsWrapper>
					<Button shape='round' htmlType='button' size='large' onClick={() => setIsFormOpen(false)}>
						Cancel
					</Button>
					<Button shape='round' type='primary' htmlType='submit' size='large'>
						Submit
					</Button>
				</SC.ButtonsWrapper>
			</Spin>
		</SC.FormWrapper>
	) : (
		<Button shape='round' type='primary' htmlType='submit' size='large' onClick={() => setIsFormOpen(true)}>
			Add review
		</Button>
	)
}

export default AddReviewForm

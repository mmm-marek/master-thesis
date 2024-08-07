import { Rate } from 'antd'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import TextAreaField from '@/atoms/TextAreaField/TextAreaField'
import HookFormField from '@/components/HookFormField'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './AddReviewFormStyles'
import { AddReviewFormFields, addReviewFormSchema } from './addReviewFormSchema'

const AddReviewForm = () => {
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [rating, setRating] = useState(5)

	const { control } = useForm<AddReviewFormFields>({
		mode: 'onChange',
		resolver: zodResolver(addReviewFormSchema),
		defaultValues: {
			title: '',
			content: ''
		}
	})

	return isFormOpen ? (
		<SC.FormWrapper>
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
		</SC.FormWrapper>
	) : (
		<Button shape='round' type='primary' htmlType='submit' size='large' onClick={() => setIsFormOpen(true)}>
			Add review
		</Button>
	)
}

export default AddReviewForm

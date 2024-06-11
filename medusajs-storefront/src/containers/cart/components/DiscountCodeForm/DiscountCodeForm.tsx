import { useUpdateCart } from 'medusa-react'
import { useForm } from 'react-hook-form'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import HookFormField from '@/components/HookFormField'
import { useStore } from '@/providers/StoreProvider'
import { DiscountCodeFormSchema } from '@/schemas/discountCodeSchemas'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './DiscountCodeFormStyles'
import { DiscountCodeFormFields } from './DiscountCodeFormTypes'

const DiscountCodeForm = () => {
	const { cart } = useStore()
	const updateCart = useUpdateCart(cart!.id)

	const {
		control,
		reset,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<DiscountCodeFormFields>({
		mode: 'onChange',
		resolver: zodResolver(DiscountCodeFormSchema),
		defaultValues: { discountCode: '' }
	})

	const handleFormSubmit = async (data: DiscountCodeFormFields) => {
		updateCart.mutate(
			{
				discounts: [
					{
						code: data.discountCode
					}
				]
			},
			{
				onSuccess: () => {
					reset()
				}
			}
		)
	}

	return (
		<SC.Form onSubmitCapture={handleSubmit(handleFormSubmit)}>
			<HookFormField placeholder='SALE10' component={InputField} control={control} name='discountCode' size='large' required />
			<Button type='primary' size='large' htmlType='submit' disabled={isSubmitting} loading={isSubmitting}>
				Apply
			</Button>
		</SC.Form>
	)
}

export default DiscountCodeForm

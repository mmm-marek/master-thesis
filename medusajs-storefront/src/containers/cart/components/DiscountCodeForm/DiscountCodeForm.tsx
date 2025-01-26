import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateCart } from 'medusa-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import HookFormField from '@/components/HookFormField'
import { useStore } from '@/providers/StoreProvider'
import { DiscountCodeFormFields, useDiscountCodeFormSchema } from '@/schemas/discountCodeSchemas'

import * as SC from './DiscountCodeFormStyles'

const DiscountCodeForm = () => {
	const { cart } = useStore()
	const schema = useDiscountCodeFormSchema()
	const updateCart = useUpdateCart(cart!.id)
	const t = useTranslations('containers.cart')

	const {
		control,
		reset,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<DiscountCodeFormFields>({
		mode: 'onChange',
		resolver: zodResolver(schema),
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
			<HookFormField placeholder={t('discountPlaceholder')} component={InputField} control={control} name='discountCode' label={t('discount')} required />
			<Button variant='primary' size='medium' type='submit' isDisabled={isSubmitting} isPending={isSubmitting}>
				{t('apply')}
			</Button>
		</SC.Form>
	)
}

export default DiscountCodeForm

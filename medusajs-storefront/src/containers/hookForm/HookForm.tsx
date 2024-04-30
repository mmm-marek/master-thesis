import { InfoCircleOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row } from 'antd'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { HookFormData, HookFormSchema } from '../../schemas/components/hookForm'
import CheckBoxGroupField from '@/atoms/CheckBoxGroupField'
import InputField from '@/atoms/InputField/InputField'
import InputNumberField from '@/atoms/InputNumberField'
import RadioGroupField from '@/atoms/RadioGroupField'
import SelectField from '@/atoms/SelectField/SelectField'
import SwitchField from '@/atoms/SwitchFields'
import TextareaField from '@/atoms/TextAreaField'
import TimeRangeField from '@/atoms/TimeRangeField'
import HookFormField from '@/components/HookFormField'
import { useFormOutside } from '@/providers/FormsProvider'
import { FORM, VALIDATION_MAX_LENGTH } from '@/utils/enums'
import { zodResolver } from '@/utils/zodResolver'

import RemoteSubmit from './components/RemoteSubmit'
import { CURRENCIES, PERMISSIONS, SOCIAL_PLATFORMS } from './components/mockData'

const customOption = (option: any) => (
	<span>
		{option.icon}
		<strong style={{ paddingLeft: '16px' }}>{option.key}</strong>
	</span>
)

const HookForm = () => {
	const t = useTranslations('containers.hookForm')
	const { setFormInstance } = useFormOutside()
	const [form] = Form.useForm()

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, errors },
		setValue
	} = useForm<HookFormData>({
		mode: 'onChange',
		resolver: zodResolver(HookFormSchema),
		defaultValues: {
			longText: '',
			email: '',
			allowMarketingConsents: true,
			permissions: ['delete'],
			socialLinks: ['Youtube'],
			currency: 'USD'
		}
	})

	useEffect(() => {
		setFormInstance(FORM.HOOK_FORM, form)
		setValue('email', 'roman@good.com')
		setValue('permissions', ['read'])

		return () => {
			setFormInstance(FORM.HOOK_FORM)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (Object.keys(errors).length > 0) {
		console.log('HookForm contains errors:', errors)
	}

	const onSubmit = (data: HookFormData) => console.log('Submitted data', data)

	return (
		<Row>
			<Col span={12} offset={6}>
				{/* NOTE: Use onFinish instead of onSubmitCapture! onFinish works properly with remote submit too */}
				<Form form={form} name={FORM.HOOK_FORM} onFinish={handleSubmit(onSubmit)}>
					<HookFormField
						control={control}
						name='longText'
						component={TextareaField}
						label={t('longTextLabel')}
						placeholder={t('longTextPlaceholder')}
						showLettersCount
						maxLength={VALIDATION_MAX_LENGTH.LENGTH_1000}
						rows={5}
						required
					/>
					<HookFormField
						control={control}
						name='email'
						component={InputField}
						label={t('emailLabel')}
						placeholder={t('emailPlaceholder')}
						type='email'
						required
					/>
					<HookFormField
						control={control}
						name='allowMarketingConsents'
						component={SwitchField}
						label='Allow marketing consents'
						suffixIcon={<InfoCircleOutlined />}
						description='Taciti elementum porta neque dui nunc fringilla habitasse, curabitur at nec class etiam ad per ligula, libero vehicula sociosqu bibendum ultrices cras.'
					/>
					<Row>
						<Col span={6} offset={1}>
							<HookFormField control={control} name='currency' component={SelectField} label='Currency' options={CURRENCIES} />
						</Col>
						<Col span={6} offset={1}>
							<HookFormField
								control={control}
								name='permissions'
								component={SelectField}
								label='Permissions'
								options={PERMISSIONS}
								required
								mode='tags'
								allowClear
							/>
						</Col>
						<Col span={6} offset={1}>
							<HookFormField
								control={control}
								name='socialLinks'
								component={SelectField}
								label='Social links'
								mode='multiple'
								options={SOCIAL_PLATFORMS.map((socialPlatform) => ({
									key: socialPlatform.id,
									value: socialPlatform.id,
									label: socialPlatform.id,
									icon: socialPlatform.icon
								}))}
								optionRender={customOption}
							/>
						</Col>
					</Row>
					<Col span={6} offset={1}>
						<HookFormField control={control} name='time' component={TimeRangeField} label='Time' />
					</Col>
					<Col span={6} offset={1}>
						<HookFormField
							control={control}
							name='type'
							component={RadioGroupField}
							label='Type'
							options={SOCIAL_PLATFORMS.map((socialPlatform) => ({
								key: socialPlatform.id,
								value: socialPlatform.id,
								label: socialPlatform.id,
								icon: socialPlatform.icon
							}))}
						/>
					</Col>
					<Col span={6} offset={1}>
						<HookFormField
							control={control}
							name='test'
							component={CheckBoxGroupField}
							label='Test'
							options={[
								{
									value: 'option1',
									label: 'Option 1'
								},
								{
									value: 'option2',
									label: 'Option 2'
								}
							]}
						/>
					</Col>
					<Col span={6} offset={1}>
						<HookFormField control={control} name='number' component={InputNumberField} label='Number' />
					</Col>
					<Row justify='center'>
						<Button id='submit-formularis-btn' type='primary' htmlType='submit' disabled={isSubmitting} loading={isSubmitting}>
							{t('submit')}
						</Button>
					</Row>
				</Form>
				{/* </Form> */}
			</Col>
			<RemoteSubmit />
		</Row>
	)
}

export default HookForm

import { useTranslations } from 'next-intl'

import Breadcrumb from '@/atoms/Breadcrumb/Breadcrumb'
import { PATHS } from '@/utils/enums'

import SignUpForm from './components/SignUpForm/SignUpForm'

const SignUp = () => {
	const t = useTranslations('containers.signUp')

	return (
		<>
			<Breadcrumb
				items={[
					{
						title: t('home'),
						href: PATHS.HOME
					},
					{
						title: t('title')
					}
				]}
			/>
			<SignUpForm />
		</>
	)
}

export default SignUp

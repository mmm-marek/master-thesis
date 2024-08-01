import Link from 'next/link'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@/atoms/Breadcrumb/Breadcrumb'

import SignUpForm from './components/SignUpForm/SignUpForm'

const SignUp = () => {
	const t = useTranslations('containers.signUp')

	return (
		<>
			<Breadcrumb
				items={[
					{
						title: <Link href='/'>{t('home')}</Link>
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

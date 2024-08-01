import Link from 'next/link'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@/atoms/Breadcrumb/Breadcrumb'
import LoginForm from '@/containers/login/components/LoginForm/LoginForm'

import * as SC from './LoginStyles'
import RegisterCTA from './components/RegisterCTA/RegisterCTA'

const Login = () => {
	const t = useTranslations('containers.login')

	return (
		<>
			<Breadcrumb
				items={[
					{
						title: <Link href='/'>{t('home')}</Link>
					},
					{
						title: t('breadcrumb')
					}
				]}
			/>
			<SC.LoginWrapper>
				<LoginForm />
				<SC.Divider />
				<RegisterCTA />
			</SC.LoginWrapper>
		</>
	)
}

export default Login

import { useTranslations } from 'next-intl'

import Breadcrumb from '@/atoms/Breadcrumb/Breadcrumb'
import LoginForm from '@/containers/login/components/LoginForm/LoginForm'
import { PATHS } from '@/utils/enums'

import * as SC from './LoginStyles'
import RegisterCTA from './components/RegisterCTA/RegisterCTA'

const Login = () => {
	const t = useTranslations('containers.login')

	return (
		<>
			<Breadcrumb
				items={[
					{
						title: t('home'),
						href: PATHS.HOME
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

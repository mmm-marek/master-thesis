import LoginForm from '@/containers/login/components/LoginForm/LoginForm'

import * as SC from './LoginStyles'
import RegisterCTA from './components/RegisterCTA/RegisterCTA'

const Login = () => {
	return (
		<SC.LoginWrapper>
			<LoginForm />
			<RegisterCTA />
		</SC.LoginWrapper>
	)
}

export default Login

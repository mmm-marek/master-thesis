import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'

import LoginForm, { LoginFormFields } from '@/containers/login/components/LoginForm'
import useLogin from '@/hooks/auth/useLogin'
import useGetAuthUser from '@/hooks/user/useGetAuthUser'
import { isLoggedIn } from '@/utils/auth'

const Login = () => {
	const login = useLogin()
	useGetAuthUser(login.data?.user.id)

	const router = useRouter()

	useEffect(() => {
		if (isLoggedIn()) {
			router.push('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
		try {
			await login.mutateAsync(data)
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
	}

	return <LoginForm onSubmit={onSubmit} />
}

export default Login

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'

import SignUpForm, { SignUpFormFields } from '@/containers/signUp/components/SignUpForm'
import useSignUp from '@/hooks/auth/useSignUp'
import useGetAuthUser from '@/hooks/user/useGetAuthUser'
import { isLoggedIn } from '@/utils/auth'

const SignUp = () => {
	const signUp = useSignUp()
	useGetAuthUser(signUp.data?.user.id)

	const router = useRouter()

	useEffect(() => {
		if (isLoggedIn() || signUp.isSuccess) {
			router.push('/')
		}
	}, [router, signUp.isSuccess])

	const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
		await signUp.mutateAsync(data)
	}

	return <SignUpForm onSubmit={onSubmit} />
}

export default SignUp

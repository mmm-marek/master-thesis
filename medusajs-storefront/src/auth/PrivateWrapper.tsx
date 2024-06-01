import { useMeCustomer } from 'medusa-react'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'

import Loading from '@/components/Loading/Loading'
import { PATHS } from '@/utils/enums'

type Props = {
	children: React.ReactNode
}

const PrivateWrapper: FC<Props> = ({ children }) => {
	const router = useRouter()
	const { customer } = useMeCustomer()

	useEffect(() => {
		if (!customer) {
			router.push(PATHS.LOGIN)
		}
	}, [customer, router])

	if (!customer) {
		return <Loading height='100vh' />
	}

	return children
}

export default PrivateWrapper

import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'

import { isLoggedIn } from '../utils/auth'
import Loading from '@/components/Loading/Loading'
import { PATHS } from '@/utils/enums'

type Props = {
	children: React.ReactNode
}

const PrivateWrapper: FC<Props> = ({ children }) => {
	const router = useRouter()
	const [returnComponent, setReturnComponent] = useState(<div />)

	const privateComponent = <div>{isLoggedIn() ? children : <Loading height='100vh' />}</div>

	useEffect(() => {
		if (!isLoggedIn()) {
			router.push(PATHS.LOGIN)
		}
		setReturnComponent(privateComponent)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router])

	return returnComponent
}

export default PrivateWrapper

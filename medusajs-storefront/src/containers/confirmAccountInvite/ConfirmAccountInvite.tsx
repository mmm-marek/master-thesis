import dayjs from 'dayjs'
import decode from 'jwt-decode'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'

import ConfirmAccountInviteForm, { ConfirmAccountInviteFormFields } from '@/containers/confirmAccountInvite/components/ConfirmAccountInviteForm'
import useConfirmAccountInvite from '@/hooks/user/useConfirmAccountInvite'
import { Paths } from '@/types/api'
import { IDecodedToken } from '@/types/interfaces'
import { TOKEN_AUDIENCE } from '@/utils/enums'

type Props = {
	token?: string
}

const ConfirmAccountInvite = (props: Props) => {
	const { token } = props
	const router = useRouter()
	const confirmAccountInvite = useConfirmAccountInvite()

	useEffect(() => {
		if (isEmpty(token)) {
			router.push('/403')
		}

		if (typeof token === 'string') {
			try {
				const decodedToken = decode<IDecodedToken>(token)

				if (decodedToken.aud !== TOKEN_AUDIENCE.USER_INVITATION) {
					router.push('/403')
				}

				const expiryDate = dayjs.unix(decodedToken.exp)
				const currentDate = dayjs()

				if (expiryDate.isBefore(currentDate)) {
					router.push('/403')
				}
			} catch {
				router.push('/403')
			}
		}
	}, [token, router])

	const onSubmit: SubmitHandler<ConfirmAccountInviteFormFields> = async (data) => {
		if (!token) return

		try {
			const body: Paths.PostApiV1UsersConfirm.RequestBody = {
				name: data.name,
				surname: data.surName,
				phone: data.phone,
				password: data.confirmPassword
			}

			await confirmAccountInvite.mutateAsync({ body, token })
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
	}

	return <ConfirmAccountInviteForm onSubmit={onSubmit} />
}

export default ConfirmAccountInvite

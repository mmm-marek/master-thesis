import { Spin, notification } from 'antd'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import React, { FC, PropsWithChildren, useEffect, useState } from 'react'

import Error from '@/components/Error/Error'
import Loading from '@/components/Loading/Loading'
import useGetAuthUser from '@/hooks/user/useGetAuthUser'
import { getAuthUserId } from '@/utils/auth'

import { USER_ROLE } from './enums'

/**
 * @param userPermissions permissions from users role and salons role
 * @param allowed allowed permissions
 * @returns TRUE/FALSE
 */
export const checkPermissions = (userRole?: USER_ROLE, allowed: USER_ROLE[] = []) => {
	if (userRole && allowed.includes(userRole)) return true
	return false
}

export const withPermissions =
	(allowed: USER_ROLE[] = []) =>
	(WrappedComponent: any) => {
		// eslint-disable-next-line func-names
		return function (props: any) {
			const [authorized, setAuthorized] = useState(false)
			const router = useRouter()

			const { data, isLoading: isLoadingUser, isError: isErrorUser, isFetching: isFetchingUser } = useGetAuthUser(getAuthUserId())

			const authUserRole = data?.user?.permission

			useEffect(() => {
				if (authUserRole !== undefined) {
					if (!checkPermissions(USER_ROLE[authUserRole], allowed)) {
						setAuthorized(false)
						router.push({
							pathname: '/403'
						})
					} else {
						setAuthorized(true)
					}
				}
				// eslint-disable-next-line react-hooks/exhaustive-deps
			}, [authUserRole])

			if (!authorized) {
				return null
			}

			if (isLoadingUser) {
				return <Loading />
			}

			if (isErrorUser) {
				return <Error />
			}

			return (
				<Spin spinning={isFetchingUser}>
					<WrappedComponent {...props} />
				</Spin>
			)
		}
	}

type RenderFunc = (
	hasPermission: boolean,
	object: {
		openForbiddenNotification: () => void
	}
) => React.ReactNode

type PermissionProps = PropsWithChildren & {
	render?: RenderFunc
	allowed?: USER_ROLE[]
}

const Permissions = ({ children, allowed, render }: PermissionProps) => {
	const { data, isLoading: isLoadingUser, isError: isErrorUser, isFetching: isFetchingUser } = useGetAuthUser(getAuthUserId())

	const authUserRole = data?.user.permission

	const hasPermissions = authUserRole !== undefined && checkPermissions(USER_ROLE[authUserRole], allowed)

	const t = useTranslations('utils.permissions')

	const getContent = (hasPermissionsToAccess: boolean, renderFunction?: RenderFunc) => {
		if (renderFunction) {
			return renderFunction(hasPermissionsToAccess, {
				openForbiddenNotification: () => {
					notification.warning({
						message: t('warning'),
						description: t('noPermission')
					})
				}
			})
		}

		if (hasPermissionsToAccess) {
			return children
		}

		return null
	}

	if (isLoadingUser) {
		return <Loading />
	}

	if (isErrorUser) {
		return <Error />
	}

	return <Spin spinning={isFetchingUser}>{getContent(hasPermissions, render)}</Spin>
}

export default React.memo<FC<PermissionProps>>(Permissions)

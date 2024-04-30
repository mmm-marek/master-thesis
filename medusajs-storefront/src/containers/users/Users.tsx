import { useQueryClient } from '@tanstack/react-query'
import { Dropdown, MenuProps, Spin } from 'antd'
import { ColumnsType, TableProps } from 'antd/es/table'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { UseFormReset } from 'react-hook-form'

import Dots from '@/assets/icons/dots-vertical.svg'
import Pencil from '@/assets/icons/pencil-line.svg'
import PlusIcon from '@/assets/icons/plus.svg'
import Trash from '@/assets/icons/trash.svg'
import Button from '@/atoms/Button/Button'
import Tag from '@/atoms/Tag/Tag'
import Error from '@/components/Error/Error'
import Loading from '@/components/Loading/Loading'
import PageHeader from '@/components/PageHeader/PageHeader'
import Table from '@/components/Table/Table'
import { useParseQuery } from '@/hooks/useQueryParser'
import useCreateUser from '@/hooks/user/useCreateUser'
import useDeleteUser from '@/hooks/user/useDeleteUser'
import useGetUsers from '@/hooks/user/useGetUsers'
import useUpdateUser from '@/hooks/user/useUpdateUser'
import { usersQueryParamsSchema } from '@/schemas/pages/users'
import { Paths } from '@/types/api'
import { withPermissions } from '@/utils/Permissions'
import { PAGE_SIZE_OPTIONS, PATHS, QUERY_KEYS, TABLE_SCROLL, USER_ROLE } from '@/utils/enums'
import { USER_PERMISSIONS, USER_STATES, getLinkWithEncodedBackUrl, getUserName } from '@/utils/helpers'

import * as SC from './UsersStyle'
import DeleteUserModal from './components/DeleteUserModal/DeleteUserModal'
import EditUserForm from './components/EditUserForm/EditUserForm'
import { EditUserFormFields } from './components/EditUserForm/types'
import InviteUserForm from './components/InviteUserForm/InviteUserForm'
import { InviteUserFormFields } from './components/InviteUserForm/types'
import UsersFilter from './components/UsersFilter/UsersFilter'
import { UsersFilterFields, UsersQueryParams } from './components/UsersFilter/types'

type TableItem = Paths.GetApiV1Users.Responses.$200['users'][0]

type EditUserModalData = EditUserFormFields & { userID: string; email: string }

const Users = () => {
	const t = useTranslations('containers.users')
	const router = useRouter()

	const [query, setQueryParams] = useParseQuery(usersQueryParamsSchema)

	const { search, permission, state, limit, page }: UsersQueryParams = query

	const queryClient = useQueryClient()
	const {
		data: usersData,
		isError: isErrorUsers,
		isFetching: isFetchingUsers,
		isLoading: isLoadingUsers
	} = useGetUsers({ search, permission, state, limit, page })
	const { mutateAsync: addUser, isPending: isSubmittingUser } = useCreateUser()
	const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser()
	const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser()

	const [inviteUserModalOpen, setInviteUserModalOpen] = useState(false)
	const [editUserModalData, setEditUserModalData] = useState<EditUserModalData | null>(null)
	const [deleteUserModalData, setDeleteUserModalData] = useState<EditUserModalData | null>(null)

	const columns: ColumnsType<TableItem> = useMemo(() => {
		const getDropdownMenuItems = (data: EditUserModalData): MenuProps['items'] => [
			{
				key: '1',
				icon: <Pencil />,
				label: t('edit'),
				onClick: () => {
					setEditUserModalData(data)
				}
			},
			{
				key: '2',
				icon: <Trash />,
				label: t('delete'),
				danger: true,
				onClick: () => setDeleteUserModalData(data)
			}
		]

		return [
			{
				title: t('name'),
				dataIndex: 'name',
				key: 'name',
				render: (_value, record) => getUserName(record)
			},
			{
				title: t('email'),
				dataIndex: 'email',
				key: 'email'
			},
			{
				title: t('role'),
				dataIndex: 'permission',
				key: 'permission',
				render: (value: TableItem['permission']) => USER_PERMISSIONS()[value]
			},
			{
				title: t('state'),
				dataIndex: 'state',
				key: 'state',
				render: (value: TableItem['state']) => {
					const userState = USER_STATES()[value]
					return (
						<Tag size='sm' type={userState.tagType}>
							{userState.translation}
						</Tag>
					)
				}
			},
			{
				title: t('action'),
				fixed: 'right',
				width: 86,
				render: (_value, record) => {
					const data: EditUserModalData = {
						userID: record.id,
						email: record.email,
						permission: record.permission as USER_ROLE,
						name: record.name,
						surname: record.surname
					}

					return (
						<SC.ActionButtonWRapper onClick={(e) => e.stopPropagation()}>
							<Dropdown menu={{ items: getDropdownMenuItems(data) }} placement='bottomRight' trigger={['click']} destroyPopupOnHide>
								<Button size='middle' type='default' shape='circle' icon={<Dots />} onClick={(e) => e.stopPropagation()} />
							</Dropdown>
						</SC.ActionButtonWRapper>
					)
				}
			}
		]
	}, [t])

	const onChangeTable: TableProps<TableItem>['onChange'] = (pagination, _filters, sorter) => {
		if (!(sorter instanceof Array)) {
			setQueryParams({
				...query,
				limit: pagination.pageSize || query.limit,
				page: pagination.pageSize === usersData?.pagination?.limit ? pagination.current || 1 : 1
			})
		}
	}

	const onChangeFilter = (values: UsersFilterFields) => {
		setQueryParams({ ...query, permission: values.permission, state: values.state, search: values.search, page: values?.search ? 1 : page })
	}

	const onClearSearch = () => {
		setQueryParams({ ...query, page: 1, search: '' })
	}

	const handleInviteUserSubmit = async (data: InviteUserFormFields, reset: UseFormReset<InviteUserFormFields>) => {
		try {
			await addUser(
				{ emails: [data.email], permission: data.permission },
				{
					onSuccess: () => {
						setInviteUserModalOpen(false)
						queryClient.invalidateQueries({
							queryKey: [QUERY_KEYS.API_GET_USERS]
						})
						reset()
					}
				}
			)
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
	}

	const handleEditUserSubmit = async (data: EditUserFormFields) => {
		if (!editUserModalData) {
			return
		}

		try {
			await updateUser(
				{
					userID: editUserModalData.userID,
					reqBody: {
						permission: data.permission,
						name: data.name || undefined,
						surname: data.surname || undefined,
						phone: data.phone
					}
				},
				{
					onSuccess: () => {
						setEditUserModalData(null)
						queryClient.invalidateQueries({
							queryKey: [QUERY_KEYS.API_GET_USERS]
						})
					}
				}
			)
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
	}

	const handleDeleteUser = async () => {
		if (!deleteUserModalData) {
			return
		}

		try {
			await deleteUser({
				userID: deleteUserModalData.userID
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.API_GET_USERS]
			})
			setDeleteUserModalData(null)
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
	}

	if (isLoadingUsers) {
		return <Loading />
	}

	if (isErrorUsers) {
		return <Error />
	}

	return (
		<Spin spinning={isFetchingUsers}>
			<PageHeader
				title={t('userManagement')}
				description={t('manageTeamMembers') || ''}
				buttonProps={{ label: t('inviteUser'), action: () => setInviteUserModalOpen(true), icon: <PlusIcon /> }}
			/>
			<Table<TableItem>
				header={<UsersFilter query={query} onChangeFilter={onChangeFilter} onClearSearch={onClearSearch} />}
				rowKey='id'
				columns={columns}
				dataSource={usersData?.users}
				onChange={onChangeTable}
				scroll={TABLE_SCROLL.MD}
				rowClickable
				onRow={(data) => ({
					onClick: () => {
						router.push(getLinkWithEncodedBackUrl(`${PATHS.USERS}/${data.id}`))
					}
				})}
				pagination={{
					pageSize: limit,
					total: usersData?.pagination?.totalCount,
					current: page,
					pageSizeOptions: PAGE_SIZE_OPTIONS
				}}
			/>
			<InviteUserForm
				open={inviteUserModalOpen}
				onCancel={() => setInviteUserModalOpen(false)}
				onSubmit={handleInviteUserSubmit}
				isSubmitting={isSubmittingUser}
			/>
			<EditUserForm
				open={!!editUserModalData}
				onCancel={() => setEditUserModalData(null)}
				onSubmit={handleEditUserSubmit}
				email={editUserModalData?.email}
				defaultValues={
					editUserModalData
						? {
								name: editUserModalData.name,
								surname: editUserModalData.surname,
								permission: editUserModalData.permission
							}
						: undefined
				}
				isSubmitting={isUpdatingUser}
			/>
			<DeleteUserModal
				open={!!deleteUserModalData}
				onCancel={() => setDeleteUserModalData(null)}
				email={deleteUserModalData?.email}
				onDelete={handleDeleteUser}
				loading={isDeletingUser}
			/>
		</Spin>
	)
}

export default withPermissions([USER_ROLE.ADMINISTRATOR])(Users)

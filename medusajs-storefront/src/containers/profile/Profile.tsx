import { Spin } from 'antd'
import { useTranslations } from 'next-intl'

import BrushIcon from '../../assets/icons/brush.svg'
import Error from '@/components/Error/Error'
import Loading from '@/components/Loading/Loading'
import PageHeader from '@/components/PageHeader/PageHeader'
import useGetAuthUser from '@/hooks/user/useGetAuthUser'
import { getAuthUserId } from '@/utils/auth'

import * as SC from './ProfileStyles'
import AppearanceForm from './components/AppearanceForm/AppearanceForm'

const Profile = () => {
	const t = useTranslations('containers.profile')

	const { isLoading, isError, isFetching } = useGetAuthUser(getAuthUserId())

	if (isLoading) {
		return <Loading />
	}

	if (isError) {
		return <Error />
	}

	return (
		<Spin spinning={isFetching}>
			<PageHeader title={t('profileSettings')} description={t('manageProfileSettings') || ''} />
			<SC.MainContainer>
				<SC.TitleWrapper>
					<BrushIcon />
					<SC.Title>{t('appearance')}</SC.Title>
				</SC.TitleWrapper>
				<AppearanceForm />
			</SC.MainContainer>
		</Spin>
	)
}

export default Profile

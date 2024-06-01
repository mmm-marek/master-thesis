import { useTranslations } from 'next-intl'

const Profile = () => {
	const t = useTranslations('containers.profile')

	return <div>{t('profileSettings')}</div>
}

export default Profile

// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookOutlined, InstagramOutlined, LinkedinOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons'

export const SOCIAL_PLATFORMS = [
	{
		id: 'Youtube',
		icon: <YoutubeOutlined />
	},
	{
		id: 'Instagram',
		icon: <InstagramOutlined />
	},
	{
		id: 'Twitter',
		icon: <TwitterOutlined />
	},
	{
		id: 'Facebook',
		icon: <FacebookOutlined />
	},
	{
		id: 'Linkedin',
		icon: <LinkedinOutlined />
	}
]

export const PERMISSIONS = [
	{
		value: 'read',
		label: 'Read'
	},
	{
		value: 'write',
		label: 'Write'
	},
	{
		value: 'delete',
		label: 'Delete'
	},
	{
		value: 'update',
		label: 'Update'
	}
]

export const CURRENCIES = [
	{
		value: 'EUR',
		label: '€'
	},
	{
		value: 'USD',
		label: '$'
	}
]

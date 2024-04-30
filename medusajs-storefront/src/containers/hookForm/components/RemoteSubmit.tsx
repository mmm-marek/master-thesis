import { Button } from 'antd'

import useSubmitForm from '@/hooks/useSubmitForm'
import { FORM } from '@/utils/enums'

const RemoteSubmit = () => {
	const submitForm = useSubmitForm(FORM.HOOK_FORM)

	return (
		<Button
			onClick={() => {
				if (submitForm) {
					submitForm()
				}
			}}
		>
			RemoteSubmit
		</Button>
	)
}

export default RemoteSubmit

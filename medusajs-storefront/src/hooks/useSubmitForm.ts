import { useFormOutside } from '@/providers/FormsProvider'
import { FORM } from '@/utils/enums'

import type { FormInstance } from 'antd'

const useSubmitForm = (form: FORM): FormInstance['submit'] | undefined => {
	const { getFormInstance } = useFormOutside()

	return getFormInstance(form)?.submit
}

export default useSubmitForm

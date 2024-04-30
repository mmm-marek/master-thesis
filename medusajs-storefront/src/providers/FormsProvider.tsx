import { FormInstance } from 'antd'
import { isEmpty } from 'lodash'
import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react'

import { FORM } from '@/utils/enums'

const FormsContext = createContext({
	getFormInstance: (formName: FORM) => {
		// eslint-disable-next-line no-console
		console.log('getForm', formName)
		return {} as FormInstance | undefined
	},
	setFormInstance: (formName: FORM, formInstance?: FormInstance) => {
		// eslint-disable-next-line no-console
		console.log('setFormInstance', formName, formInstance)
	}
})

export const useFormOutside = () => {
	return useContext(FormsContext)
}

export const FormsContextProvider = ({ children }: { children: ReactNode }) => {
	const [formInstances, setFormInstances] = useState<Partial<Record<FORM, FormInstance | undefined>>>({})

	const setFormInstance = useCallback(
		(formName: FORM, formInstance?: FormInstance) => {
			setFormInstances({
				...formInstances,
				[formName]: formInstance
			})
		},
		[formInstances]
	)

	const getFormInstance = useCallback(
		(formName: FORM) => {
			const formInstance = formInstances[formName]
			if (!isEmpty(formInstances) && !formInstance) {
				// eslint-disable-next-line no-console
				console.warn(`Instance of Form '${formName}' not found. Must be registered in FormsContext.`)
			}

			return formInstance
		},
		[formInstances]
	)

	const value = useMemo(
		() => ({
			setFormInstance,
			getFormInstance
		}),
		[getFormInstance, setFormInstance]
	)

	return <FormsContext.Provider value={value}>{children}</FormsContext.Provider>
}

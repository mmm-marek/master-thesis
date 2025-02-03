import React from 'react'
import { useController } from 'react-hook-form'
import { ZodTypeAny, z } from 'zod'

import type { Control } from 'react-hook-form'

type Props<T extends React.ComponentType<any>> = {
	control: Control<z.infer<ZodTypeAny>>
	name: string
	component: T
} & Omit<React.ComponentPropsWithRef<T>, 'input' | 'meta'>

const HookFormField = <T extends React.ComponentType<any>>(props: Props<T>) => {
	const { control, name, component } = props
	const FieldComponent = component as React.ComponentProps<T>

	const { field, fieldState } = useController({
		name,
		control
	})

	return <FieldComponent {...props} input={field} meta={{ ...fieldState, error: fieldState?.error?.message ? fieldState.error.message : null }} />
}

export default HookFormField

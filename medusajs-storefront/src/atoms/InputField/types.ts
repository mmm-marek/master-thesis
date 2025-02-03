import { PropsWithChildren } from 'react'
import { InputProps } from 'react-aria-components'

import { WrappedFieldsProps } from '@/types/types'

export type InputFieldProps = PropsWithChildren<InputProps & WrappedFieldsProps & { label: string }>

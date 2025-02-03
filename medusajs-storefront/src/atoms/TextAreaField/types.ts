import { PropsWithChildren } from 'react'
import { TextAreaProps } from 'react-aria-components'

import { WrappedFieldsProps } from '@/types/types'

export type TextAreaFieldProps = PropsWithChildren<TextAreaProps & WrappedFieldsProps & { label: string; rows?: number }>

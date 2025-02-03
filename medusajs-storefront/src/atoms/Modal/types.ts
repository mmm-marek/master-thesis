import { PropsWithChildren } from 'react'
import { ModalOverlayProps } from 'react-aria-components'

export type ModalProps = PropsWithChildren<Omit<ModalOverlayProps, 'children'>>

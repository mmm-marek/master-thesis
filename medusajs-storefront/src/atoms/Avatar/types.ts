import { ReactNode } from 'react'

type ImageProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export type AvatarProps = {
	src: Nullish<string>
	defaultImage?: string
	isCircle?: boolean
	badge?: ReactNode
} & Omit<ImageProps, 'src'>

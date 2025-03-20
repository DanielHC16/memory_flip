import { ImageSourcePropType } from "react-native"

export interface CardData {
	id: number
	label: string
	img: ImageSourcePropType | undefined
}

export interface FlipCardProps {
	image: ImageSourcePropType | undefined
	label: string
	id: number
	onFlip: (label: string, id: number) => void
	isFlipped: boolean
	isMatched: boolean
	isPressable: boolean
}

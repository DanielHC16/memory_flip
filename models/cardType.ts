import { ImageSourcePropType } from "react-native"

export interface CardData {
	id: number
	label: string
	img: ImageSourcePropType | undefined
}

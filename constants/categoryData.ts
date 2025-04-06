import { CardData } from "@/models/cardType"
import { FRUITS_VEGETABLES_DATA } from "./fruitsVegetablesData"
import { ANIMALS_DATA } from "./animalsData"
import animals from "@/constants/animal_images"
import fruit_vegs from "@/constants/fruits_veg_images"

import { ImageSourcePropType } from "react-native"
import { SPACE_DATA } from "./spaceData"
import space_images from "./space_images"
import { MUSIC_DATA } from "./musicData"
import music_images from "./music_images"
export interface Category {
	id: string
	data: CardData[]
	img: ImageSourcePropType
}

export const CATEGORIES_DATA: Category[] = [
	{
		id: "Fruits",
		data: FRUITS_VEGETABLES_DATA,
		img: fruit_vegs.fruit_vegs,
	},
	{
		id: "Food",
		data: ANIMALS_DATA,
		img: animals.animals,
	},

	{
		id: "Heroes",
		data: SPACE_DATA,
		img: space_images.space,
	},
	{
		id: "Fiestas",
		data: MUSIC_DATA,
		img: music_images.music,
	},
]

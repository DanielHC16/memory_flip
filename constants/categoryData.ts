import { CardData } from "@/models/cardType"
import { FRUITS_VEGETABLES_DATA } from "./fruitsVegetablesData"
import { ANIMALS_DATA } from "./animalsData"
import animals from "@/constants/animal_images"
import fruit_vegs from "@/constants/fruits_veg_images"

import { ImageSourcePropType } from "react-native"
export interface Category {
	id: string
	data: CardData[]
	img: ImageSourcePropType
}

export const CATEGORIES_DATA: Category[] = [
	{
		id: "fruits",
		data: FRUITS_VEGETABLES_DATA,
		img: fruit_vegs.fruit_vegs,
	},
	{
		id: "animals",
		data: ANIMALS_DATA,
		img: animals.animals,
	},
]

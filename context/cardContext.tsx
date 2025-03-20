import { CardData } from "@/models/cardType"
import React, { createContext, useState } from "react"

interface CardContextType {
	selectedLabel: string
	setSelectedLabel: React.Dispatch<React.SetStateAction<string>>
	tempLabel: string
	setTempLabel: React.Dispatch<React.SetStateAction<string>>
	setActiveCategoryData: React.Dispatch<React.SetStateAction<CardData[]>>
	activeCategoryData: CardData[]
	selectedCategory: string
	setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
}

export const CardContext = createContext<CardContextType>({
	selectedLabel: "",
	setSelectedLabel: () => {},
	tempLabel: "",
	setTempLabel: () => {},
	setActiveCategoryData: () => {},
	activeCategoryData: [],
	selectedCategory: "",
	setSelectedCategory: () => {},
})

interface CardContextProps {
	children: React.ReactNode
}
const CardProvider = ({ children }: CardContextProps) => {
	const [selectedLabel, setSelectedLabel] = useState<string>("")
	const [tempLabel, setTempLabel] = useState<string>("")
	const [activeCategoryData, setActiveCategoryData] = useState<CardData[]>([])
	const [selectedCategory, setSelectedCategory] = useState<string>("")

	return (
		<CardContext.Provider
			value={{
				selectedLabel,
				setSelectedLabel,
				selectedCategory,
				setSelectedCategory,
				tempLabel,
				setTempLabel,
				setActiveCategoryData,
				activeCategoryData,
			}}
		>
			{children}
		</CardContext.Provider>
	)
}
export default CardProvider

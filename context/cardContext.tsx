import { CardData } from "@/models/cardType"
import React, { createContext, useState } from "react"

interface CardContextType {
	selectedLabel: string
	setSelectedLabel: React.Dispatch<React.SetStateAction<string>>
	tempLabel: string
	setTempLabel: React.Dispatch<React.SetStateAction<string>>
	setActiveCategoryData: React.Dispatch<React.SetStateAction<CardData[]>>
	activeCategoryData: CardData[]
}

export const CardContext = createContext<CardContextType>({
	selectedLabel: "",
	setSelectedLabel: () => {},
	tempLabel: "",
	setTempLabel: () => {},
	setActiveCategoryData: () => {},
	activeCategoryData: [],
})

interface CardContextProps {
	children: React.ReactNode
}
const CardProvider = ({ children }: CardContextProps) => {
	const [selectedLabel, setSelectedLabel] = useState<string>("dgsgsg")
	const [tempLabel, setTempLabel] = useState<string>("gdfgfdgd")
	const [activeCategoryData, setActiveCategoryData] = useState<CardData[]>([])

	return (
		<CardContext.Provider
			value={{
				selectedLabel,
				setSelectedLabel,
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

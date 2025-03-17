import React, { createContext, useState } from "react"

interface CardContextType {
	selectedLabel: string
	setSelectedLabel: React.Dispatch<React.SetStateAction<string>>
	tempLabel: string
	setTempLabel: React.Dispatch<React.SetStateAction<string>>
}

export const CardContext = createContext<CardContextType>({
	selectedLabel: "",
	setSelectedLabel: () => {},
	tempLabel: "",
	setTempLabel: () => {},
})

interface CardContextProps {
	children: React.ReactNode
}
const CardProvider = ({ children }: CardContextProps) => {
	const [selectedLabel, setSelectedLabel] = useState<string>("dgsgsg")
	const [tempLabel, setTempLabel] = useState<string>("gdfgfdgd")

	return (
		<CardContext.Provider
			value={{
				selectedLabel,
				setSelectedLabel,
				tempLabel,
				setTempLabel,
			}}
		>
			{children}
		</CardContext.Provider>
	)
}
export default CardProvider

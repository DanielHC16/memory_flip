import { View, Text, Image, Pressable, ImageBackground } from "react-native"
import React, { useContext } from "react"
import { LinearGradient } from "expo-linear-gradient"
import { CATEGORIES_DATA } from "@/constants/categoryData"
import { CardContext } from "@/context/cardContext"
import { CardData } from "@/models/cardType"
import { useRouter } from "expo-router"

const Selection = () => {
	const { setActiveCategoryData, setSelectedLabel, setTempLabel } =
		useContext(CardContext)
	const router = useRouter()
	const handleSelection = (d: CardData[]) => {
		setActiveCategoryData(d)
		router.push("/cards")
		setSelectedLabel("")
		setTempLabel("")
	}
	return (
		<View className="flex-1">
			<LinearGradient colors={["#35bee8", "#c545df"]} className="flex-1">
				<Text className="text-white text-2xl font-bold text-center mt-4">
					Select a category to start!
				</Text>
				<View className="justify-center items-center gap-4 mt-6 flex-row flex-wrap">
					{CATEGORIES_DATA.map((c) => (
						<Pressable
							key={c.id}
							onPress={() => handleSelection(c.data)}
						>
							<ImageBackground
								source={c.img}
								resizeMode="cover"
								className="h-44 w-44 overflow-hidden rounded-2xl border-2 border-black"
							>
								<LinearGradient
									className="flex-1 rounded-lg justify-center"
									colors={[
										"rgba(0, 0,0, 0.5)",
										"rgba(0, 0,0, 0.3)",
									]}
								>
									<Text className="text-center text-3xl text-white font-medium">
										{c.id.toUpperCase()}
									</Text>
								</LinearGradient>
							</ImageBackground>
						</Pressable>
					))}
				</View>
			</LinearGradient>
		</View>
	)
}

export default Selection

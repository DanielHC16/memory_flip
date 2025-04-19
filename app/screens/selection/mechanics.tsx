import { View, Text, Pressable, ScrollView } from "react-native"
import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"




export const options = {
	headerShown: false,
}

const Mechanics = () => {
	const router = useRouter()

	return (
		<LinearGradient colors={["cornsilk", "cornsilk"]} className="flex-1 pt-12 px-6">
			{/* Custom Header */}
			<View className="flex-row items-center mb-4">
				<Pressable onPress={() => router.back()} className="mr-3">
					
				</Pressable>
				<Text className="text-2xl font-extrabold text-[#3C3B1F] text-center flex-1">
					Game Mechanics
				</Text>
			</View>

			<ScrollView
				className="flex-1"
				contentContainerStyle={{ paddingBottom: 40, alignItems: "center" }}
			>
				{/* Info Boxes */}
				<View className="bg-[#D9D4AB] p-4 rounded-2xl border border-[#A0A060] shadow-sm w-full max-w-md mb-4">
					<Text className="text-[#3C3B1F] text-lg font-semibold mb-2">
						Objective
					</Text>
					<Text className="text-[#3C3B1F] text-base">
						Flip the cards and try to match all the pairs. The goal is to clear the board with as few moves as possible.
					</Text>
				</View>

				<View className="bg-[#D9D4AB] p-4 rounded-2xl border border-[#A0A060] shadow-sm w-full max-w-md mb-4">
					<Text className="text-[#3C3B1F] text-lg font-semibold mb-2">
						How to Play
					</Text>
					<Text className="text-[#3C3B1F] text-base">
						1. Tap a card to flip it over.{"\n"}
						2. Tap a second card to try to find a match.{"\n"}
						3. If the cards match, you get points!{"\n"}
						4. If not, they flip back over.{"\n"}
						5. Keep going until all pairs are found!
					</Text>
				</View>

				<View className="bg-[#D9D4AB] p-4 rounded-2xl border border-[#A0A060] shadow-sm w-full max-w-md">
					<Text className="text-[#3C3B1F] text-lg font-semibold mb-2">
						Tip
					</Text>
					<Text className="text-[#3C3B1F] text-base">
						Pay attention to the cards you’ve already flipped. Memorization is key!
					</Text>
				</View>
			</ScrollView>

			{/* Back Button */}
			<View className="absolute bottom-8 left-0 right-0 items-center">
				<Pressable
					className="bg-[#A0A060] px-6 py-3 rounded-xl shadow-md"
					onPress={() => router.back()}
				>
					<Text className="text-white font-semibold text-lg">Back</Text>
				</Pressable>
			</View>
		</LinearGradient>
	)
}

export default Mechanics

import { View, Text, Pressable } from "react-native"
import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"

const Credits = () => {
	const router = useRouter()

	return (
		<LinearGradient colors={["cornsilk", "cornsilk"]} className="flex-1 pt-12 px-6">
			<View className="mb-6">
				<Text className="text-3xl font-extrabold text-[#3C3B1F] text-center">
					Credits
				</Text>
                <Text className="text-1xl font-bold text-[#3C3B1F] text-center">
					Created by BSCS 2-2 Group 1
				</Text>
			</View>

			<View className="bg-[#D9D4AB] p-6 rounded-2xl border border-[#A0A060] shadow-sm space-y-4">
				<Text className="text-[#3C3B1F] text-lg font-semibold">
					Core Developer
				</Text>
				<Text className="text-[#3C3B1F] text-base">Daniel Hardy C. Camacho</Text>

				<Text className="text-[#3C3B1F] text-lg font-semibold mt-4">
					UI Design Lead
				</Text>
				<Text className="text-[#3C3B1F] text-base">Trisha Mae R. Lau</Text>

                <Text className="text-[#3C3B1F] text-lg font-semibold mt-4">
					Supporting Developers
				</Text>
                <Text className="text-[#3C3B1F] text-base">Jed Anthony S. Capistrano</Text>
                <Text className="text-[#3C3B1F] text-base">Lacongan III A. Esmael</Text>
                <Text className="text-[#3C3B1F] text-base">Reinbrant Ryan Mariano</Text>

				<Text className="text-[#3C3B1F] text-lg font-semibold mt-4">
					Tools Used
				</Text>
				<Text className="text-[#3C3B1F] text-base">
					React Native, Expo, Tailwind CSS, Lottie
				</Text>
			</View>

			<Pressable
				className="bg-[#A0A060] mt-6 p-3 rounded-xl self-center shadow-md"
				onPress={() => router.back()}
			>
				<Text className="text-white font-semibold text-lg">Back</Text>
			</Pressable>
		</LinearGradient>
	)
}

export default Credits

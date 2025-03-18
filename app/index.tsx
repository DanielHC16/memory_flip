import { View, Text, SafeAreaView, Image, Pressable } from "react-native"
import React from "react"
import "../global.css"
import fruits from "@/constants/fruits_veg_images"
import { Link, useRouter } from "expo-router"
import CardProvider from "@/context/cardContext"
import { StatusBar } from "expo-status-bar"
import { LinearGradient } from "expo-linear-gradient"

const App = () => {
	const router = useRouter()
	return (
		<SafeAreaView className="flex-1">
			<LinearGradient
				colors={["#35E89c", "#060433"]}
				className="justify-center flex-1 items-center"
			>
				<Pressable onPress={() => router.push("/screens/selection")}>
					<Text className="text-3xl font-medium text-white">
						GET STARTED
					</Text>
				</Pressable>
			</LinearGradient>
		</SafeAreaView>
	)
}

export default App

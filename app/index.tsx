import { View, Text, Pressable } from "react-native"
import React from "react"
import "../global.css"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { LinearGradient } from "expo-linear-gradient"

const App = () => {
	const router = useRouter()
	return (
		<View className="flex-1">
			<LinearGradient
				colors={["#35E89c", "#060433"]}
				className="justify-center flex-1 items-center"
			>
				<Pressable onPress={() => router.push("/screens/selection")}>
					<Text className="text-3xl font-medium text-white">
						PLAY
					</Text>
				</Pressable>
			</LinearGradient>
			<StatusBar style="dark" hideTransitionAnimation="fade" />
		</View>
	)
}

export default App

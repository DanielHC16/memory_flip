import {
	View,
	Text,
	Pressable,
	ImageBackground,
	BackHandler,
} from "react-native"
import React, { useEffect, useState } from "react"
import "../global.css"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import ExitGameModal from "@/components/modals/ExitGameModal"

const App = () => {
	const router = useRouter()

	const [exitModalVisible, setExitModalVisible] = useState<boolean>(false)

	useEffect(() => {
		const backAction = () => {
			setExitModalVisible(!exitModalVisible)
			return true
		}
		BackHandler.addEventListener("hardwareBackPress", backAction)

		return () => {
			BackHandler.removeEventListener("hardwareBackPress", backAction)
		}
	}, [])

	return (
		<View className="flex-1">
			<ImageBackground
				source={require("@/assets/images/icon.png")}
				resizeMode="cover"
				style={{
					justifyContent: "center", // Center the content vertically
					alignItems: "center",
					flex: 1,
					paddingTop: 290, // Add padding to move the button up a bit
				}}
			>
				<Pressable
					className="rounded-lg px-6 py-4 border-4 border-yellow-300 hover:scale-105 transition-all duration-200" 
					onPress={() => router.push("/screens/selection")}
				>
					<Text className="text-3xl font-medium text-white">
						PLAY
					</Text>
				</Pressable>
			</ImageBackground>

			<View>
				<ExitGameModal
					onClose={() => setExitModalVisible(!exitModalVisible)}
					visible={exitModalVisible}
					onPressNo={() => {
						setExitModalVisible(!exitModalVisible)
					}}
					onPressYes={() => {
						BackHandler.exitApp()
						setExitModalVisible(!exitModalVisible)
					}}
				/>
			</View>

			<StatusBar style="light" hideTransitionAnimation="fade" />
		</View>
	)
}

export default App

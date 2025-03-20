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
					justifyContent: "flex-end",
					alignItems: "center",
					flex: 1,
				}}
			>
				<Pressable
					className="rounded-2xl px-4 py-2 border-2 border-white  mb-64"
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

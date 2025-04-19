import {
	View,
	Text,
	Pressable,
	ImageBackground,
	Modal,
	StyleSheet,
	BackHandler,
} from "react-native"
import React, { useContext, useEffect, useState } from "react"
import { LinearGradient } from "expo-linear-gradient"
import { CATEGORIES_DATA } from "@/constants/categoryData"
import { CardContext } from "@/context/cardContext"
import { CardData } from "@/models/cardType"
import { useRouter } from "expo-router"
import { Colors } from "react-native/Libraries/NewAppScreen"
import LottieView from "lottie-react-native"
import { AntDesign } from "@expo/vector-icons" // optional icon use

const Selection = () => {
	useEffect(() => {
		const backAction = () => {
			router.back()
			return true
		}
		BackHandler.addEventListener("hardwareBackPress", backAction)
		return () => {
			BackHandler.removeEventListener("hardwareBackPress", backAction)
		}
	}, [])

	const {
		setActiveCategoryData,
		setSelectedLabel,
		setTempLabel,
		setSelectedCategory,
	} = useContext(CardContext)

	const router = useRouter()
	const [modalVisible, setModalVisible] = useState<boolean>(false)

	const handleSelection = (d: CardData[]) => {
		setModalVisible(true)
		setActiveCategoryData(d)
		setSelectedLabel("")
		setTempLabel("")

		const timeout = setTimeout(() => {
			router.push("/cards")
			setModalVisible(false)
		}, 2000)

		return () => clearTimeout(timeout)
	}

	return (
		<View className="flex-1">
			<LinearGradient colors={["cornsilk", "cornsilk"]} className="flex-1 pt-8">
				<View className="mb-6 mt-16">
					<View className="border border-[#A0A060] px-4 py-2 rounded-lg self-center shadow-sm bg-[#D9D4AB]">
						<Text className="text-2xl font-extrabold text-center text-[#3C3B1F]">
							Choose a <Text className="text-green-700">category</Text> to start playing!
						</Text>
					</View>
				</View>

				{/* New Buttons */}
				<View className="flex-row justify-center gap-4 mb-8">
					<Pressable
						onPress={() => router.push("/screens/selection/mechanics")}
						className="bg-[#D9D4AB] border border-[#A0A060] px-4 py-2 rounded-xl shadow-md"
					>
						<Text className="text-lg font-semibold text-[#3C3B1F]">Mechanics</Text>
					</Pressable>
					<Pressable
						onPress={() => router.push("/screens/selection/credits")}
						className="bg-[#D9D4AB] border border-[#A0A060] px-4 py-2 rounded-xl shadow-md"
					>
						<Text className="text-lg font-semibold text-[#3C3B1F]">Credits</Text>
					</Pressable>
				</View>

				{/* Category Grid */}
				<View className="justify-center items-center gap-4 mt-4 flex-row flex-wrap px-2">
					{CATEGORIES_DATA.map((c) => (
						<Pressable
							key={c.id}
							onPress={() => {
								setSelectedCategory(c.id)
								handleSelection(c.data)
							}}
						>
							<ImageBackground
								source={c.img}
								resizeMode="cover"
								className="h-44 w-44 overflow-hidden rounded-2xl border-2 border-green-700"
							>
								{/* Future label overlay? */}
							</ImageBackground>
						</Pressable>
					))}
				</View>
			</LinearGradient>

			{/* Modal */}
			<View>
				<Modal
					animationType="fade"
					transparent={true}
					visible={modalVisible}
					statusBarTranslucent
					onRequestClose={() => setModalVisible(false)}
				>
					<View style={styles.modalBackground}>
						<View style={styles.modalContent}>
							<Text className="text-[#3C3B1F] text-2xl font-extrabold mb-2">
								Loading...
							</Text>
							<View style={styles.gifView}>
								<LottieView
									style={{ flex: 1 }}
									autoPlay
									source={require("@/assets/gifs/colordots.json")}
									loop
								/>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		paddingHorizontal: 16,
	},
	modalContent: {
		width: '80%',
		backgroundColor: "#FFFDEB", // cornsilk-style color
		borderRadius: 24,
		paddingVertical: 24,
		paddingHorizontal: 20,
		alignItems: "center",
		elevation: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 6,
	},
	gifView: {
		height: 140,
		width: 140,
		marginTop: 8,
	},
})



export default Selection

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

	const [modalVisible, setModalVisible] = useState<boolean>(false)

	return (
		<View className="flex-1">
			<LinearGradient
				colors={["cornsilk", "cornsilk"]}
				className="flex-1 pt-8"
			>
			<View className="mb-8 mt-16">
  <View className="border border-[#A0A060] px-4 py-2 rounded-lg self-center shadow-sm bg-[#D9D4AB]">
    <Text className="text-2xl font-extrabold text-center text-[#3C3B1F]">
      Choose a{' '}
      <Text className="text-green-700">
        category
      </Text>{' '}
      to start playing!
    </Text>
  </View>
</View>
				
<View className="justify-center items-center gap-4 mt-12 flex-row flex-wrap">
  {CATEGORIES_DATA.map((c) => (
    <Pressable
      key={c.id}
      onPress={() => {
        setSelectedCategory(c.id);
        handleSelection(c.data);
      }}
    >
      <ImageBackground
        source={c.img}
        resizeMode="cover"
        className="h-44 w-44 overflow-hidden rounded-2xl border-2 border-green-700"
      >
        {/* Overlay Label Container */}
        <View className="absolute bottom-0 left-0 right-0 bg-[#D9D4AB]/90 rounded-b-2xl px-2 py-2">
          <Text className="text-center text-xl font-extrabold text-green-900 tracking-wide">
            {c.id.toUpperCase()}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  ))}
</View>

			</LinearGradient>
			<View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					statusBarTranslucent
					onRequestClose={() => setModalVisible(false)}
				>
					<View style={styles.modalBackground}>
						<LinearGradient
							style={{ borderRadius: 16 }}
							colors={[Colors.skyblue, Colors.light.tint]}
							className="justify-center items-center py-5 w-96"
						>
							<Text className="text-white text-2xl font-bold">
								Loading...
							</Text>
							<Text className="text-white text-2xl font-bold">
								{/* {
								activeCategoryLabel
							} */}
							</Text>

							<View style={styles.gifView}>
								<LottieView
									style={{ flex: 1 }}
									autoPlay
									source={require("@/assets/gifs/colordots.json")}
									loop
								/>
							</View>
						</LinearGradient>
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
		backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
	gifView: {
		height: 200,
		aspectRatio: 1,
	},
})

export default Selection

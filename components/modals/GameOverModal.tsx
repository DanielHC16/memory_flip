import { View, Text, Modal, Pressable, StyleSheet } from "react-native"
import React, { FC } from "react"
import LottieView from "lottie-react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Colors } from "@/constants/Colors"
import { Entypo } from "@expo/vector-icons"
import { GameOverModalProps } from "@/models/ModalTypes"

const GameOverModal: FC<GameOverModalProps> = ({
	onClose,
	score,
	visible,
	onConfirm,
}) => {
	return (
		<View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={visible}
				statusBarTranslucent
				onRequestClose={onClose}
			>
				<View style={styles.modalBackground}>
					<LinearGradient
						style={{ borderRadius: 16 }}
						colors={[Colors.skyblue, Colors.light.tint]}
						className="justify-center items-center py-5 w-96"
					>
						<View className="w-full items-end pr-5">
							<Pressable
								onPress={onConfirm}
								style={{ borderRadius: 12 }}
								className="justify-center items-center"
							>
								<Entypo name="cross" size={24} color="white" />
							</Pressable>
						</View>

						<Text className="text-white text-2xl font-bold">
							GAME IS OVER
						</Text>
						<Text className="text-white text-3xl font-bold">
							YOU WON!
						</Text>
						<Text className="text-3xl font-medium text-white">
							SCORE: {score}
						</Text>
						<View style={styles.gifView}>
							<LottieView
								style={{ flex: 1 }}
								autoPlay
								source={require("@/assets/gifs/celebrategif.json")}
								loop
							/>
						</View>
					</LinearGradient>
				</View>
			</Modal>
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

export default GameOverModal

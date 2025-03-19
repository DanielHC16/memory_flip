import { View, Text, Modal, Pressable, StyleSheet } from "react-native"
import React, { FC } from "react"
import { Colors } from "@/constants/Colors"
import { LinearGradient } from "expo-linear-gradient"
import { OptionsModalProps } from "@/models/ModalTypes"

const OptionsModal: FC<OptionsModalProps> = ({
	onClose,
	onRestart,
	onRestartAndShuffle,
	visible,
	onExitGame,
	onResume,
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
					<View className="bg-white h-auto py-4 w-96 items-center rounded-3xl">
						<Text className="text-center text-black text-2xl">
							OPTIONS
						</Text>
						<View className="w-full gap-x-2 items-center gap-y-3 mt-4">
							<LinearGradient
								style={{ borderRadius: 16 }}
								colors={[Colors.darkblue, Colors.skyblue]}
								className="justify-center items-center w-80 h-14"
							>
								<Pressable
									onPress={onResume}
									style={{ borderRadius: 12 }}
									className="w-full h-full justify-center items-center"
								>
									<Text className="text-white text-lg font-bold">
										Resume
									</Text>
								</Pressable>
							</LinearGradient>
							<LinearGradient
								style={{ borderRadius: 16 }}
								colors={[Colors.darkblue, Colors.darkblue]}
								className="justify-center items-center w-80 h-14"
							>
								<Pressable
									onPress={onRestart}
									style={{ borderRadius: 12 }}
									className="w-full h-full justify-center items-center"
								>
									<Text className="text-white text-lg font-bold">
										Restart Game
									</Text>
								</Pressable>
							</LinearGradient>
							<LinearGradient
								colors={[Colors.darkblue, Colors.skyblue]}
								style={{ borderRadius: 16 }}
								className="justify-center items-center w-80 h-14"
							>
								<Pressable
									onPress={onRestartAndShuffle}
									className="w-full h-full justify-center items-center"
								>
									<Text className="text-white text-lg font-bold">
										Restart and Shuffle Card
									</Text>
								</Pressable>
							</LinearGradient>
							<LinearGradient
								colors={[Colors.darkblue, Colors.darkblue]}
								style={{ borderRadius: 16 }}
								className="justify-center items-center w-80 h-14"
							>
								<Pressable
									onPress={onExitGame}
									className="w-full h-full justify-center items-center"
								>
									<Text className="text-white text-lg font-bold">
										Exit
									</Text>
								</Pressable>
							</LinearGradient>
						</View>
					</View>
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
})

export default OptionsModal

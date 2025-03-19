import { View, Text, Modal, Pressable, StyleSheet } from "react-native"
import React, { FC } from "react"
import { Colors } from "@/constants/Colors"
import { LinearGradient } from "expo-linear-gradient"
import { ExitModalProps } from "@/models/ModalTypes"

const ExitModal: FC<ExitModalProps> = ({
	onClose,
	visible,
	onPressNo,
	onPressYes,
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
					<View className="bg-white p-5 items-center rounded-3xl">
						<Text>Are you sure you want to exit game?</Text>
						<View className="w-full flex-row gap-x-2 items-center mt-4">
							<LinearGradient
								style={{ borderRadius: 16 }}
								colors={[Colors.skyblue, Colors.darkblue]}
								className="justify-center items-center w-20 h-14"
							>
								<Pressable
									onPress={onPressYes}
									style={{ borderRadius: 12 }}
									className="w-full h-full justify-center items-center"
								>
									<Text className="text-white text-lg font-bold">
										YES
									</Text>
								</Pressable>
							</LinearGradient>
							<LinearGradient
								colors={[Colors.red, Colors.black]}
								style={{ borderRadius: 16 }}
								className="justify-center items-center w-20 h-14"
							>
								<Pressable
									onPress={onPressNo}
									className="w-full h-full justify-center items-center"
								>
									<Text className="text-white text-lg font-bold">
										NO
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
	gifView: {
		height: 200,
		aspectRatio: 1,
	},
})
export default ExitModal

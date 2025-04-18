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
      <View className="bg-white w-80 py-5 items-center rounded-3xl">
        <Text className="text-center text-xl">
          Cancel and go back?
        </Text>
        <View className="w-full flex-row gap-x-2 justify-center items-center mt-4">
          <Pressable
            onPress={onPressYes}
            style={{
              backgroundColor: '#10B981', // Appropriate green color
              borderRadius: 12,
              width: '40%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text className="text-white text-lg font-bold">
              YES
            </Text>
          </Pressable>
          <Pressable
            onPress={onPressNo}
            style={{
              backgroundColor: '#EF4444', // Appropriate red color
              borderRadius: 12,
              width: '40%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text className="text-white text-lg font-bold">
              NO
            </Text>
          </Pressable>
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

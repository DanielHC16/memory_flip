import { View, Text, Modal, Pressable, StyleSheet } from "react-native"
import React, { FC } from "react"
import { ExitModalProps } from "@/models/ModalTypes"

const ExitGameModal: FC<ExitModalProps> = ({
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
          <View style={styles.modalContent}>
            <Text style={styles.titleText}>Confirm exit?</Text>
            <View style={styles.buttonContainer}>
              <Pressable
                onPress={onPressYes}
                style={[styles.button, styles.yesButton]}
              >
                <Text style={styles.buttonText}>YES</Text>
              </Pressable>
              <Pressable
                onPress={onPressNo}
                style={[styles.button, styles.noButton]}
              >
                <Text style={styles.buttonText}>NO</Text>
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
  modalContent: {
    backgroundColor: "white",
    width: 380,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  yesButton: {
    backgroundColor: "#10B981", // Green
  },
  noButton: {
    backgroundColor: "#EF4444", // Red
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default ExitGameModal

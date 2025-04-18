import { View, Text, Modal, Pressable, StyleSheet } from "react-native"
import React, { FC } from "react"
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
          <View style={styles.modalContent}>
            <Text style={styles.titleText}>OPTIONS</Text>
            <View style={styles.buttonContainer}>
              <Pressable
                onPress={onResume}
                style={[styles.button, styles.resumeButton]}
              >
                <Text style={styles.buttonText}>Resume</Text>
              </Pressable>
              <Pressable
                onPress={onRestart}
                style={[styles.button, styles.restartButton]}
              >
                <Text style={styles.buttonText}>Restart Game</Text>
              </Pressable>
              <Pressable
                onPress={onRestartAndShuffle}
                style={[styles.button, styles.shuffleButton]}
              >
                <Text style={styles.buttonText}>Restart and Shuffle Cards</Text>
              </Pressable>
              <Pressable
                onPress={onExitGame}
                style={[styles.button, styles.exitButton]}
              >
                <Text style={styles.buttonText}>Exit</Text>
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
  resumeButton: {
    backgroundColor: "#10B981", // Green
  },
  restartButton: {
    backgroundColor: "#3B82F6", // Blue
  },
  shuffleButton: {
    backgroundColor: "#F59E0B", // Yellow
  },
  exitButton: {
    backgroundColor: "#EF4444", // Red
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default OptionsModal

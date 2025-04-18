import { View, Text, Modal, Pressable, StyleSheet } from "react-native"
import React, { FC } from "react"
import LottieView from "lottie-react-native"
import { Colors } from "@/constants/Colors"
import { Entypo } from "@expo/vector-icons"
import { TimeupModalProps } from "@/models/ModalTypes"

const TimeupModal: FC<TimeupModalProps> = ({ onClose, score, visible }) => {
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
            <Pressable
              onPress={onClose}
              style={styles.closeButton}
            >
              <Entypo name="cross" size={24} color="white" />
            </Pressable>

            <Text style={styles.titleText}>TIME IS UP, GAME IS OVER!</Text>
            <Text style={styles.lossText}>YOU LOST!</Text>
            <Text style={styles.scoreText}>SCORE: {score}</Text>

            <View style={styles.gifView}>
              <LottieView
                style={{ flex: 1 }}
                autoPlay
                source={require("@/assets/gifs/sad_facegif.json")}
                loop
              />
            </View>

            <Pressable
              onPress={onClose}
              style={[styles.button, styles.confirmButton]}
            >
              <Text style={styles.buttonText}>OK</Text>
            </Pressable>
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
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  lossText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#F87171", // Red for loss
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "medium",
    color: "#333",
    marginBottom: 24,
  },
  gifView: {
    height: 200,
    aspectRatio: 1,
    marginBottom: 24,
  },
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#F87171", // Red button
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default TimeupModal

import { View, Text, Modal, Pressable, StyleSheet } from "react-native"
import React, { FC } from "react"
import LottieView from "lottie-react-native"
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
          <View style={styles.modalContent}>
            <Pressable
              onPress={onConfirm}
              style={styles.closeButton}
            >
              <Entypo name="cross" size={24} color="white" />
            </Pressable>

            <Text style={styles.titleText}>LEVEL COMPLETE</Text>
            <Text style={styles.winText}>YOU WON!</Text>
            <Text style={styles.scoreText}>
              SCORE: <Text style={styles.highlightedScore}>{score}</Text>
            </Text>

            <View style={styles.gifView}>
              <LottieView
                style={styles.animation}
                autoPlay
                source={require("@/assets/gifs/celebrategif.json")}
                loop
              />
            </View>

            <Pressable
              onPress={onConfirm}
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
  winText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#10B981", // Green for a win
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "medium",
    color: "#333",
    marginBottom: 24,
  },
  highlightedScore: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#10B981", // Highlighting the score value in green
  },
  gifView: {
    height: 200,
    aspectRatio: 1,
    marginBottom: 24,
  },
  animation: {
    flex: 1,
    height: 200, // Keeps the animation in place where the text is
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
    backgroundColor: "#10B981", // Green button
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default GameOverModal

import React, { useEffect, useRef, useState } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Stack } from "expo-router"
import CardProvider from "@/context/cardContext"
import { Audio } from "expo-av"
import { Ionicons } from "@expo/vector-icons"

const AppLayout = () => {
	const soundRef = useRef<Audio.Sound | null>(null)
	const [isMuted, setIsMuted] = useState(false)

	useEffect(() => {
		const loadAndPlayMusic = async () => {
			try {
				await Audio.setAudioModeAsync({
					playsInSilentModeIOS: true,
					staysActiveInBackground: true,
				})

				const { sound } = await Audio.Sound.createAsync(
					require("@/assets/audio/background.mp3"),
					{
						isLooping: true,
						volume: 0.5,
						shouldPlay: true,
					}
				)

				soundRef.current = sound
				await sound.playAsync()
			} catch (error) {
				console.error("Error playing background music", error)
			}
		}

		loadAndPlayMusic()

		return () => {
			soundRef.current?.unloadAsync()
		}
	}, [])

	const toggleMute = async () => {
		if (soundRef.current) {
			const newMutedState = !isMuted
			await soundRef.current.setIsMutedAsync(newMutedState)
			setIsMuted(newMutedState)
		}
	}

	return (
		<CardProvider>
			<View style={{ flex: 1 }}>
				<Stack
					screenOptions={{
						headerShown: false, // ✅ Hide the ugly white header for all screens
					}}
				/>

				{/* Mute/Unmute Button */}
				<TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
					<Ionicons
						name={isMuted ? "volume-mute" : "volume-high"}
						size={24}
						color="#fff"
					/>
				</TouchableOpacity>
			</View>
		</CardProvider>
	)
}

const styles = StyleSheet.create({
	muteButton: {
		position: "absolute",
		bottom: 20,
		left: 20,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		borderRadius: 30,
		padding: 10,
		elevation: 5,
	},
})

export default AppLayout

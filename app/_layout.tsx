import { View, Text } from "react-native"
import React from "react"
import { Stack } from "expo-router"
import CardProvider from "@/context/cardContext"

const AppLayout = () => {
	return (
		<CardProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen
					name="cards/index"
					options={{ headerShown: false }}
				/>
			</Stack>
		</CardProvider>
	)
}

export default AppLayout

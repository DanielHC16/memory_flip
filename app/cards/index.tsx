import React, { useContext, useState } from "react"
import {
	View,
	Image,
	Pressable,
	Text,
	StyleSheet,
	ImageSourcePropType,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated"
import { FRUITS_VEGETABLES_DATA } from "@/constants/fruitsVegetablesData"
import { CardContext } from "@/context/cardContext"

const FruitCards = () => {
	const { selectedLabel, tempLabel } = useContext(CardContext)
	return (
		<LinearGradient
			colors={["#35E89c", "#060433"]}
			className="flex-1 justify-center items-center"
		>
			<Text className="text-3xl font-medium text-white">
				Temp: {tempLabel}
			</Text>
			<Text className="text-3xl font-medium text-white">
				selected: {selectedLabel}
			</Text>

			<View className="flex-row flex-wrap justify-center w-full gap-4">
				{FRUITS_VEGETABLES_DATA.map((c) => (
					<FlipCard label={c.label} key={c.id} image={c.img} />
				))}
			</View>
		</LinearGradient>
	)
}

const FlipCard = ({
	image,
	label,
}: {
	image: ImageSourcePropType | undefined
	label: string
}) => {
	const [flipped, setFlipped] = useState(false)
	const rotate = useSharedValue(0)

	const { selectedLabel, setSelectedLabel, setTempLabel, tempLabel } =
		useContext(CardContext)

	const handlePress = (label: string) => {
		rotate.value = withTiming(flipped ? 0 : 180, { duration: 200 })
		setFlipped(!flipped)
		setSelectedLabel(label)

		if (selectedLabel === label) {
			setTempLabel(label)
		}
	}

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotateY: `${rotate.value}deg` }],
		}
	})

	return (
		<Pressable onPress={() => handlePress(label)}>
			<Animated.View
				className="justify-center items-center"
				style={[animatedStyle]}
			>
				{flipped ? (
					<View className="w-24 h-24 rounded-2xl bg-white justify-center items-center"></View>
				) : (
					<Image
						resizeMode="cover"
						className="w-24 h-24 rounded-2xl"
						source={image}
					/>
				)}
			</Animated.View>
		</Pressable>
	)
}

export default FruitCards

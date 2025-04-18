import { View, Image, Pressable, Dimensions } from "react-native"
import React, { FC, useEffect } from "react"
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated"
import { FlipCardProps } from "@/models/cardType"

const { width } = Dimensions.get("window")
const CARD_MARGIN = 0.5
const CARD_SIZE = (width / 3.4) - (CARD_MARGIN * 2)  // Fits 4 cards per row

const FlipCard: FC<FlipCardProps> = ({
	image,
	label,
	id,
	onFlip,
	isFlipped,
	isMatched,
	isPressable,
}) => {
	const rotate = useSharedValue(0)

	useEffect(() => {
		rotate.value = withTiming(isFlipped || isMatched ? 0 : 180, {
			duration: 300,
		})
	}, [isFlipped, isMatched])

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotateY: `${rotate.value}deg` }],
	}))

	const handlePress = () => {
		if (isMatched) return
		if (isPressable) {
			onFlip(label, id)
		}
	}

	return (
		<Pressable onPress={handlePress} style={{ margin: CARD_MARGIN }}>
			<Animated.View
				className={`justify-center items-center rounded-2xl ${
					isMatched ? "bg-transparent" : "bg-white"
				}`}
				style={[
					animatedStyle,
					{
						width: CARD_SIZE,
						height: CARD_SIZE,
					},
				]}
			>
				{isFlipped || isMatched ? (
					<Image
						resizeMode="cover"
						style={{
							width: CARD_SIZE,
							height: CARD_SIZE,
							borderRadius: 16,
							display: isMatched ? "none" : "flex",
						}}
						source={image}
					/>
				) : (
					<View
						style={{
							width: CARD_SIZE,
							height: CARD_SIZE,
							borderRadius: 16,
							backgroundColor: "#fff",
						}}
					/>
				)}
			</Animated.View>
		</Pressable>
	)
}

export default FlipCard

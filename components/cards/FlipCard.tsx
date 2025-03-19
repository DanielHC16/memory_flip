import { View, Image, Pressable, ImageSourcePropType } from "react-native"
import React, { FC, useEffect } from "react"
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated"

interface FlipCardProps {
	image: ImageSourcePropType | undefined
	label: string
	id: number
	onFlip: (label: string, id: number) => void
	isFlipped: boolean
	isMatched: boolean
	isPressable: boolean
}
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
		// Handle flip animation based on isFlipped or isMatched states
		rotate.value = withTiming(isFlipped || isMatched ? 180 : 0, {
			duration: 300,
		})
	}, [isFlipped, isMatched])

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotateY: `${rotate.value}deg` }],
	}))

	const handlePress = () => {
		if (isMatched) return // Don't allow flipping when the card is matched

		if (isPressable) {
			onFlip(label, id)
		}
	}

	return (
		<Pressable onPress={handlePress}>
			<Animated.View
				className={`justify-center items-center h-24 w-24 rounded-2xl ${
					isMatched ? "bg-transparent" : "bg-white"
				}`}
				style={[animatedStyle]}
			>
				{isFlipped || isMatched ? (
					<Image
						resizeMode="cover"
						className={`w-24 h-24 rounded-2xl ${
							isMatched ? "hidden" : "visible"
						}`}
						source={image}
					/>
				) : (
					<View className="w-24 h-24 rounded-2xl bg-white" />
				)}
			</Animated.View>
		</Pressable>
	)
}

export default FlipCard

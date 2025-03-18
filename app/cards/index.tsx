import React, { useContext, useEffect, useState } from "react"
import { View, Image, Pressable, Text, ImageSourcePropType } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated"
import { CardContext } from "@/context/cardContext"
import { AntDesign } from "@expo/vector-icons"
import { useRouter } from "expo-router"

const FruitCards = () => {
	const { selectedLabel, setSelectedLabel, activeCategoryData } =
		useContext(CardContext)
	const router = useRouter()
	const [flippedCards, setFlippedCards] = useState<number[]>([])
	const [matchedCards, setMatchedCards] = useState<number[]>([])
	const [score, setScore] = useState<number>(0)
	const [exitModalVisible, setExitModalVisible] = useState<boolean>(false)

	// New state to control flipping all cards
	const [flipAll, setFlipAll] = useState<boolean>(false)

	const handleFlip = (label: string, id: number) => {
		if (flippedCards.length === 1) {
			const firstId = flippedCards[0]

			// If the same card is tapped again, flip it back and empty flippedCards
			if (firstId === id) {
				setFlippedCards([])
				setSelectedLabel("")
			} else {
				setFlippedCards([firstId, id])

				if (selectedLabel === label) {
					setTimeout(() => {
						setScore(score + 10)
						setMatchedCards([...matchedCards, firstId, id])
						setFlippedCards([]) // Reset flipped cards after matching
						setSelectedLabel("")
					}, 1000)
				} else {
					// No match occurred, flip both cards back and reset flippedCards after a delay
					setTimeout(() => {
						setFlippedCards([])
						setSelectedLabel("")
					}, 1000)
				}
			}
		} else {
			setFlippedCards([id])
			setSelectedLabel(label)
		}
	}

	// Flip all cards function, triggers simultaneous flip
	const flipAllCards = () => {
		setFlipAll(true)
		// Wait for 1.5 seconds and then flip them back
		setTimeout(() => {
			setFlipAll(false)
		}, 1500)
	}

	useEffect(() => {
		flipAllCards() //trigger flip all cards at the beginning
	}, [])

	return (
		<LinearGradient
			colors={["#35E89c", "#060433"]}
			className="flex-1 justify-center items-center"
		>
			<AntDesign
				className="absolute left-4 top-3"
				name="leftcircleo"
				size={40}
				color="white"
				onPress={() => {
					router.back()
				}}
			/>
			{matchedCards.length === activeCategoryData.length ? (
				<Text className="text-center text-3xl font-medium text-white">
					{`GAME OVER\n SCORE: ${score}`}
				</Text>
			) : (
				<Text className="text-3xl font-medium text-white">
					SCORE: {score}
				</Text>
			)}

			{/* Button to trigger the flip of all cards */}

			<View className="flex-row flex-wrap justify-center w-full gap-4 mt-6">
				{activeCategoryData.map((c) => (
					<FlipCard
						key={c.id}
						id={c.id}
						image={c.img}
						label={c.label}
						onFlip={handleFlip}
						isFlipped={flippedCards.includes(c.id) || flipAll}
						isMatched={matchedCards.includes(c.id)}
					/>
				))}
			</View>
		</LinearGradient>
	)
}

const FlipCard = ({
	image,
	label,
	id,
	onFlip,
	isFlipped,
	isMatched,
}: {
	image: ImageSourcePropType | undefined
	label: string
	id: number
	onFlip: (label: string, id: number) => void
	isFlipped: boolean
	isMatched: boolean
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
		onFlip(label, id)
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

export default FruitCards

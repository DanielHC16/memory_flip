import React, { useContext, useEffect, useState } from "react"
import {
	View,
	Image,
	Pressable,
	Text,
	ImageSourcePropType,
	Modal,
	StyleSheet,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated"
import { CardContext } from "@/context/cardContext"
import { AntDesign, Entypo } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Colors } from "@/constants/Colors"
import LottieView from "lottie-react-native"
import { CardData } from "@/models/cardType"

const FruitCards = () => {
	const { selectedLabel, setSelectedLabel, activeCategoryData } =
		useContext(CardContext)
	const router = useRouter()
	const [flippedCards, setFlippedCards] = useState<number[]>([])
	const [matchedCards, setMatchedCards] = useState<number[]>([])
	const [score, setScore] = useState<number>(0)
	const [exitModalVisible, setExitModalVisible] = useState<boolean>(false)
	const [gameOverModalVisible, setGameOverModalVisible] =
		useState<boolean>(false)
	const [shuffleAllowed, setShuffleAllowed] = useState<boolean>(true)

	// New state to control flipping all cards
	const [flipAll, setFlipAll] = useState<boolean>(false)
	const [isPressable, setIsPressable] = useState<boolean>(false)

	const shuffleArray = () => {
		const shuffled = [...activeCategoryData] // Create a shallow copy to avoid mutating the original array
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1)) // Get a random index
			;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] // Swap elements
		}
		setShuffledData(shuffled)
	}

	const [shuffledData, setShuffledData] =
		useState<CardData[]>(activeCategoryData)

	const handleFlip = (label: string, id: number) => {
		setShuffleAllowed(false)
		if (flippedCards.length === 2) return // Do not allow tapping 3rd card when 2 card are flipped, wait for match check and the actions
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

	useEffect(() => {
		setTimeout(() => {
			setIsPressable(true)
		}, 1500)
	}, [])

	// Flip all cards function simultaneously
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

	useEffect(() => {
		if (matchedCards.length === activeCategoryData.length) {
			setGameOverModalVisible(true)
		}
	}, [matchedCards])

	return (
		<LinearGradient
			colors={["#35E89c", "#060433"]}
			className="flex-1 items-center pt-10 px-4"
		>
			<View className="w-full flex-row justify-between items-center">
				<AntDesign
					name="leftcircleo"
					size={40}
					color="white"
					onPress={() => {
						setExitModalVisible(!exitModalVisible)
					}}
				/>
				{matchedCards.length === 0 && shuffleAllowed ? (
					<Pressable
						onPress={
							matchedCards.length === 0 ? shuffleArray : () => {}
						}
						className={`justify-center items-center bg-transparent border-2 rounded-2xl w-36 h-12`}
					>
						<Text className="text-black text-lg font-bold">
							Shuffle Cards
						</Text>
					</Pressable>
				) : (
					<View className="bg-transparent w-36 h-12" />
					//to prevent sliding, the view must have the same height and width
				)}
			</View>
			<Text className="text-3xl font-medium text-white mt-5">
				SCORE: {score}
			</Text>
			<View className="flex-row flex-wrap justify-center w-full gap-4 mt-6">
				{shuffledData.map((c) => (
					<FlipCard
						isPressable={isPressable}
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
			<View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={exitModalVisible}
					statusBarTranslucent
					onRequestClose={() => setExitModalVisible(false)}
				>
					<View style={styles.modalBackground}>
						<View className="bg-white p-5 items-center rounded-3xl">
							<Text>Are you sure you want to exit game?</Text>
							<View className="w-full flex-row gap-x-2 items-center mt-4">
								<LinearGradient
									style={{ borderRadius: 16 }}
									colors={[Colors.skyblue, Colors.darkblue]}
									className="justify-center items-center w-20 h-14"
								>
									<Pressable
										onPress={() => router.back()}
										style={{ borderRadius: 12 }}
										className="w-full h-full justify-center items-center"
									>
										<Text className="text-white text-lg font-bold">
											YES
										</Text>
									</Pressable>
								</LinearGradient>
								<LinearGradient
									colors={[Colors.red, Colors.black]}
									style={{ borderRadius: 16 }}
									className="justify-center items-center w-20 h-14"
								>
									<Pressable
										onPress={() =>
											setExitModalVisible(false)
										}
										className="w-full h-full justify-center items-center"
									>
										<Text className="text-white text-lg font-bold">
											NO
										</Text>
									</Pressable>
								</LinearGradient>
							</View>
						</View>
					</View>
				</Modal>
				<Modal
					animationType="slide"
					transparent={true}
					visible={gameOverModalVisible}
					statusBarTranslucent
					onRequestClose={() => setExitModalVisible(false)}
				>
					<View style={styles.modalBackground}>
						<LinearGradient
							style={{ borderRadius: 16 }}
							colors={[Colors.skyblue, Colors.light.tint]}
							className="justify-center items-center py-5 w-96"
						>
							<View className="w-full items-end pr-5">
								<Pressable
									onPress={() => router.back()}
									style={{ borderRadius: 12 }}
									className="justify-center items-center"
								>
									<Entypo
										name="cross"
										size={24}
										color="white"
									/>
								</Pressable>
							</View>

							<Text className="text-white text-2xl font-bold">
								GAME IS OVER
							</Text>
							<Text className="text-white text-3xl font-bold">
								YOU WON!
							</Text>
							<Text className="text-3xl font-medium text-white">
								SCORE: {score}
							</Text>
							<View style={styles.gifView}>
								<LottieView
									style={{ flex: 1 }}
									autoPlay
									source={require("@/assets/gifs/celebrategif.json")}
									loop
								/>
							</View>
						</LinearGradient>
					</View>
				</Modal>
			</View>
		</LinearGradient>
	)
}
const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
	gifView: {
		height: 200,
		aspectRatio: 1,
	},
})
const FlipCard = ({
	image,
	label,
	id,
	onFlip,
	isFlipped,
	isMatched,
	isPressable,
}: {
	image: ImageSourcePropType | undefined
	label: string
	id: number
	onFlip: (label: string, id: number) => void
	isFlipped: boolean
	isMatched: boolean
	isPressable: boolean
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

export default FruitCards

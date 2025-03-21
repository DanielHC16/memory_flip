import React, { useContext, useEffect, useRef, useState } from "react"
import { View, Text, ListRenderItem, FlatList, BackHandler } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { CardContext } from "@/context/cardContext"
import { AntDesign } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { CardData } from "@/models/cardType"
import GameOverModal from "@/components/modals/GameOverModal"
import ExitModal from "@/components/modals/ExitModal"
import FlipCard from "@/components/cards/FlipCard"
import TimeupModal from "@/components/modals/TimeupModal"
import OptionsModal from "@/components/modals/OptionsModal"
import LottieView from "lottie-react-native"

const FruitCards = () => {
	useEffect(() => {
		const backAction = () => {
			setExitModalVisible(!exitModalVisible)
			setIsPlaying(false)
			animationRef.current?.pause()
			return true
		}

		BackHandler.addEventListener("hardwareBackPress", backAction)

		return () => {
			BackHandler.removeEventListener("hardwareBackPress", backAction)
		}
	}, [])
	const {
		selectedLabel,
		setSelectedLabel,
		selectedCategory,
		activeCategoryData,
	} = useContext(CardContext)
	const router = useRouter()

	const animationRef = useRef<LottieView>(null)

	const [flippedCards, setFlippedCards] = useState<number[]>([])
	const [matchedCards, setMatchedCards] = useState<number[]>([])
	const [score, setScore] = useState<number>(0)
	const [exitModalVisible, setExitModalVisible] = useState<boolean>(false)
	const [gameOverModalVisible, setGameOverModalVisible] =
		useState<boolean>(false)
	const [time, setTime] = useState<number>(0)
	const [flipAll, setFlipAll] = useState<boolean>(false)
	const [isPressable, setIsPressable] = useState<boolean>(false)
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [isPaused, setIsPaused] = useState<boolean>(false)

	const [timeupModalVisible, setTimeupModalVisible] = useState<boolean>(false)
	const [optionsModalVisible, setOptionsModalVisible] =
		useState<boolean>(false)

	const shuffleArray = () => {
		const shuffled = [...activeCategoryData]
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
		}
		setShuffledData(shuffled)
	}
	const formattedMins: string = String(Math.floor(time / 60)).padStart(2, "0")
	const formattedSeconds: string = String(time % 60).padStart(2, "0")

	const [shuffledData, setShuffledData] =
		useState<CardData[]>(activeCategoryData)

	const handleFlip = (label: string, id: number) => {
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

	const handleRestart = () => {
		setIsPaused(!isPaused)
		setScore(0)
		setFlippedCards([])
		setSelectedLabel("")
		setMatchedCards([])
		setIsPressable(false)
		setIsPlaying(false)
		setTime(0)
		setOptionsModalVisible(false)
		animationRef.current?.reset()
		setTimeout(() => {
			setIsPressable(true)
			setIsPlaying(true)
			animationRef.current?.play()
		}, 1500)
		setTimeout(() => {
			flipAllCards()
		}, 300)
	}

	const handleRestartAndShuffle = () => {
		shuffleArray()
		handleRestart()
	}

	const flipAllCards = () => {
		setFlipAll(true)
		setTimeout(() => {
			setFlipAll(false)
		}, 1500)
	}

	useEffect(() => {
		setTimeout(() => {
			setIsPressable(true)
		}, 1200)
	}, [])

	useEffect(() => {
		flipAllCards()
	}, [])

	useEffect(() => {
		if (matchedCards.length === activeCategoryData.length) {
			setGameOverModalVisible(true)
			setIsPlaying(false)
		}
	}, [matchedCards])

	useEffect(() => {
		setTimeout(() => {
			setIsPlaying(true)
			animationRef.current?.play()
		}, 1000)
	}, [])

	useEffect(() => {
		let timer: NodeJS.Timeout

		if (time === 60) {
			setIsPlaying(false)
			{
				if (matchedCards.length === activeCategoryData.length) {
					setGameOverModalVisible(true)
				} else {
					animationRef.current?.pause()
					setIsPlaying(false)
					setTimeupModalVisible(true)
				}
			}
		}
		if (isPlaying) {
			timer = setTimeout(() => {
				setTime(time + 1)
			}, 1000)
		}

		return () => {
			clearTimeout(timer)
		}
	}, [time, isPlaying])

	const renderItem: ListRenderItem<CardData> = ({ item }) => {
		return (
			<FlipCard
				isPressable={isPressable}
				key={item.id}
				id={item.id}
				image={item.img}
				label={item.label}
				onFlip={handleFlip}
				isFlipped={flippedCards.includes(item.id) || flipAll}
				isMatched={matchedCards.includes(item.id)}
			/>
		)
	}

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
						setIsPlaying(false)
						animationRef.current?.pause()
					}}
				/>

				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "flex-start",
						height: 50,
						borderWidth: 1.4,
						borderColor: "#fff",
						paddingRight: 8,
						borderRadius: 12,
					}}
				>
					<View style={{ width: 60, height: 50 }}>
						<LottieView
							ref={animationRef}
							source={require("@/assets/gifs/sandwatch.json")}
							loop
							style={{ width: "100%", height: "100%" }}
						/>
					</View>
					<Text className="text-3xl font-medium text-white">
						{formattedMins}:{formattedSeconds}
					</Text>
				</View>
				<AntDesign
					name={isPaused ? "play" : "pause"}
					size={40}
					color="white"
					onPress={() => {
						setOptionsModalVisible(!optionsModalVisible)
						setIsPlaying(false)
						setIsPaused(!isPaused)
						animationRef.current?.pause()
					}}
				/>
			</View>
			<Text className="text-2xl text-center font-bold text-cyan-950 mt-5">
				{selectedCategory.toUpperCase()}
			</Text>

			<Text className="text-3xl font-medium text-cyan-950 mt-5">
				SCORE: {score}
			</Text>
			<FlatList
				keyExtractor={(item) => item.id.toString()}
				data={shuffledData}
				renderItem={renderItem}
				contentContainerStyle={{ rowGap: 10, marginTop: 24 }}
				columnWrapperStyle={{ gap: 10 }}
				numColumns={3}
			/>
			<View>
				<ExitModal
					onClose={() => setExitModalVisible(!exitModalVisible)}
					visible={exitModalVisible}
					onPressNo={() => {
						setExitModalVisible(false)
						setIsPlaying(true)
						animationRef.current?.play()
					}}
					onPressYes={() => {
						router.back()
					}}
				/>
				<GameOverModal
					onClose={() =>
						setGameOverModalVisible(!gameOverModalVisible)
					}
					visible={gameOverModalVisible}
					onConfirm={() => router.back()}
					score={score}
				/>
				<TimeupModal
					onClose={() => router.back()}
					score={score}
					visible={timeupModalVisible}
				/>
				<OptionsModal
					visible={optionsModalVisible}
					onClose={() => setOptionsModalVisible(!optionsModalVisible)}
					onExitGame={() => setExitModalVisible(!exitModalVisible)}
					onRestart={handleRestart}
					onResume={() => {
						animationRef.current?.play()
						setIsPaused(!isPaused)
						setIsPlaying(true)
						setOptionsModalVisible(!optionsModalVisible)
					}}
					onRestartAndShuffle={handleRestartAndShuffle}
				/>
			</View>
		</LinearGradient>
	)
}

export default FruitCards

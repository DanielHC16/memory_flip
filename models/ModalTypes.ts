export interface OptionsModalProps {
	visible: boolean
	onClose: () => void
	onRestartAndShuffle: () => void
	onRestart: () => void
	onExitGame: () => void
	onResume: () => void
}

export interface TimeupModalProps {
	visible: boolean
	score: number
	onClose: () => void
}

export interface ExitModalProps {
	visible: boolean
	onPressNo: () => void
	onPressYes: () => void
	onClose: () => void
}

export interface GameOverModalProps {
	visible: boolean
	score: number
	onClose: () => void
	onConfirm: () => void
}

import {
  ALL_CHARACTERS,
  DELAY_BEFORE_NEW_WANTED,
  DIFFICULTY_INCREASE,
  DIFFICULTY_MOVING_PERCENTAGE,
  DISPLAY_HEAD_PERCENTAGE_HIDE,
  KEY_SCORE,
  MAX_DIFFICULTY,
  MIN_DIFFICULTY,
  NAVBAR_HEIGHT,
  PADDING,
  RANDOM_START_DIFFICULTY,
  STATUS
} from "@/constant"
import { changeStatus, newRound } from "@/redux/game.slice"
import { DispatchType, Resolution, Score, Wanted } from "@/types"
import { setItemInLocalStorage } from "@/utils/storage"
import cx, { type ArgumentArray } from "classnames"
import { twMerge } from "tailwind-merge"

export const cn = (...classes: ArgumentArray) => twMerge(cx(classes))

export const generateRandomCharacters = (
  characterToExclude: Wanted | null,
  size: number,
  resolution: Resolution
) => {
  const filteredLetters = ALL_CHARACTERS.filter(
    (character) => character !== characterToExclude
  )

  return Array.from({ length: size }, () => {
    const character =
      filteredLetters[Math.floor(Math.random() * filteredLetters.length)]

    return { character, coordinates: generateRandomPosition(resolution) }
  })
}

export const increaseDifficulty = (difficulty: number) => {
  if (difficulty < MIN_DIFFICULTY) return MIN_DIFFICULTY

  if (difficulty >= MIN_DIFFICULTY && difficulty <= RANDOM_START_DIFFICULTY)
    return difficulty + DIFFICULTY_INCREASE
  else {
    const randomValue = Math.random() // Génère un nombre entre 0 et 1

    if (randomValue < DIFFICULTY_MOVING_PERCENTAGE) {
      return MAX_DIFFICULTY // 10% de chance pour 8
    } else if (randomValue < 0.4333)
      return 5 // ~33% pour 5
    else if (randomValue < 0.7666)
      return 6 // ~33% pour 6
    else return 7 // ~33% pour 7
  }
}

export const getNumberOfCharacters = (diff: number) => {
  // ? If difficulty is 8, return 7 and keep 8 to moving characters
  const difficulty = diff >= MAX_DIFFICULTY ? MAX_DIFFICULTY - 1 : diff

  // Example formula: Number of characters grows exponentially with difficulty
  return 10 * Math.pow(2, difficulty - 1) // Adjust this formula as needed
}

export const generateRandomPosition = (resolution: Resolution) => {
  const { width, height } = resolution

  const x = Math.floor(Math.random() * (width - 2 * PADDING)) + PADDING
  const y =
    Math.floor(Math.random() * (height - NAVBAR_HEIGHT - 2 * PADDING)) + PADDING
  return { x, y }
}

export const randomWanted = () =>
  ALL_CHARACTERS[Math.floor(Math.random() * ALL_CHARACTERS.length)]

export const insertAtRandomPosition = <T>(array: T[], element: T): T[] => {
  const maxIndex = Math.ceil(array.length * DISPLAY_HEAD_PERCENTAGE_HIDE)

  const randomIndex = Math.floor(Math.random() * (maxIndex || 1)) // maxIndex || 1 gère les tableaux vides.
  array.splice(randomIndex, 0, element)
  return array
}

export const updatedHighScore = (highScore: Score[], score: Score) => {
  const newHighScore = [...highScore, score].sort((a, b) => b - a)

  setItemInLocalStorage(KEY_SCORE, newHighScore.slice(0, 6))
  return newHighScore.slice(0, 6)
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const hideHole = async () => {
  const hole = document.querySelector(".shadow-hole")
  hole?.classList.add("force-black")
  await sleep(DELAY_BEFORE_NEW_WANTED + 250)
  hole?.classList.remove("force-black")
}

export const animateHole = async () => {
  const hole = document.querySelector(".shadow-hole")

  hole?.classList.remove("animate-circleShow")

  await sleep(150)

  hole?.classList.add("animate-circleShow")
}

export const newRoundWanted = async (dispatch: DispatchType) => {
  dispatch(newRound())
  dispatch(changeStatus(STATUS.WAITING))

  await sleep(DELAY_BEFORE_NEW_WANTED)

  dispatch(changeStatus(STATUS.PLAYING))
}

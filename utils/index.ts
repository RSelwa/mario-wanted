import { ALL_CHARACTERS, NAVBAR_HEIGHT, PADDING, RESOLUTION } from "@/constant"
import { Wanted } from "@/types"
import cx, { type ArgumentArray } from "classnames"
import { twMerge } from "tailwind-merge"

export const cn = (...classes: ArgumentArray) => twMerge(cx(classes))

export const generateRandomCharacters = (
  characterToExclude: Wanted,
  size: number
) => {
  const filteredLetters = ALL_CHARACTERS.filter(
    (character) => character !== characterToExclude
  )

  return Array.from({ length: size }, () => {
    const character =
      filteredLetters[Math.floor(Math.random() * filteredLetters.length)]

    return { character, coordinates: generateRandomPosition() }
  })
}

export const getDifficulty = (difficulty: number) => {
  // Map difficulty (1 to 10) to the number of characters
  if (difficulty < 1 || difficulty > 10) {
    throw new Error("Difficulty must be between 1 and 10")
  }

  // Example formula: Number of characters grows exponentially with difficulty
  return 10 * Math.pow(2, difficulty - 1) // Adjust this formula as needed
}

export const generateRandomPosition = () => {
  const width = window?.innerWidth || RESOLUTION.WIDTH
  const height = window?.innerHeight || RESOLUTION.HEIGHT

  const x = Math.floor(Math.random() * (width - 2 * PADDING)) + PADDING
  const y =
    Math.floor(Math.random() * (height - NAVBAR_HEIGHT - 2 * PADDING)) + PADDING
  return { x, y }
}

export const randomWanted = () =>
  ALL_CHARACTERS[Math.floor(Math.random() * ALL_CHARACTERS.length)]

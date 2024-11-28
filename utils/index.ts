import { ALL_CHARACTERS, NAVBAR_HEIGHT, PADDING } from "@/constant"
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

export const generateRandomPosition = () => {
  const x =
    Math.floor(Math.random() * (window.innerWidth - 2 * PADDING)) + PADDING
  const y =
    Math.floor(
      Math.random() * (window.innerHeight - NAVBAR_HEIGHT - 2 * PADDING)
    ) + PADDING
  return { x, y }
}

export const randomWanted = () =>
  ALL_CHARACTERS[Math.floor(Math.random() * ALL_CHARACTERS.length)]

"use client"

import Head from "@/components/head"
import {
  selectDifficulty,
  selectDisplayHeads,
  selectResolution,
  selectWanted
} from "@/redux/game.slice"
import { useAppSelector } from "@/redux/store"
import {
  generateRandomCharacters,
  generateRandomPosition,
  getNumberOfCharacters,
  insertAtRandomPosition
} from "@/utils"

const Game = () => {
  const wanted = useAppSelector(selectWanted)
  const difficulty = useAppSelector(selectDifficulty)
  const displayHeads = useAppSelector(selectDisplayHeads)
  const resolution = useAppSelector(selectResolution)

  const numberOfCharacters = getNumberOfCharacters(difficulty)

  const randomHeads = generateRandomCharacters(
    wanted,
    numberOfCharacters,
    resolution
  )
  const wantedHead = {
    character: wanted,
    coordinates: generateRandomPosition(resolution)
  }

  const heads = insertAtRandomPosition(randomHeads, wantedHead)

  return (
    <section id="container" className="flex-1 relative overflow-hidden">
      {displayHeads &&
        heads.map((props, index) => <Head key={index} {...props} />)}
    </section>
  )
}

export default Game

"use client"

import Head from "@/components/head"
import { selectDifficulty, selectWanted } from "@/redux/game.slice"
import { useAppSelector } from "@/redux/store"
import {
  generateRandomCharacters,
  generateRandomPosition,
  getDifficulty
} from "@/utils"

const Game = () => {
  const wanted = useAppSelector(selectWanted)
  const difficulty = useAppSelector(selectDifficulty)

  const size = getDifficulty(difficulty)

  const heads = generateRandomCharacters(wanted, size)

  return (
    <section id="container" className="flex-1 relative overflow-hidden">
      <Head character={wanted} coordinates={generateRandomPosition()} />
      {heads.map((props, index) => (
        <Head key={index} {...props} />
      ))}
    </section>
  )
}

export default Game

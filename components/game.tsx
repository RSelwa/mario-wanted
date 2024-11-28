"use client"

import Head from "@/components/head"
import { selectWanted } from "@/redux/game.slice"
import { useAppSelector } from "@/redux/store"
import { generateRandomCharacters, generateRandomPosition } from "@/utils"

const Game = () => {
  const wanted = useAppSelector(selectWanted)

  const size = 50

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

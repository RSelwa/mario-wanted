"use client"

import Game from "@/components/game"
import { GAMES } from "@/constant"
import { selectSelectedGame } from "@/redux/game.slice"
import { useAppSelector } from "@/redux/store"

export default function Home() {
  const selectedGame = useAppSelector(selectSelectedGame)

  if (selectedGame === GAMES.WANTED) return <Game />

  return null
}

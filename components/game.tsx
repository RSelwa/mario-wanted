"use client"

import Head from "@/components/head"
import { selectDisplayHeads, selectHeads } from "@/redux/game.slice"
import { useAppSelector } from "@/redux/store"

const Game = () => {
  const displayHeads = useAppSelector(selectDisplayHeads)
  const heads = useAppSelector(selectHeads)

  return (
    <section id="container" className="flex-1 relative overflow-hidden">
      {displayHeads &&
        heads.map((props, index) => <Head key={index} {...props} />)}
    </section>
  )
}

export default Game

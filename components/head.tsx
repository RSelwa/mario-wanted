"use client"

import {
  DELAY_BEFORE_NEW_WANTED,
  OFFSET_TIMER_UI,
  STATUS,
  TIMER_INCREASE
} from "@/constant"
import {
  changeStatus,
  incrementScore,
  incrementTimer,
  newRound,
  selectGame
} from "@/redux/game.slice"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { Coordinate, Wanted } from "@/types"
import Image from "next/image"
import React from "react"

type Props = {
  character: Wanted
  coordinates: Coordinate
}

const Head: React.FC<Props> = React.memo(({ character, coordinates }) => {
  const dispatch = useAppDispatch()
  const { wanted, status } = useAppSelector(selectGame)

  const isWanted = wanted === character
  const isFound = status === STATUS.FOUND
  const isLost = status === STATUS.LOST

  const handleRight = async () => {
    if (status === STATUS.FOUND) return

    dispatch(changeStatus(STATUS.WAITING))
    dispatch(incrementScore())
    dispatch(incrementTimer())

    await new Promise((r) => setTimeout(r, DELAY_BEFORE_NEW_WANTED))

    dispatch(newRound())
  }

  const handleWrong = () => {
    if (status === STATUS.LOST) return
  }

  return (
    <>
      {isWanted && isFound && (
        <span
          style={{ top: coordinates.y - OFFSET_TIMER_UI, left: coordinates.x }}
          className="absolute z-30 size-8 text-red-400 text-xl text-stroke-2"
        >
          +{TIMER_INCREASE}
        </span>
      )}
      {isWanted && (
        <button
          onClick={handleRight}
          data-cursor={isFound ? "hidden" : ""}
          className="absolute size-8 z-30 scale-150 data-[cursor=hidden]:cursor-none"
          style={{ top: coordinates.y, left: coordinates.x }}
        />
      )}
      <Image
        data-state={(isFound || isLost) && !isWanted ? "found" : ""}
        data-cursor={isFound ? "hidden" : ""}
        onClick={isWanted ? handleRight : handleWrong}
        src={`/assets/${character}.png`}
        width={30}
        height={32}
        alt={character}
        style={{
          top: coordinates.y,
          left: coordinates.x
        }}
        className="data-[state=found]:hidden data-[cursor=hidden]:cursor-none absolute scale-150 z-20"
      />
    </>
  )
})

Head.displayName = "Head"

export default Head

"use client"

import {
  CIRCLE_ANIMATION_CLASS,
  CIRCLE_QUERY_SELECTOR,
  DELAY_BEFORE_NEW_WANTED,
  HELPER_DIFFICULTY,
  HELPER_TIMING,
  OFFSET_TIMER_UI,
  STATUS,
  TIMER_DECREASE,
  TIMER_INCREASE
} from "@/constant"
import {
  changeStatus,
  incrementScore,
  incrementTimer,
  selectGame,
  wrongHead
} from "@/redux/game.slice"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { Coordinate, Wanted } from "@/types"
import { newRoundWanted, sleep } from "@/utils"
import Image from "next/image"
import React, { useState } from "react"

type Props = {
  character: Wanted
  coordinates: Coordinate
}

const Head: React.FC<Props> = React.memo(({ character, coordinates }) => {
  const dispatch = useAppDispatch()
  const { wanted, status, difficulty, timer } = useAppSelector(selectGame)

  const isWanted = wanted === character
  const isFound = status === STATUS.FOUND
  const isLost = status === STATUS.LOST

  const [isWrong, setIsWrong] = useState(false)

  const handleRight = async () => {
    if (status === STATUS.FOUND) return

    dispatch(changeStatus(STATUS.FOUND))
    dispatch(incrementScore())
    dispatch(incrementTimer())

    await sleep(DELAY_BEFORE_NEW_WANTED)

    const hole = document.querySelector(CIRCLE_QUERY_SELECTOR)
    hole?.classList.remove(CIRCLE_ANIMATION_CLASS)

    await sleep(150)

    newRoundWanted(dispatch)
    hole?.classList.add(CIRCLE_ANIMATION_CLASS)
  }

  const handleWrong = async () => {
    setIsWrong(true)
    dispatch(wrongHead())

    await new Promise((r) => setTimeout(r, DELAY_BEFORE_NEW_WANTED))
    setIsWrong(false)
  }

const isHelpEnabled = !isWanted &&  difficulty>HELPER_DIFFICULTY  && timer< HELPER_TIMING

  const disabled = status !== STATUS.PLAYING

  return (
    <>
      {isWrong && (
        <span
          style={{ top: coordinates.y - OFFSET_TIMER_UI, left: coordinates.x }}
          className="absolute z-30 size-8 text-blue-400 text-xl text-stroke-2"
        >
          -{TIMER_DECREASE}
        </span>
      )}
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
          disabled={disabled}
          onClick={handleRight}
          data-cursor={isFound ? "hidden" : ""}
          className="absolute size-8 z-30 scale-150 data-[cursor=hidden]:cursor-none"
          style={{ top: coordinates.y, left: coordinates.x }}
        />
      )}
      <button
        disabled={disabled}
        onClick={isWanted ? handleRight : handleWrong}
      >
        <Image
          data-state={(isFound || isLost) && !isWanted ? "found" : ""}
          data-cursor={isFound ? "hidden" : ""}
          // onClick={isWanted ? handleRight : handleWrong}
          src={`/assets/${character}.png`}
          width={30}
          height={32}
          alt={character}
          style={{
            top: coordinates.y,
            left: coordinates.x,
            opacity: isHelpEnabled ? timer/10 : 1
          }}
          className="data-[state=found]:hidden data-[cursor=hidden]:cursor-none absolute scale-150 z-20"
        />
      </button>
    </>
  )
})

Head.displayName = "Head"

export default Head

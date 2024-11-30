"use client"

import { STATUS, TIMER_SPEED } from "@/constant"
import { decreaseTimer, selectGame } from "@/redux/game.slice"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { useEffect } from "react"

const Timer = () => {
  const dispatch = useAppDispatch()
  const { status, timer } = useAppSelector(selectGame)

  useEffect(() => {
    const interval = setInterval(() => {
      if (status === STATUS.PLAYING && timer) dispatch(decreaseTimer())
    }, TIMER_SPEED)

    if (status === STATUS.WAITING) clearInterval(interval)

    return () => clearInterval(interval)
  }, [status, dispatch])

  if (status === STATUS.IDLE) return null

  return (
    <article className="absolute z-20 font-bold left-1/2 -translate-x-1/2 flex flex-col justify-center items-center">
      <p>Time</p>
      <p className="text-4xl text-stroke-px">{timer}</p>
    </article>
  )
}

export default Timer

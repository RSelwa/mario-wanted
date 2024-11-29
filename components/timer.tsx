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

    return () => clearInterval(interval)
  }, [status, dispatch])

  return (
    <article className="absolute z-20 font-bold text-stroke-px left-1/2 -translate-x-1/2 flex flex-col justify-center items-center">
      <p className="">Time</p>
      <p className="text-4xl">{timer}</p>
    </article>
  )
}

export default Timer

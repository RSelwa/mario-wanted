import { STATUS, TIMER_SPEED } from "@/constant"
import { decreaseTimer, selectGame } from "@/redux/game.slice"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { useEffect } from "react"

type Props = {}

const Timer = (props: Props) => {
  const dispatch = useAppDispatch()
  const { status, timer } = useAppSelector(selectGame)

  useEffect(() => {
    const interval = setInterval(() => {
      if (status === STATUS.PLAYING && timer) dispatch(decreaseTimer())
    }, TIMER_SPEED)

    return () => clearInterval(interval)
  }, [status, dispatch])
  return <p className="text-4xl">{timer}</p>
}

export default Timer

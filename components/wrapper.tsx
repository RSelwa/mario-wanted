"use client"

import { selectGame } from "@/redux/game.slice"
import { useAppSelector } from "@/redux/store"
import { ReactNode } from "react"

type Props = { children: ReactNode }

const Wrapper = ({ children }: Props) => {
  const { status } = useAppSelector(selectGame)
  return (
    <div
      data-state={status}
      className="data-[state=found]:bg-amber-500 data-[state=lost]:bg-red-500 flex flex-col bg-black text-white h-full"
    >
      {children}
    </div>
  )
}

export default Wrapper

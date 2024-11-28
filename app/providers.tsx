"use client"

import { selectGame } from "@/redux/game.slice"
import { AppStore, makeStore, useAppSelector } from "@/redux/store"
import { ReactNode, useRef } from "react"
import { Provider } from "react-redux"

type Props = { children: ReactNode }

const Wrapper = ({ children }: Props) => {
  const { status } = useAppSelector(selectGame)
  return (
    <div
      data-state={status}
      className="data-[state=found]:bg-amber-500 data-[state=lost]:bg-red-500 flex flex-col bg-black h-full"
    >
      {children}
    </div>
  )
}

const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <Provider store={storeRef.current}>
      <Wrapper>{children}</Wrapper>
    </Provider>
  )
}

export default StoreProvider

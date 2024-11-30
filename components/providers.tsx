"use client"

import Wrapper from "@/components/wrapper"
import { AppStore, makeStore } from "@/redux/store"
import { ReactNode, useRef } from "react"
import { Provider } from "react-redux"

type Props = { children: ReactNode }

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

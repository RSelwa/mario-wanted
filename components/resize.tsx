"use client"

import { updateResolution } from "@/redux/game.slice"
import { useDispatch } from "react-redux"
import { useWindowSize } from "react-use"

const Resize = () => {
  const { width, height } = useWindowSize()
  const dispatch = useDispatch()

  console.log(width, height)

  dispatch(updateResolution({ width, height }))

  return null
}

export default Resize
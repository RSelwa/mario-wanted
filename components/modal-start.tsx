"use client"

import { ModalBase } from "@/components/modals"
import { startGame } from "@/redux/game.slice"
import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { useDispatch } from "react-redux"

const ModalStart = () => {
  const dispatch = useDispatch()

  const start = () => {
    dispatch(startGame())
  }

  return (
    <ModalBase>
      <AlertDialog.Action asChild>
        <button
          onClick={start}
          className="px-8 py-4 bg-amber-400 rounded-full hover:bg-amber-500"
        >
          Start
        </button>
      </AlertDialog.Action>
    </ModalBase>
  )
}

export default ModalStart

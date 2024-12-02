"use client"

import HighScore from "@/components/high-score"
import { ModalBase } from "@/components/modals"
import { newRoundWanted } from "@/utils"
import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { useDispatch } from "react-redux"

const ModalStart = () => {
  const dispatch = useDispatch()

  const start = async () => {
    newRoundWanted(dispatch)
  }

  return (
    <ModalBase>
      <HighScore />
      <AlertDialog.Action asChild>
        <button
          onClick={start}
          className="px-8 py-4 mx-auto bg-amber-200 rounded-full hover:bg-amber-500"
        >
          Start
        </button>
      </AlertDialog.Action>
    </ModalBase>
  )
}

export default ModalStart

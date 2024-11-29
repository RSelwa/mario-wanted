"use client"

import { startGame } from "@/redux/game.slice"
import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react"
import { useDispatch } from "react-redux"

const Modal = () => {
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(true)

  const start = () => {
    dispatch(startGame())
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <Dialog.Root defaultOpen={true}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className="fixed z-40 inset-0 bg-black/60 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md  p-[25px]  focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title />
          <Dialog.Description asChild>
            <button
              onClick={start}
              className="px-8 py-4 bg-amber-400 rounded-full"
            >
              Start
            </button>
          </Dialog.Description>
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal

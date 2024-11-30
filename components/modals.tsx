"use client"

import ModalLose from "@/components/modal-lose"
import ModalStart from "@/components/modal-start"
import { STATUS } from "@/constant"
import { selectStatus } from "@/redux/game.slice"
import { useAppSelector } from "@/redux/store"
import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { ReactNode } from "react"

export const ModalBase = ({ children }: { children: ReactNode }) => {
  return (
    <AlertDialog.Root defaultOpen={true}>
      <AlertDialog.Trigger />
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed z-40 inset-0 bg-black/60 data-[state=open]:animate-overlayShow" />
        <AlertDialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md  p-[25px]  focus:outline-none data-[state=open]:animate-contentShow">
          <AlertDialog.Title />
          <AlertDialog.Description />
          {children}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

const Modals = () => {
  const status = useAppSelector(selectStatus)

  if (status === STATUS.LOST) return <ModalLose />
  if (status === STATUS.IDLE) return <ModalStart />
}

export default Modals

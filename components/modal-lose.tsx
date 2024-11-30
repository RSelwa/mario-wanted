import { ModalBase } from "@/components/modals"
import { restartGame } from "@/redux/game.slice"
import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { useDispatch } from "react-redux"

const ModalLose = () => {
  const dispatch = useDispatch()

  const restart = () => {
    dispatch(restartGame())
  }

  return (
    <ModalBase>
      <AlertDialog.Action asChild>
        <button
          className="px-8 py-4 bg-amber-400 rounded-full hover:bg-amber-500"
          onClick={restart}
        >
          Play again
        </button>
      </AlertDialog.Action>
    </ModalBase>
  )
}

export default ModalLose

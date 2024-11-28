import gameReducer from "@/redux/game.slice"
import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"

export const makeStore = () =>
  configureStore({
    reducer: {
      game: gameReducer
    }
  })

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

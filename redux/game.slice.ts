import {
  INITIAL_LIVES,
  INITIAL_ROUND,
  INITIAL_SCORE,
  INITIAL_TIMER,
  ROUND_INCREMENT,
  SCORE_INCREASE,
  STATUS,
  TIMER_INCREASE
} from "@/constant"
import { RootState } from "@/redux/store"
import { Game } from "@/types"
import { randomWanted } from "@/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: Game = {
  wanted: randomWanted(),
  score: INITIAL_SCORE,
  round: INITIAL_ROUND,
  status: STATUS.PLAYING,
  lives: INITIAL_LIVES,
  timer: INITIAL_TIMER
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: () => initialState,
    newRound: (state) => {
      state.wanted = randomWanted()
      state.round += ROUND_INCREMENT
      state.status = STATUS.PLAYING
    },
    updateStatus: (state, { payload }: PayloadAction<Game["status"]>) => {
      state.status = payload
    },
    incrementScore: (state) => {
      state.score += SCORE_INCREASE
    },
    incrementTimer: (state) => {
      state.timer += TIMER_INCREASE
    },
    decreaseTimer: (state) => {
      if (state.timer > 0) state.timer -= 1
      else state.status = STATUS.LOST
    },
    loseLife: (state) => {
      state.lives -= 1
    },
    changeStatus: (state, { payload }: PayloadAction<Game["status"]>) => {
      state.status = payload
    },
    newWanted: (state) => {
      state.wanted = randomWanted()
    }
  }
})

export const {
  incrementScore,
  incrementTimer,
  decreaseTimer,
  loseLife,
  resetGame,
  updateStatus,
  changeStatus,
  newRound,
  newWanted
} = gameSlice.actions

export const selectGame = (state: RootState) => state.game
export const selectWanted = (state: RootState) => state.game.wanted
export const selectStatus = (state: RootState) => state.game.status

export default gameSlice.reducer

import {
  INITIAL_DIFFICULTY,
  INITIAL_LIVES,
  INITIAL_ROUND,
  INITIAL_SCORE,
  INITIAL_TIMER,
  RESOLUTION,
  ROUND_INCREMENT,
  SCORE_INCREASE,
  STATUS,
  TIMER_INCREASE
} from "@/constant"
import { RootState } from "@/redux/store"
import { Game } from "@/types"
import { increaseDifficulty, randomWanted } from "@/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: Game = {
  wanted: randomWanted(),
  score: INITIAL_SCORE,
  round: INITIAL_ROUND,
  status: STATUS.IDLE,
  lives: INITIAL_LIVES,
  timer: INITIAL_TIMER,
  difficulty: INITIAL_DIFFICULTY,
  resolution: { width: RESOLUTION.WIDTH, height: RESOLUTION.HEIGHT }
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: () => initialState,
    updateResolution: (
      state,
      { payload }: PayloadAction<Game["resolution"]>
    ) => {
      state.resolution = payload
    },
    restartGame: (state) => {
      state.wanted = randomWanted()
      state.round = 1
      state.status = STATUS.PLAYING
      state.difficulty = increaseDifficulty(0)
    },
    newRound: (state) => {
      state.wanted = randomWanted()
      state.round += ROUND_INCREMENT
      state.status = STATUS.PLAYING
      state.difficulty = increaseDifficulty(state.difficulty)
    },
    updateStatus: (state, { payload }: PayloadAction<Game["status"]>) => {
      state.status = payload
    },
    startGame: (state) => {
      state.status = STATUS.PLAYING
    },
    incrementScore: (state) => {
      state.score += SCORE_INCREASE
    },
    incrementTimer: (state) => {
      state.timer += TIMER_INCREASE
    },
    decreaseTimer: (state) => {
      if (state.timer > 0) state.timer -= 1
      else {
        state.status = STATUS.LOST

        state.difficulty = INITIAL_DIFFICULTY
        state.round = INITIAL_ROUND
        state.timer = INITIAL_TIMER
      }
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
  newWanted,
  startGame,
  restartGame,
  updateResolution
} = gameSlice.actions

export const selectGame = (state: RootState) => state.game
export const selectWanted = (state: RootState) => state.game.wanted
export const selectScore = (state: RootState) => state.game.score
export const selectDisplayHeads = (state: RootState) =>
  state.game.status === STATUS.PLAYING ||
  state.game.status === STATUS.LOST ||
  state.game.status === STATUS.FOUND
export const selectDifficulty = (state: RootState) => state.game.difficulty
export const selectStatus = (state: RootState) => state.game.status
export const selectResolution = (state: RootState) => state.game.resolution

export default gameSlice.reducer

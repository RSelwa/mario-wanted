import {
  DEFAULT_HIGH_SCORE,
  GAMES,
  INITIAL_DIFFICULTY,
  INITIAL_LIVES,
  INITIAL_ROUND,
  INITIAL_SCORE,
  INITIAL_TIMER,
  KEY_SCORE,
  MAX_TIMER,
  RESOLUTION,
  ROUND_INCREMENT,
  SCORE_INCREASE,
  STATUS,
  TIMER_DECREASE,
  TIMER_INCREASE
} from "@/constant"
import { RootState } from "@/redux/store"
import { Game } from "@/types"
import { increaseDifficulty, randomWanted, updatedHighScore } from "@/utils"
import { getItemFromLocalStorage } from "@/utils/storage"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: Game = {
  selectedGame: GAMES.WANTED,
  wanted: randomWanted(),
  score: INITIAL_SCORE,
  round: INITIAL_ROUND,
  status: STATUS.IDLE,
  lives: INITIAL_LIVES,
  timer: INITIAL_TIMER,
  difficulty: INITIAL_DIFFICULTY,
  resolution: { width: RESOLUTION.WIDTH, height: RESOLUTION.HEIGHT },
  highScore: getItemFromLocalStorage(KEY_SCORE, DEFAULT_HIGH_SCORE)
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
      state.round = INITIAL_ROUND
      state.score = INITIAL_SCORE
      state.status = STATUS.PLAYING
      state.difficulty = increaseDifficulty(0)
    },
    newRound: (state) => {
      state.wanted = randomWanted()
      state.round += ROUND_INCREMENT
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

      if (state.timer > MAX_TIMER) state.timer = MAX_TIMER
    },
    loseGame: (state) => {
      state.status = STATUS.LOST
      state.difficulty = INITIAL_DIFFICULTY
      state.round = INITIAL_ROUND
      state.timer = INITIAL_TIMER
      state.highScore = updatedHighScore(state.highScore, state.score)
    },
    wrongHead: (state) => {
      state.timer -= TIMER_DECREASE
      if (state.timer < 0) {
        state.timer = 0

        // ? LOSE
        state.status = STATUS.LOST
        state.difficulty = INITIAL_DIFFICULTY
        state.round = INITIAL_ROUND
        state.timer = INITIAL_TIMER
        state.highScore = updatedHighScore(state.highScore, state.score)
      }
    },
    decreaseTimer: (state) => {
      if (state.timer > 0) state.timer -= 1
      else {
        // ? LOSE
        state.status = STATUS.LOST
        state.difficulty = INITIAL_DIFFICULTY
        state.round = INITIAL_ROUND
        state.timer = INITIAL_TIMER
        state.highScore = updatedHighScore(state.highScore, state.score)
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
    },
    updateHighScore: (state, { payload }: PayloadAction<Game["highScore"]>) => {
      state.highScore = payload
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
  updateResolution,
  updateHighScore,
  loseGame,
  wrongHead
} = gameSlice.actions

export const selectGame = (state: RootState) => state.game
export const selectWanted = (state: RootState) => state.game.wanted
export const selectScore = (state: RootState) => state.game.score
export const selectDisplayHeads = (state: RootState) =>
  state.game.selectedGame === GAMES.WANTED &&
  (state.game.status === STATUS.FOUND ||
    state.game.status === STATUS.LOST ||
    state.game.status === STATUS.PLAYING)
export const selectHighScore = (state: RootState) => state.game.highScore
export const selectDisplayWanted = (state: RootState) =>
  state.game.selectedGame === GAMES.WANTED && state.game.status !== STATUS.IDLE
export const selectDifficulty = (state: RootState) => state.game.difficulty
export const selectStatus = (state: RootState) => state.game.status
export const selectResolution = (state: RootState) => state.game.resolution
export const selectSelectedGame = (state: RootState) => state.game.selectedGame

export default gameSlice.reducer

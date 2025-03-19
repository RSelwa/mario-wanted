import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit"

export type Wanted = "mario" | "luigi" | "wario" | "yoshi"

export type GameStatus = "idle" | "playing" | "found" | "lost" | "waiting"

export type Heads = {
  character: Wanted
  coordinates: Coordinate
}[]

export type WantedGame = {
  selectedGame: "wanted"
  heads: Heads
  wanted: Wanted
  score: number
  round: number
  status: GameStatus
  lives: number
  timer: number
  difficulty: number
  resolution: Resolution
  highScore: Score[]
}

export type Resolution = {
  width: number
  height: number
}

export type Coordinate = {
  x: number
  y: number
}

export type Score = number

export type DispatchType = ThunkDispatch<
  {
    game: WantedGame
  },
  undefined,
  UnknownAction
> &
  Dispatch<UnknownAction>

export type GenerateHeads = {
  difficulty: number
  wanted: Wanted
  resolution: Resolution
}

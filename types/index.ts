export type Wanted = "mario" | "luigi" | "wario" | "yoshi"

export type GameStatus = "idle" | "playing" | "found" | "lost"

export type Game = {
  wanted: Wanted
  score: number
  round: number
  status: GameStatus
  lives: number
  timer: number
  difficulty: number
  resolution: Resolution
}

export type Resolution = {
  width: number
  height: number
}

export type Coordinate = {
  x: number
  y: number
}

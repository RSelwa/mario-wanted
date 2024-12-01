export type Wanted = "mario" | "luigi" | "wario" | "yoshi"

export type GameStatus = "idle" | "playing" | "found" | "lost" | "waiting"

export type Game = {
  selectedGame: "wanted"
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

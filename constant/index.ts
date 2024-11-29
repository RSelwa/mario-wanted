export const CHARACTERS = {
  MARIO: "mario",
  LUIGI: "luigi",
  WARIO: "wario",
  YOSHI: "yoshi"
} as const

export const STATUS = {
  IDLE: "idle",
  PLAYING: "playing",
  FOUND: "found",
  LOST: "lost"
} as const

export const ALL_CHARACTERS = Object.values(CHARACTERS)

export const RESOLUTION = {
  WIDTH: 1280,
  HEIGHT: 720
}

export const MODULO_SCORE = 5

export const NAVBAR_HEIGHT = 192
export const PADDING = 50
export const OFFSET_TIMER_UI = 30

export const ROUND_INCREMENT = 1
export const DELAY_BEFORE_NEW_WANTED = 2000 // milliseconds

export const TIMER_INCREASE = 5 // seconds
export const SCORE_INCREASE = 1
export const DIFFICULTY_INCREASE = 1

export const TIMER_SPEED = 1000 // milliseconds

export const INITIAL_TIMER = 10 // seconds
export const INITIAL_LIVES = 1
export const INITIAL_ROUND = 1
export const INITIAL_SCORE = 0
export const INITIAL_DIFFICULTY = 1

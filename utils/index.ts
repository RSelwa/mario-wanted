import cx, { type ArgumentArray } from "classnames"
import { twMerge } from "tailwind-merge"

export const cn = (...classes: ArgumentArray) => twMerge(cx(classes))

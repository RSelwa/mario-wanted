"use client"

import Timer from "@/components/timer"
import { MODULO_SCORE } from "@/constant"
import {
  selectDisplayWanted,
  selectScore,
  selectWanted
} from "@/redux/game.slice"
import { useAppSelector } from "@/redux/store"
import Image from "next/image"

const Navbar = () => {
  const score = useAppSelector(selectScore)
  const wanted = useAppSelector(selectWanted)
  const displayWanted = useAppSelector(selectDisplayWanted)

  const littleStars = Array.from({ length: score % MODULO_SCORE }).fill(null)
  const isBigStar = score >= MODULO_SCORE

  return (
    <nav className="flex w-full justify-center items-center text-yellow-400 font-mario ">
      <section className="relative flex justify-start">
        {/* <article className="h-[292px] -translate-x-1/2 z-10 rounded-full aspect-square left-1/2 absolute border-[5rem] top-1/2 -translate-y-[60%] border-black border-solid" /> */}
        {displayWanted && (
          <article className="text-3xl scale-75 ml-8">
            <Image
              priority
              src={`/assets/${wanted}-wanted.jpg`}
              alt=""
              width="256"
              height="192"
            />
          </article>
        )}

        <article className="flex flex-col-reverse items-center w-fit gap-1">
          <div
            data-state={isBigStar ? "visible" : "hidden"}
            className="data-[state=visible]:visible invisible relative w-fit"
          >
            <Image
              src="/assets/big-star.png"
              alt="star"
              width="32"
              height="30"
            />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 text-red-400 font-mario">
              {score}
            </span>
          </div>
          {littleStars.map((_, i) => (
            <Image
              key={i}
              src="/assets/little-star.png"
              alt="star"
              width="16"
              height="16"
            />
          ))}
        </article>
        <Timer />
      </section>
    </nav>
  )
}

export default Navbar

"use client"

import Timer from "@/components/timer"
import { MODULO_SCORE } from "@/constant"
import {
  selectDisplayWanted,
  selectScore,
  selectStatus,
  selectWanted
} from "@/redux/game.slice"
import { useAppSelector } from "@/redux/store"
import Image from "next/image"

const Navbar = () => {
  const score = useAppSelector(selectScore)
  const wanted = useAppSelector(selectWanted)
  const status = useAppSelector(selectStatus)
  const displayWanted = useAppSelector(selectDisplayWanted)

  const littleStars = Array.from({ length: score % MODULO_SCORE }).fill(null)
  const isBigStar = score >= MODULO_SCORE

  return (
    <nav className="flex w-full justify-center items-center text-yellow-400 font-mario">
      <section className="relative flex justify-start">
        {displayWanted && (
          <>
            <article
              data-state={status}
              className="text-3xl data-[state=lost]:invisible data-[state=found]:invisible scale-75"
            >
              <Image
                priority
                src={`/assets/${wanted}-wanted.jpg`}
                alt=""
                width="256"
                height="192"
              />
            </article>
            <div
              data-state={status}
              className="shadow-hole animate-circleShow size-32 top-1/2 -translate-y-1/2 absolute z-10 bg-transparent data-[state=found]:shadow-hole-found data-[state=found]:bg-amber-500 data-[state=lost]:shadow-hole-lost data-[state=lost]:bg-red-500 -translate-x-1/2 left-1/2 rounded-full"
            />
          </>
        )}

        <article className="absolute z-20 right-0 bottom-0 flex flex-col-reverse items-center w-fit gap-1">
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
            <span className="absolute z-20 left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 text-red-400 font-mario">
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

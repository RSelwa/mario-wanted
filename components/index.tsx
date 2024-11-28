"use client"

import { useEffect, useRef, useState } from "react"

const Game = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [windowSize, setWindowSize] = useState({
    width: 1920,
    height: 1080
  })

  const FPS = 60
  const [position, setPosition] = useState({ x: 10, y: 10 })
  const [velocity, setVelocity] = useState({ xSpeed: 4, ySpeed: 4 })

  useEffect(() => {
    const updateDimensions = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
      setPosition({ x: 10, y: 10 }) // Reset position on resize
    }

    window.addEventListener("resize", updateDimensions)

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        const nextX = prev.x + velocity.xSpeed
        const nextY = prev.y + velocity.ySpeed

        let newXSpeed = velocity.xSpeed
        let newYSpeed = velocity.ySpeed

        // Bounce horizontally
        if (
          nextX + (logoRef.current?.clientWidth || 0) >= windowSize.width ||
          nextX <= 0
        ) {
          newXSpeed = -velocity.xSpeed
          //   logoRef.current?.style.fill = randomColor()
        }

        // Bounce vertically
        if (
          nextY + (logoRef.current?.clientHeight || 0) >= windowSize.height ||
          nextY <= 0
        ) {
          newYSpeed = -velocity.ySpeed
          //   logoRef.current?.style.fill = randomColor()
        }

        setVelocity({ xSpeed: newXSpeed, ySpeed: newYSpeed })

        return { x: nextX, y: nextY }
      })
    }, 1000 / FPS)

    return () => clearInterval(interval)
  }, [velocity, windowSize])

  if (typeof window !== "undefined") {
    console.log(window)

    console.log(window.innerHeight)
    console.log(window.innerWidth)
  }

  return (
    <div
      ref={sectionRef}
      className="bg-black h-full w-full relative overflow-hidden"
    >
      <div
        onClick={() => console.log("clicked")}
        ref={logoRef}
        style={{
          top: position.y,
          left: position.x
        }}
        className="size-16 z-10 bg-red-500 absolute"
      />
    </div>
  )
}

export default Game

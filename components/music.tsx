"use client"

import { useState } from "react"
import { useAudio } from "react-use"

const Music = () => {
  const [audio] = useAudio({
    src: "/assets/sounds/music-background.mp3",
    autoPlay: true,
    loop: true
  })
  const [isSound, setIsSound] = useState(true)

  return (
    <>
      {isSound && audio}
      <button
        onClick={() => setIsSound((prevState) => !prevState)}
        className="absolute top-10 right-4 z-20"
      >
        {isSound ? "🔊" : "🔇"}
      </button>
    </>
  )
}

export default Music

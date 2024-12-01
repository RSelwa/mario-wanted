import { selectHighScore } from "@/redux/game.slice"
import { useAppSelector } from "@/redux/store"
import Image from "next/image"

const HighScore = () => {
  const highScore = useAppSelector(selectHighScore)

  return (
    <section className="text-3xl mb-12 space-y-6">
      <h1 className="text-white text-center mb-4 text-6xl">High Score</h1>
      {highScore.map((score, index) => (
        <article
          key={index}
          className="flex text-white items-center justify-between "
        >
          <div className="flex items-center gap-2">
            <span className="w-4 mr-4">{index + 1}</span>
            <Image
              src="/assets/big-star.png"
              width={32}
              height={30}
              alt="little-star"
            />
            <span className="text-yellow-200">X</span>
          </div>
          <div>{score}</div>
        </article>
      ))}
    </section>
  )
}

export default HighScore

import Head from "@/components/head"
import { generateRandomCharacters, getNumberOfCharacters } from "@/utils"

const OpenGraphImage = () => {
  const numberOfCharacters = getNumberOfCharacters(7)

  const heads = generateRandomCharacters(null, numberOfCharacters, {
    width: 1500,
    height: 911
  })

  return (
    <div className="bg-black w-full h-full relative">
      {heads.map((props, index) => (
        <Head key={index} {...props} />
      ))}

      {/* <div className="text-xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 font-black text-yellow-200">
        Wanted
      </div> */}
    </div>
  )
}

export default OpenGraphImage

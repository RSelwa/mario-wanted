import Link from "next/link"

const Socials = () => {
  return (
    <section className="absolute right-4 top-4 flex justify-end text-white gap-4">
      Made with 💛 by{" "}
      <Link
        href="https://github.com/RSelwa"
        target="_blank"
        className="underline"
      >
        Raphael
      </Link>
    </section>
  )
}

export default Socials

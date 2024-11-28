import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  safelist: ["mario", "text-stroke-px", "text-stroke-2", "text-stroke-4"],
  theme: {
    extend: {
      fontFamily: {
        mario: ["mario"]
      }
    }
  },
  plugins: []
}
export default config

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
      },
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)"
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" }
        },
        circleReveal: {
          from: {
            left: "-150%"
          },
          to: {
            left: "50%"
          }
        }
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        circleShow: "circleReveal 1500ms",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)"
      },
      boxShadow: {
        hole: "0 0 0 9999px rgba(0, 0, 0, 1)",
        "hole-found": "0 0 0 9999px rgba(#f59e0b, 1)",
        "hole-lost": "0 0 0 9999px rgba(#ef4444, 1)"
      }
    }
  },
  plugins: []
}
export default config

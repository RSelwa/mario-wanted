import Modals from "@/components/modals"
import Navbar from "@/components/navbar"
import StoreProvider from "@/components/providers"
import Resize from "@/components/resize"
import Socials from "@/components/socials"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  icons: ["/assets/mario.png"],
  title: "Mario wanted",
  description:
    "The web version of the mini game Mario wanted from New Super Mario Bros",
  authors: [
    {
      name: "Raphael",
      url: "https://github.com/RSelwa"
    }
  ]
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full m-0 font-mario">
        <StoreProvider>
          <Navbar />
          <Modals />
          {children}
          <Resize />
          <Socials />
        </StoreProvider>
      </body>
    </html>
  )
}

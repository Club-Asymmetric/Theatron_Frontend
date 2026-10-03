import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "THEATRON 2026",
  description: "Cinema, theatre and performing arts at Chennai Institute of Technology.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.className} ${geistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

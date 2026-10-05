import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata = {
  title: "THEATRON 2026",
  description: "Cinema, theatre and performing arts at Chennai Institute of Technology.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/theatron-intro-clean.mp4" as="video" type="video/mp4" />
      </head>
      <body className={`${geist.className} ${geistMono.variable} bg-black text-white antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
